import React from 'react';

export default function Jan2026() {
    return (
        <div className="relative w-full h-full bg-[#fdfaf5] p-4 font-mono text-black overflow-hidden">
            {/* Background/Desk texture could go here */}

            {/* 1. Video Box */}
            <div className="absolute top-10 left-10 w-64 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                <div className="bg-blue-800 text-white px-1 text-xs py-1 flex justify-between">
                    <span>video_01.avi</span>
                    <button>x</button>
                </div>
                <div className="h-40 bg-black flex items-center justify-center text-win-teal">
                    [VIDEO PLACEHOLDER]
                </div>
            </div>

            {/* 2. Note Box */}
            <div className="absolute top-40 right-20 w-48 h-48 bg-yellow-100 border border-yellow-300 shadow-md p-4 rotate-2 transform decoration-slice">
                <p className="font-handwriting">
                    To do:<br />
                    - Fix the registry<br />
                    - Buy milk<br />
                    - Deploy planetCrevice
                </p>
            </div>

            {/* 3. Photo */}
            <div className="absolute bottom-10 left-1/3 transform -rotate-3 p-2 bg-white shadow-lg border border-gray-200">
                <div className="w-40 h-32 bg-gray-300 mb-2"></div>
                <p className="text-center text-xs text-gray-500">Jan 2026</p>
            </div>
        </div>
    );
}
