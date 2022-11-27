import React, { useState } from 'react';
import {TbLayoutBoardSplit} from 'react-icons/tb';
import {BiHide} from 'react-icons/bi';
import {FiMoreVertical} from 'react-icons/fi';
import data from './data.json';

function App() {

   const [boards, setBoards] = useState<object[]>(data.boards);
   const [boardSelected, setSelected] = useState<string>('Platform Launch');

    const handleBoardSelect = (e : React.MouseEvent<HTMLElement>, boardName : any) => {
        setSelected(boardName);
    }

    return (
    <div className="w-full h-screen grid grid-cols-6">
        <div className="col-span-1 bg-slate-800 border-r border-gray-700">
            <div className="w-3/4 h-24 flex justify-center items-center">
                <img
                    src="../assets/logo-light.svg"
                    alt="logo"
                />
            </div>
            <div className="w-4/5 h-3/4">
                <div className="w-full text-gray-400 font-medium">
                    <h1 className="text-sm ml-6">
                        ALL BOARDS ({boards.length})
                    </h1>
                    <div className="mt-6 ml-6">
                        {boards.map((data : any) => {
                            return (
                                <div className={`${boardSelected === data.name ? "bg-indigo-500 text-white" : null} h-12 flex items-center space-x-3 rounded-r-full`} key={data.name}>
                                    <TbLayoutBoardSplit className="text-xl" />
                                    <h1 onClick={ e => handleBoardSelect(e, data.name)}>
                                        {data.name}
                                    </h1>
                                </div>
                            )
                        })}
                        <div className="flex items-center space-x-3 text-indigo-500 mt-2">
                            <TbLayoutBoardSplit className="text-xl" />
                            <h1>
                                +Create New Board
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-end justify-center text-gray-400 font-medium">
                <div className="w-4/5 h-12 bg-slate-900 rounded-md flex flex-row items-center justify-center space-x-3">
                    <BiHide className="text-xl" />
                    <p>
                        Hide Sidebar
                    </p>
                </div>
            </div>
        </div>
        <div className="col-span-5 bg-slate-900">
            <div className="w-full h-24 bg-slate-800 flex">
                <div className="w-4/5 h-full flex items-center">
                    <h1 className="text-2xl text-white font-medium ml-6 items-center">
                        {boardSelected}
                    </h1>
                </div>
                <div className="w-1/5 flex items-center justify-center space-x-2">
                    <button className="w-1/2 p-3 bg-indigo-500 rounded-full text-white font-medium">
                        +Add New Task
                    </button>
                    <FiMoreVertical className="text-indigo-400 text-2xl" />
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
