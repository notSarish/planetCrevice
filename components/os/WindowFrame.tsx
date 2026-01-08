import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface WindowFrameProps {
    id: string;
    title: string;
    onClose: (id: string) => void;
    onFocus: (id: string) => void;
    isActive: boolean;
    initialSize: { w: number; h: number };
    position: { x: number; y: number }; // Optional initial position
    zIndex: number;
    children: React.ReactNode;
}

export default function WindowFrame({
    id,
    title,
    onClose,
    onFocus,
    isActive,
    initialSize,
    zIndex,
    children
}: WindowFrameProps) {
    return (
        <motion.div
            drag
            dragMomentum={false}
            onMouseDown={() => onFocus(id)}
            style={{
                width: initialSize.w,
                height: initialSize.h,
                zIndex: zIndex,
                position: 'absolute',
            }}
            initial={{ x: 100, y: 100, scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`flex flex-col bg-win-gray border-2 p-1 shadow-xl
        ${isActive ? 'border-white' : 'border-win-gray'}
        border-t-white border-l-white border-b-black border-r-black
      `}
        >
            {/* Title Bar */}
            <div
                className={`flex items-center justify-between px-1 py-0.5 mb-1 select-none
          ${isActive
                        ? 'bg-gradient-to-r from-blue-900 to-blue-600 text-white'
                        : 'bg-gray-400 text-gray-700'
                    }
        `}
            >
                <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
                    <span className="ml-1">{title}</span>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(id); }}
                    className="bg-win-gray border border-t-white border-l-white border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white p-0.5 px-1 min-w-[20px] flex items-center justify-center"
                >
                    <X size={12} className="text-black" strokeWidth={3} />
                </button>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-auto bg-white border border-t-black border-l-black border-b-white border-r-white relative">
                {children}
            </div>
        </motion.div>
    );
}
