import  { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskContext from '../context/TaskContext'
import { Circles } from 'react-loader-spinner';
import TaskCard from './TaskCard'
export default function Tasks() {
    const navigate = useNavigate()
    const context = useContext(TaskContext)
    const { tasks, getTasks } = context
    const {loading} = context
    useEffect(() => {
        
        if (localStorage.getItem('token')) {
            // setLoading(true)
            getTasks()
            // setLoading(false)
        }
        else {
            navigate("/login")
        }
    }, [])
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.setItem('token', '')
        navigate('/login')
    }
    return (
        <div className='bg-gradient-to-r from-blue-600 to-black w-full h-screen p-5'>
            <h2 className='text-4xl mb-4 font-semibold text-center text-white'>Your Tasks</h2>
            <button className='absolute top-0 right-0 z-[1] text-white bg-blue-900 rounded-lg m-8 p-2' 
            onClick={handleLogout}>Logout</button>
            <button className='bg-blue-800 rounded-lg p-2 m-4 text-white text-2xl' onClick={(e) => {
                e.preventDefault()
                navigate("/addTask")
            }}>
                Add Task
            </button>
            {loading && <div className="flex justify-center align-items-center p-8">
                <Circles
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>}
            {!loading && <div className='grid md:grid-cols-3'>
                {tasks.map((task) => {
                    return <TaskCard key={task._id} title={task.title} description={task.description} status={task.status} dueDate={task.due_date} id={task._id} />
                })}
            </div>}
        </div>
    )
}
