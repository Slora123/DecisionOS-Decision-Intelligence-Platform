import { create } from 'zustand';
import type { DecisionCard, Connection } from '../types';
import { mockDecisions, mockConnections, templatePresets } from '../data/mockData';

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;

  currentPage: string;
  setCurrentPage: (page: string) => void;

  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  decisions: DecisionCard[];
  addDecision: (d: DecisionCard) => void;
  updateDecision: (id: string, updates: Partial<DecisionCard>) => void;
  deleteDecision: (id: string) => void;

  connections: Connection[];
  addConnection: (c: Connection) => void;
  deleteConnection: (id: string) => void;

  loadTemplate: (templateId: string) => void;

  selectedCardId: string | null;
  setSelectedCardId: (id: string | null) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  notifications: Notification[];
  clearNotifications: () => void;

  canvasTransform: { x: number; y: number; scale: number };
  setCanvasTransform: (t: { x: number; y: number; scale: number }) => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'AI Insight Ready', message: 'New recommendation for "Product Launch"', time: '2m ago', read: false, type: 'info' },
  { id: '2', title: 'Decision Updated', message: 'Team expanded "Market Entry" options', time: '15m ago', read: false, type: 'success' },
  { id: '3', title: 'Risk Alert', message: '"Hiring" card has high risk factors', time: '1h ago', read: true, type: 'warning' },
  { id: '4', title: 'Comment Added', message: 'Priya commented on "Investment Plan"', time: '2h ago', read: true, type: 'info' },
];

export const useAppStore = create<AppState>((set) => ({
  darkMode: true,
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

  currentPage: 'landing',
  setCurrentPage: (page) => set({ currentPage: page }),

  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  decisions: mockDecisions,
  addDecision: (d) => set((s) => ({ decisions: [...s.decisions, d] })),
  updateDecision: (id, updates) =>
    set((s) => ({
      decisions: s.decisions.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    })),
  deleteDecision: (id) => set((s) => ({ decisions: s.decisions.filter((d) => d.id !== id) })),

  connections: mockConnections,
  addConnection: (c) => set((s) => ({ connections: [...s.connections, c] })),
  deleteConnection: (id) => set((s) => ({ connections: s.connections.filter((c) => c.id !== id) })),

  loadTemplate: (templateId) => {
    const preset = templatePresets[templateId];
    if (preset) {
      set({
        decisions: preset.decisions,
        connections: preset.connections,
        selectedCardId: null,
        canvasTransform: { x: 0, y: 0, scale: 1 },
      });
    }
  },

  selectedCardId: null,
  setSelectedCardId: (id) => set({ selectedCardId: id }),

  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  notifications: mockNotifications,
  clearNotifications: () =>
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),

  canvasTransform: { x: 0, y: 0, scale: 1 },
  setCanvasTransform: (t) => set({ canvasTransform: t }),
}));
