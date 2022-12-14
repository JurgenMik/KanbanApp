import React, {useState} from 'react';
import {MdClose} from "react-icons/md";
import {Task} from "../Interfaces/Board";

function AddTask({board, setBoard, setAddModal} : any) {

    const [validate, setValidate] = useState({
        message: ''
    });
    const [task, setNewTask] = useState<Task>({
        title: '',
        description: '',
        status: '',
        subtasks: []
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | any>) => {
        setNewTask({...task, [e.target.name] : e.target.value})
    }

    const handleNewSubTask = () => {
        const tasks = [...task.subtasks];

        let newTask = tasks.concat({title: '', isCompleted: false});
        setNewTask({...task, subtasks : newTask});
    }

    const handleSubTaskChange = (e : React.ChangeEvent<HTMLInputElement>, index : any) => {
        const tasks : any = [...task.subtasks];

        tasks[index].title = e.target.value;
        setNewTask({...task, subtasks : tasks});
    }

    const handleRemoveSubTask = (e : React.MouseEvent<HTMLOrSVGElement>, title : any) => {
        let deleteTask = task.subtasks.filter((task : any) => task.title !== title);

        setNewTask({...task, subtasks : deleteTask});
    }

    const handleValidateSubtasks = () => {
        let validateError = '';

        task.subtasks.map((info : any) => {
            if (info.title === '') {validateError = `Can't be empty`}
        });

        if (validateError) {
            setValidate({...validate, message : validateError});
            return false;
        }
        return true;
    }

    const handleCreateTask = () => {
        let isValid : boolean  = handleValidateSubtasks();

        const index = board.columns.findIndex((column : any) => column.name === task.status);

        let column = [...board.columns];
        column[index].tasks.push(task);

        if (isValid) {
            setBoard({...board, columns : column});

            setAddModal(false);
        }
    }

    return (
        <div className="w-1/3 h-auto bg-slate-800 rounded-md absolute top-36 left-96 pb-8 shadow-[50px_15px_15px_1150px_rgba(0,0,0,0.56)]">
            <div className="w-4/5 ml-auto mr-auto">
                <div className="w-full h-20 flex items-center">
                    <h1 className="text-white text-lg font-medium">
                        Add New Task
                    </h1>
                </div>
                <div className="w-full">
                    <div className="mt-2 space-y-2">
                        <label className="text-white text-sm font-medium mb-2">
                            Title
                        </label>
                        <input
                            className="w-full p-2 bg-slate-800 border border-gray-700 rounded-md text-gray-400"
                            type="text"
                            name="title"
                            placeholder="e.g Take a coffee break"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-2 space-y-2">
                        <label className="text-white text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            className="w-full pb-16 bg-slate-800 border border-gray-700 rounded-md text-gray-400"
                            name="description"
                            placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little."
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-2 space-y-2">
                        <label className="text-white text-sm font-medium">
                            Subtasks
                        </label>
                        {task.subtasks.map((info : any, index) => {
                            return (
                                <span className="h-12 flex items-center space-x-2" key={index}>
                                <input
                                    className={`w-4/5 p-2 bg-slate-800 border ${!validate.message ? "border-gray-700" : "border-red-600"} rounded-md text-gray-400 mb-2`}
                                    type="text"
                                    placeholder="e.g make coffee"
                                    name="title"
                                    onChange={e => handleSubTaskChange(e, index)}
                                />
                                <MdClose
                                    className={`text-2xl ${!validate.message ? "text-gray-400" : "text-red-600"} hover:text-red-500`}
                                    onClick={e => handleRemoveSubTask(e, info.title)}
                                />
                            </span>
                            )
                        })}
                        <div className="w-full pt-2">
                            <button onClick={handleNewSubTask} className="w-full p-3 rounded-full bg-white text-indigo-500 font-medium hover:text-indigo-300">
                                +Add New Subtask
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 space-y-2">
                        <label className="text-white text-sm font-medium mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            className="w-full p-2 rounded-md bg-slate-800 border border-gray-700 text-white mt-4 bg-blend-color-dodge"
                            onChange={handleChange}
                        >
                        {board.columns.map((column : any) => {
                            return (
                                <option value={column.name} key={column.name}>
                                    {column.name}
                                </option>
                            )
                        })}
                        </select>
                        <div className="w-full pt-4">
                            <button onClick={handleCreateTask} className="w-full p-3 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-400">
                                Create Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTask;