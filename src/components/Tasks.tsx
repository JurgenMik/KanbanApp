import React, {useEffect, useState} from 'react';
import TaskDetails from "./TaskDetails";
import {Board} from "../Interfaces/Board";
import DeleteTask from "./DeleteTask";
import AddTask from "./AddTask";

function Tasks({boards, boardSelected, addModal, setAddModal} : any) {

    const selected = boards.find((object : any) => object.name === boardSelected);

    const [board, setBoard] = useState<Board>({...selected});
    const [taskSelected, setSelected] = useState<boolean>(false)
    const [taskDetails, setDetails] = useState<Board>();
    const [viewDeleteModal, setView] = useState<boolean>(false);

    useEffect(() => {
        setBoard(selected);
    }, [boardSelected])

    const handleNewColumn = () => {
        const columns = [...board.columns];

        let newColumn = columns.concat({name: '', tasks: []});
        setBoard({...board, columns: newColumn});
    }

    const handleTaskSelected = (e : React.MouseEvent<HTMLElement>, info : any) => {
        setDetails(info);

        setSelected(true);
    }

    const handleDeleteTaskModal = () => {
        setView(true);

        setSelected(false);
    }

    return (
        <div className="w-full h-full">
            {addModal ? <AddTask board={board} setBoard={setBoard} setAddModal={setAddModal} /> : null}
            {viewDeleteModal ? <DeleteTask taskDetails={taskDetails} setView={setView} setSelected={setSelected} board={board} setBoard={setBoard} /> : null}
            {taskSelected ? <TaskDetails taskDetails={taskDetails} board={board} setSelected={setSelected} handleDeleteTaskModal={handleDeleteTaskModal} /> : null}
            {board.columns.length !== 0 ?
                <div className="w-full h-full grid grid-cols-5">
                    {board.columns.map((boardDetails : any, index : number) => {
                        return (
                            <div className="w-5/6 h-full ml-auto mr-auto" key={boardDetails.name}>
                                <div className="w-full h-16 flex items-center pl-6 space-x-2">
                                    <span className={`rounded-full p-2 ${index === 0 ? "bg-cyan-500" : index === 2 ? "bg-emerald-500" : "bg-indigo-500"}`}>
                                    </span>
                                    <h1 className="text-gray-400 font-medium">
                                        {boardDetails.name}({boardDetails.tasks.length})
                                    </h1>
                                </div>
                                <div className="w-full h-full">
                                    {boardDetails.tasks.map((info : any) => {
                                        return (
                                            <div onClick={e => handleTaskSelected(e, info)} className="w-full h-auto mt-6 flex flex-col items-center rounded-lg bg-slate-800 pt-3 hover:bg-slate-700" key={info.title}>
                                                <div className="w-4/5 h-full pb-3">
                                                    <h1 className="font-medium text-white">
                                                        {info.title}
                                                    </h1>
                                                    <h1 className="text-sm font-medium text-gray-400 mt-2">
                                                        {info.subtasks.filter((task : any) => task.isCompleted).length} of {info.subtasks.length} subtasks
                                                    </h1>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    <div className="w-full h-5/6 shadow-md flex items-center justify-center bg-slate-750 border rounded-md border-gray-700 mt-6">
                        <h1 onClick={handleNewColumn} className="font-medium text-2xl text-gray-400">
                            +New Column
                        </h1>
                    </div>
                </div> :
                <div className="w-full h-full flex flex-col justify-center items-center space-y-6">
                    <h1 className="text-xl text-gray-400 font-medium">
                        This board is empty. Create a new column to get started.
                    </h1>
                    <button onClick={handleNewColumn} className="p-3 bg-indigo-500 text-white font-medium rounded-full hover:bg-indigo-400">
                        +Add New Column
                    </button>
                </div>
            }
        </div>
    );
}

export default Tasks;