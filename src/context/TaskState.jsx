/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import { useState } from "react";
import TaskContext from "./TaskContext";
const server_url= "http://localhost:3000"
const TaskState = (props) => {
  const initialTasks = []
  const [tasks, setTasks] = useState(initialTasks)
  const [loading,setLoading]=useState(false);
  const getTasks=async()=>{
    setLoading(true)
    const response = await fetch(`${server_url}/task/getTask`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    });
    const json=await response.json();
    setTasks(json)
    setLoading(false)
  }


  const addTask = async (title, description,status,date) => {
    //to api call
    setLoading(true)
    const response = await fetch(`${server_url}/task/addTask`, {
      method: "POST",
      headers: {
        "Content-type":"Application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title:title,description:description,status:status,due_date:date})
    });
    const task=await response.json()
    const datePart = task.due_date.split('T')[0];
    const newTask={
      title:task.title,
      description:task.description,
      status:task.status,
      due_date:datePart,
      id:task._id
    }

    setTasks(tasks.concat(newTask))
    setLoading(false)
  }

  const deleteTask = async (id) => {
    //API Call
    setLoading(true)
    await fetch(`${server_url}/task/deleteTask/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem('token')
      },
    });
    const newTask = tasks.filter((task) => { return task._id !== id })
    setTasks(newTask)
    setLoading(false)
  }


  const updateTask = async (id, title, description, date,status) => {
    //API call
    await fetch(`${server_url}/task/updateTask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,date,status})
    });
    let newTasks=JSON.parse(JSON.stringify(tasks))
    for (let index = 0; index < newTasks.length; index++) {
      const element = newTasks[index];
      if (element._id === id) {
        newTasks[index].title = title;
        newTasks[index].description = description
        newTasks[index].status = status
        newTasks[index].date = date
      }
    }
    setTasks(newTasks)
  }

  return (
    <TaskContext.Provider value={{loading, tasks, addTask, deleteTask, updateTask,getTasks }}>
      {props.children}
    </TaskContext.Provider>
  )
}
export default TaskState;