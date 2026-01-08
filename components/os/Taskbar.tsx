import React from 'react';
import { AppWindow } from 'lucide-react'; // Placeholder for Start icon

interface TaskbarProps {
    openWindows: { id: string; title: string; isActive: boolean }[];
    onWindowFocus: (id: string) => void;
    onToggleStart: () => void;
    isStartOpen: boolean;
}

export default function Taskbar({ openWindows, onWindowFocus, onToggleStart, isStartOpen }: TaskbarProps) {
    return (
        <div className="fixed bottom-0 left-0 w-full h-10 bg-win-gray border-t-2 border-white flex items-center px-1 gap-1 z-50">

            {/* Start Button */}
            <button
                onClick={onToggleStart}
                className={`
          flex items-center gap-1 px-2 py-1 font-bold text-sm select-none
          border-2 border-t-white border-l-white border-b-black border-r-black
          ${isStartOpen ? 'bg-gray-300 border-t-black border-l-black border-b-white border-r-white' : 'shadow-sm'}
        `}
            >
                <div className="w-5 h-5 bg-black text-white flex items-center justify-center font-serif italic text-xs">P</div>
                Start
            </button>

            <div className="w-[1px] h-8 bg-gray-500 mx-1 border-r border-white"></div>

            {/* Window Tabs */}
            <div className="flex-1 flex gap-1 overflow-x-auto">
                {openWindows.map((win) => (
                    <button
                        key={win.id}
                        onClick={() => onWindowFocus(win.id)}
                        className={`
              flex items-center gap-2 px-3 py-1 text-sm min-w-[120px] max-w-[200px] truncate select-none
              border-2 
              ${win.isActive
                                ? 'bg-gray-300 font-bold border-t-black border-l-black border-b-white border-r-white'
                                : 'bg-win-gray border-t-white border-l-white border-b-black border-r-black'
                            }
            `}
                    >
                        {/* We can pass icon here later */}
                        <span className="truncate">{win.title}</span>
                    </button>
                ))}
            </div>

            {/* Clock Area */}
            <div className="border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white px-3 py-1 text-sm bg-win-gray inset-shadow">
                20:26 PM
            </div>
        </div>
    );
}
