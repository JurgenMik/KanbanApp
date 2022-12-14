import React, {useState} from 'react';
import {FiMoreVertical} from 'react-icons/fi';

function TaskDetails({taskDetails, board, setSelected, handleDeleteTaskModal, handleEditTaskModal, setDetails} : any) {

    const [option, setOptions] = useState<boolean>(false);

    const handleViewOptions = () => {
        setOptions(!option);
    }

    const handleCloseModal = () => {
        setSelected(false);
    }

    const handleCheckboxChange = (e : React.ChangeEvent<HTMLInputElement>, index : any) => {
        let subtask = [...taskDetails.subtasks];

        subtask[index].isCompleted = true;

        setDetails({...taskDetails, subtasks : subtask});
    }

    return (
        <div className="w-1/3 h-auto bg-slate-800 rounded-md absolute top-56 left-96 pb-8 shadow-[50px_15px_15px_1150px_rgba(0,0,0,0.56)]">
            <div className="w-5/6 ml-auto mr-auto mt-4">
                <div className="w-full h-24 flex items-center justify-center">
                    <div className="w-5/6">
                        <h1 className="text-lg text-white font-medium">
                            {taskDetails.title}
                        </h1>
                    </div>
                    <div className="w-1/6 flex justify-center relative">
                        <FiMoreVertical
                            className="text-xl text-gray-400 hover:text-gray-300"
                            onClick={handleViewOptions}
                        />
                        {!option ? null :
                            <div className="absolute w-48 h-20 bg-slate-900 top-10 left-50 flex flex-col justify-center rounded-md pl-4 font-medium">
                                <h1 onClick={handleEditTaskModal} className="text-gray-400 hover:text-gray-600">
                                    Edit Task
                                </h1>
                                <h1 onClick={handleDeleteTaskModal} className="text-red-600 hover:text-red-400">
                                    Delete Task
                                </h1>
                                <h1 onClick={handleCloseModal} className="text-indigo-500 text-sm ml-auto float-right pr-4 hover:text-red-500">
                                    Close
                                </h1>
                            </div>
                        }
                    </div>
                </div>
                <div className="w-full mt-4">
                    <p className="text-gray-500">
                        {taskDetails.description}
                    </p>
                </div>
                <div className="w-full">
                    <h1 className="text-sm text-white font-medium mt-8">
                        Subtasks ({taskDetails.subtasks.filter((task : any) => task.isCompleted).length} of {taskDetails.subtasks.length})
                    </h1>
                </div>
                <div className="w-full h-auto space-y-2 mt-4">
                    {taskDetails.subtasks.map((task : any, index : any) => {
                        return (
                            <div className="w-full h-12 bg-slate-900 flex items-center rounded space-x-4 hover:bg-indigo-400" key={task.title}>
                                <input
                                    type="checkbox"
                                    name="isCompleted"
                                    checked={task.isCompleted}
                                    onChange={e => handleCheckboxChange(e, index)}
                                    className={`ml-4 h-4 w-4 focus:ring-0 focus:border-1 ${task.isCompleted ? "text-indigo-500 rounded-sm" : "bg-slate-800 rounded-sm"}`}
                                />
                                <h1 className={`text-sm font-medium ${task.isCompleted ? "text-gray-500 line-through" : "text-white"}`}>
                                    {task.title}
                                </h1>
                            </div>
                        )
                    })}
                </div>
                <div className="w-full h-16 mt-4 flex flex-col mb-8">
                    <h1 className="text-white font-medium text-sm">
                        Current Status
                    </h1>
                    <select
                        name="status"
                        className="w-full p-3 rounded-md bg-slate-800 border border-gray-500 text-white mt-4 bg-blend-color-dodge"
                        value={taskDetails.status}
                    >
                        {board.columns.map((column : any) => {
                            return (
                                <option value={column.name}>
                                    {column.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default TaskDetails;