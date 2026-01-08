"use client";

import React, { useState } from 'react';
import { WINDOW_REGISTRY } from '@/lib/registry'; // Fix import path if needed
import Icon from './Icon';
import WindowFrame from './WindowFrame';
import Taskbar from './Taskbar';

// Define the shape of an open window instance
interface OpenWindow {
    id: string; // Unique instance ID (e.g., 'jan_2026-1736140000')
    registryKey: string;
    zIndex: number;
    isMinimized: boolean;
}

export default function Desktop() {
    const [windows, setWindows] = useState<OpenWindow[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const [highestZ, setHighestZ] = useState(10);

    // 1. Open a Window
    const openWindow = (key: string) => {
        // Check if already open (optional constraint: single instance per key?)
        // For now allow multiple, but let's just focus existing if single instance desired.
        // Let's allow multiple instances for true chaotic OS feel, or single? 
        // Usually portfolios are single instance per content.
        const existing = windows.find(w => w.registryKey === key);
        if (existing) {
            focusWindow(existing.id);
            return;
        }

        const newZ = highestZ + 1;
        setHighestZ(newZ);

        const newWindow: OpenWindow = {
            id: `${key}-${Date.now()}`,
            registryKey: key,
            zIndex: newZ,
            isMinimized: false
        };

        setWindows([...windows, newWindow]);
        setActiveWindowId(newWindow.id);
    };

    // 2. Close Window
    const closeWindow = (id: string) => {
        setWindows(windows.filter(w => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    // 3. Focus Window
    const focusWindow = (id: string) => {
        if (activeWindowId === id) return;

        const newZ = highestZ + 1;
        setHighestZ(newZ);

        setWindows(windows.map(w =>
            w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w
        ));
        setActiveWindowId(id);
    };

    // Icons on Desktop
    const registryKeys = Object.keys(WINDOW_REGISTRY);

    return (
        <div className="relative w-full h-full min-h-screen">
            {/* Desktop Icons Grid */}
            <div className="absolute top-0 left-0 p-4 flex flex-col flex-wrap gap-4 h-[calc(100vh-40px)] content-start">
                {registryKeys.map((key) => {
                    const item = WINDOW_REGISTRY[key];
                    return (
                        <Icon
                            key={key}
                            id={key}
                            title={item.title}
                            iconName={item.icon}
                            onOpen={openWindow}
                        />
                    );
                })}
            </div>

            {/* Windows Layer */}
            {windows.map((win) => {
                const item = WINDOW_REGISTRY[win.registryKey];
                if (!item) return null;

                return (
                    <WindowFrame
                        key={win.id}
                        id={win.id}
                        title={item.title}
                        onClose={closeWindow}
                        onFocus={focusWindow}
                        isActive={activeWindowId === win.id}
                        initialSize={item.initialSize}
                        zIndex={win.zIndex}
                        position={{ x: 100 + (win.zIndex * 20) % 200, y: 50 + (win.zIndex * 20) % 200 }} // Stagger 
                    >
                        {item.component}
                    </WindowFrame>
                );
            })}

            {/* Taskbar */}
            <Taskbar
                openWindows={windows.map(w => ({
                    id: w.id,
                    title: WINDOW_REGISTRY[w.registryKey]?.title || 'Unknown',
                    isActive: activeWindowId === w.id
                }))}
                onWindowFocus={focusWindow}
                onToggleStart={() => setStartMenuOpen(!startMenuOpen)}
                isStartOpen={startMenuOpen}
            />
        </div>
    );
}
