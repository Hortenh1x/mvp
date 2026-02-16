import './App.css';
import TaskClass from "./Task.jsx";
import { useState} from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <h10>Shiftconnector</h10>
        <h2>My Todos</h2>
      </header>
      <div calssName="Main-content">
        <TaskList tasks={tasks}/>
        <AddTask onAddTask={(task) => setTasks(prev => [...prev, task])}/>
      </div>
    </div>
  );
}

function TaskList({tasks}){
  const [isChecked, setIsChecked] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const handleCheckboxChange = (index) => {
    setIsChecked(tasks[index].getDone());
    tasks[index].setDone();
  };
  const handleDelete = (index) => {
    if(tasks[index].getDone() === false){
      setDeleted(true);
      tasks.splice(index, 1);
      // onDeleteTask(tasks[index]);
    }
  }
  return (
    <div className = "Task">
      {tasks.map((task, index) => <div><p key={index}>{task.getTitle()}, {task.getDoneText()}</p>
                                       <input type="checkbox" key={index} checked={task.getDone()} onChange={() => handleCheckboxChange(index)}/>
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

function FilterTasks({tasks}){
  tasks.filter(item => item.getDone() === true)
}

createRoot(document.getElementById('root')).render(
  <App />
);

export default App;