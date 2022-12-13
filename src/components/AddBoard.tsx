import React, { useState } from 'react';
import {MdClose} from 'react-icons/md';
import {Board} from '../Interfaces/Board';

function AddBoard({boards, setNewBoard, setBoards} : any) {
    const [board, setBoard] = useState<Board>({
        name: '',
        columns: []
    })

    const handleNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setBoard({...board, name : e.target.value});
    }

    const handleNewBoardColumn = () => {
        const columns = [...board.columns];

        let newColumn = columns.concat({name: '', tasks: []});
        setBoard({...board, columns: newColumn});
    }

    const handleColumnChange = (e : React.ChangeEvent<HTMLInputElement>, index : any) => {
        const column : any = [...board.columns];

        column[index].name = e.target.value;
        setBoard({...board, columns : column});
    }

    const handleDeleteColumn = (e : React.MouseEvent<HTMLOrSVGElement>, name : any) => {
        let updatedColumns = board.columns.filter((column : any) => column.name !== name);

        setBoard({...board, columns : updatedColumns});
    }

    const handleBoardSave = () => {
        setBoards(boards.concat(board));

        setNewBoard(false);
    }

    return (
        <div className="w-1/3 h-auto bg-slate-800 rounded-md absolute top-56 left-96 pb-8 shadow-[50px_15px_15px_1150px_rgba(0,0,0,0.56)]">
            <div className="w-4/5 h-full ml-auto mr-auto">
                <div className="w-full h-24 flex items-center">
                    <h1 className="text-white text-lg font-medium">
                        Add New Board
                    </h1>
                </div>
                <div className="w-full flex flex-col">
                    <label className="text-sm text-white font-medium mb-2">
                        Board Name
                    </label>
                    <input
                        name="boardName"
                        type="text"
                        className="p-2 bg-slate-800 border border-gray-700 rounded-md text-gray-400"
                        placeholder="e.g Web Design"
                        onChange={handleNameChange}
                    />
                </div>
                <div className="w-full flex flex-col mt-4">
                    <label className="text-sm text-white font-medium mb-2">
                        Board Columns
                    </label>
                    {board.columns.map((data : any, index : number) => {
                        return (
                            <span className="h-12 flex items-center space-x-2" key={index}>
                                <input
                                    className="w-4/5 p-2 bg-slate-800 border border-gray-700 rounded-md text-gray-400 mb-2"
                                    type="text"
                                    name="columnName"
                                    onChange={e => handleColumnChange(e, index)}
                                />
                                <MdClose
                                    className="text-2xl text-gray-400 hover:text-red-500"
                                    onClick={e => handleDeleteColumn(e, data.name)}
                                />
                            </span>
                        )
                    })}
                </div>
                <div className="w-full flex flex-col mt-4 space-y-6">
                    <button onClick={handleNewBoardColumn} className="p-3 rounded-full bg-white text-indigo-500 font-medium">
                        +Add New Column
                    </button>
                    <button onClick={handleBoardSave} className="p-3 rounded-full bg-indigo-500 text-white font-medium">
                        Create New Board
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddBoard;