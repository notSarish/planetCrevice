import React from 'react';
import Jan2026 from '@/components/months/Jan2026';

export interface RegistryItem {
    title: string;
    component: React.ReactNode;
    icon: string; // lucide icon name or path
    initialSize: { w: number; h: number };
}

export const WINDOW_REGISTRY: Record<string, RegistryItem> = {
    'jan_2026': {
        title: 'January 2026',
        component: <Jan2026 />,
        icon: 'folder-open',
        initialSize: { w: 800, h: 600 }
    }
};
