// src/components/AddTaskForm.js
import { useContext, useState } from 'react';
import TaskContext from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
const AddTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Pending');
    const navigate=useNavigate()
    const context=useContext(TaskContext)
    const {addTask}=context
    const handleSubmit = async (event) => {
        event.preventDefault();
        addTask(title,description,status,dueDate)
        setTitle('')
        setDescription('')
        setDueDate('')
        setStatus('')
        navigate("/")
    };

    return (
        <div className='bg-gradient-to-r from-blue-600 to-black w-full h-screen pt-24'>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 w-full border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 p-2 w-full border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1 p-2 w-full border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-1 p-2 w-full border rounded"
                >
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                    <option value="In-Progress">In-Progress</option>
                </select>
            </div>
            <div className='flex justify-between'>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Add Task
            </button>
            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" onClick={()=>(
                navigate("/")
            )}>
                Cancel
            </button>
            </div>
        </form>
        </div>
    );
};

export default AddTask;
