import {useState} from 'react';
import AddTaskForm from './Components/AddTaskForm.jsx'
import UpdateForm from './Components/UpdateForm.jsx'
import ToDo from './Components/ToDo.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {

  // Tasks (ToDo List) State
  //////////////////////////
  const [toDo, setToDo] = useState([ ]);


  // Temp State
  /////////////
  const [newTask, setNewTask] = useState('');
  const[updateData, setUpdateData] = useState('');

  //Add Task
  //////////
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }

  //Delete Task
  /////////////
  const deleteTask = (id) => {
    let newTasks = toDo.filter( task => task.id !== id)
    setToDo(newTasks);
  }

  //Mark Task as done or Completed
  ////////////////////////////////
  const markDone = (id) => {
    const newTask = toDo.map( task => {
      if( task.id === id ) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTask);
  }

  //Cancel Update
  ///////////////
  const cancelUpdate = () => {
    setUpdateData('');
  }

  //Change Task for Update
  ////////////////////////
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title:   e.target.value,
      status: updateData.status ? true : false  
    }
    setUpdateData(newEntry);
  }

  //Update Task
  /////////////
  const updateTask = () => {
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id );
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
  }


  return (
    <div className="container App">

      <br /><br />
      <h2>To Do list App (ReactJS)</h2>
      <br /><br />

  

    {updateData && updateData ? (
      <UpdateForm 
      updateData={updateData}
      changeTask={changeTask}
      updateTask={updateTask}
      cancelUpdate={cancelUpdate}
      />
    ) : (
      <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
  )}

{/* Dsiplay TODos */}
    
    {toDo && toDo.length ? '' : 'No Tasks...'}

      <ToDo 
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />


</div>
  );
}


export default App;
