import React from 'react';

function DeleteTask({taskDetails, setView, setSelected, board, setBoard} : any) {

    const handleDeleteTask = () => {
        const column = board.columns.findIndex((column : any) => column.name === taskDetails.status);

        let newArr : any = [...board.columns];

        newArr[column].tasks = board.columns[column].tasks.filter((task : any) => task.title !== taskDetails.title);

        setBoard({...board, columns : newArr});
        setView(false);
    }

    const handleCancel = () => {
        setView(false);

        setSelected(true);
    }

    return (
        <div className="w-1/3 h-1/4 bg-slate-800 rounded-md absolute top-72 left-96 pb-8 shadow-[50px_15px_15px_1150px_rgba(0,0,0,0.56)]">
            <div className="w-4/5 h-full ml-auto mr-auto">
                <div className="w-full h-1/3 flex items-center text-lg font-medium text-red-600">
                    <h1>
                        Delete This Task?
                    </h1>
                </div>
                <div className="w-full h-1/3">
                    <p className="text-sm text-gray-400 font-medium">
                        Are you sure you want to delete the `{taskDetails.title} task` and its subtasks? This action cannot be reversed.
                    </p>
                </div>
                <div className="w-full flex space-x-4 font-medium">
                    <button onClick={handleDeleteTask} className="w-1/2 p-3 bg-red-600 rounded-full text-white hover:bg-red-400">
                        Delete
                    </button>
                    <button onClick={handleCancel} className="w-1/2 p-3 bg-white rounded-full text-indigo-500">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default  DeleteTask;