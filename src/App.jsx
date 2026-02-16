import './App.css';
import TaskClass from "./Task.jsx";
import { useState} from 'react';
import { createRoot } from 'react-dom/client';
import React from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <h10>Shiftconnector</h10>
        <h2>My Todos</h2>
      </header>
      <div calssName="Main-content">
        <button onClick={() => setFiltered(true)}>Filter tasks</button>
        <button onClick={() => setFiltered(false)}>Unfilter</button>
        <p>{getFiltered(filtered)}</p>
        <TaskList tasks={tasks} setTasks={setTasks} filtered={filtered}/>
        <AddTask onAddTask={(task) => setTasks(prev => [...prev, task])}/>
      </div>
    </div>
  );
}

function TaskList({tasks, setTasks, filtered}){
  const [isChecked, setIsChecked] = useState(false);
  const [isDeleted, setDeleted] = useState(false);

  const handleCheckboxChange = (index) => {
    setIsChecked(tasks[index].getDone());
    tasks[index].setDone();
    setTasks([...tasks]);
  };

  const handleDelete = (index) => {
    if(tasks[index].getDone() === false){
      setDeleted(true);
      tasks.splice(index, 1);
      setTasks([...tasks]);
    }
  }

  const displayTasks = filtered ? tasks.filter(item => item.getDone() === true) : tasks;

  return (
    <div className = "Task">
      {displayTasks.map((task, index) => <div><p key={index}>{task.getTitle()}, {task.getDoneText()}</p>
                                    <input type="checkbox" key={index} checked={task.getDone()} onChange={() => handleCheckboxChange(index)}/>
                                    <label>Mark task</label>
                                    <button key={index} onClick={() => handleDelete(index)}>Delete</button>
                                    </div>)}
    </div>
  )
  }

function AddTask({onAddTask}){
  const createTask = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.taskName.value;
    let task1 = new TaskClass(inputValue);
    onAddTask(task1);
  }
  return (
    <form onSubmit={createTask}>
      <label>
        Create task:
        <input name="taskName"/>
      </label>
      <button type="submit" className = "SubmitTaskBtn">Add Task</button>
    </form>
  )
}

function getFiltered(filtered){
  if(filtered){
    return "Filtered"
  }
  else{
    return "Unfiltered"
  }
}

createRoot(document.getElementById('root')).render(
  <App />
);

export default App;