import './App.css'
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Tasks from "./components/Tasks"
import TaskState from './context/TaskState'
import AddTask from './components/AddTask'
import TaskUpdate from './components/TaskUpdate'
function App() {


  return (
    <>
      <TaskState>
        <BrowserRouter>
          <Routes>
            <Route path="/addtask" element={<AddTask></AddTask>}></Route>
            <Route path="/" element={<Tasks></Tasks>}></Route>
            <Route path="/edittask/:id" element={<TaskUpdate/>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
          </Routes>
        </BrowserRouter>
      </TaskState>
    </>
  )
}

export default App
