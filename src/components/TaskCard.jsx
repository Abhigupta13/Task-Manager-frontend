/* eslint-disable react/prop-types */
// src/components/Card.js
import { useContext } from 'react';
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import TaskContext from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
const TaskCard = ({ title, description, dueDate, status,id }) => {
  const context=useContext(TaskContext)
  const {deleteTask}=context

  const navigate=useNavigate()
  return (
    <>
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 p-4 bg-slate-200">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-blue-600">{title}</div>
        <p className="text-gray-900 text-lg">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <p className="text-gray-900">Due Date: {new Date(dueDate).toLocaleDateString()}</p>
        <p className={`text-md mt-2 ${status === 'Done' ? 'text-green-600' : status === 'Pending' ? 'text-red-500' : 'text-yellow-700'}`}>
          Status: {status}
        </p>
      </div>
      <div className='flex justify-between'>
        <MdDelete className='text-3xl text-left m-2 cursor-pointer' onClick={()=>(
          deleteTask(id)
        )}/>
        <MdOutlineEdit className='text-3xl text-right m-2 cursor-pointer' onClick={()=>(
          navigate(`/edittask/${id}`)
        )}/>
      </div>
      <div>
      </div>
    </div>
    </>
  );
};

export default TaskCard;
