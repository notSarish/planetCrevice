import React from 'react';
import { Folder, FileText, Monitor } from 'lucide-react';

interface IconProps {
    id: string;
    title: string;
    iconName: string;
    onOpen: (id: string) => void;
}

export default function Icon({ id, title, iconName, onOpen }: IconProps) {
    // Simple icon mapper
    const getIcon = (name: string) => {
        switch (name) {
            case 'folder': return <Folder className="w-8 h-8 text-yellow-400 fill-yellow-400" />;
            case 'folder-open': return <Folder className="w-8 h-8 text-yellow-400 fill-yellow-400" />;
            case 'file': return <FileText className="w-8 h-8 text-white" />;
            default: return <Monitor className="w-8 h-8 text-win-gray" />;
        }
    };

    return (
        <div
            className="flex flex-col items-center gap-1 w-20 p-2 cursor-pointer hover:bg-white/20 border border-transparent hover:border-white/20 hover:border-dotted group"
            onDoubleClick={() => onOpen(id)}
        >
            {getIcon(iconName)}
            <span className="text-white text-xs text-center font-mono bg-transparent group-hover:bg-blue-800 px-1">
                {title}
            </span>
        </div>
    );
}
