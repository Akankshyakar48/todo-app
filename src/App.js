import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [showCompleted, setShowCompleted] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState({ title: "", description: "" });

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const savedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    setTodos(savedTodos);
    setCompletedTasks(savedCompletedTasks);
  }, []);

  const addTask = () => {
    setTodos([...todos, newTask]);
    localStorage.setItem('todos', JSON.stringify([...todos, newTask]));
    setNewTask({ title: "", description: "" });
  };

  const deleteTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const completeTask = (index) => {
    const taskToComplete = todos[index];
    const updatedCompletedTasks = [...completedTasks, taskToComplete];
    setCompletedTasks(updatedCompletedTasks);
    deleteTask(index);
    localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
  };

  const deleteCompletedTask = (index) => {
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
    setCompletedTasks(updatedCompletedTasks);
    localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingTask(todos[index]);
  };

  const saveEditedTask = () => {
    const updatedTodos = todos.map((task, index) => (index === editingIndex ? editingTask : task));
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setEditingIndex(null);
    setEditingTask({ title: "", description: "" });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task title"
        />
        <input
          type="text"
          value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Task description"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="view-toggle">
        <button onClick={() => setShowCompleted(false)} className={!showCompleted ? 'active' : ''}>Todos</button>
        <button onClick={() => setShowCompleted(true)} className={showCompleted ? 'active' : ''}>Completed</button>
      </div>
      <div className="task-list">
        {!showCompleted && todos.map((task, index) => (
          <div key={index} className="task-item">
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={e => setEditingTask({ ...editingTask, title: e.target.value })}
                  placeholder="Edit title"
                />
                <input
                  type="text"
                  value={editingTask.description}
                  onChange={e => setEditingTask({ ...editingTask, description: e.target.value })}
                  placeholder="Edit description"
                />
                <button onClick={saveEditedTask}>Save</button>
              </div>
            ) : (
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <AiOutlineEdit onClick={() => startEditing(index)} />
                <AiOutlineDelete onClick={() => deleteTask(index)} />
                <BsCheckLg onClick={() => completeTask(index)} />
              </div>
            )}
          </div>
        ))}
        {showCompleted && completedTasks.map((task, index) => (
          <div key={index} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <AiOutlineDelete onClick={() => deleteCompletedTask(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
