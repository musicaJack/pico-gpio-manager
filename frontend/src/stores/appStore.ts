import { create } from 'zustand';
import { BOARD_VERSIONS, type BoardVersion } from '../services/config';

interface AppState {
  // 基础状态
  currentBoard: BoardVersion;
  
  // UI状态
  ui: {
    loading: boolean;
    sidebarCollapsed: boolean;
    theme: 'light' | 'dark';
  };
  
  // 操作
  actions: {
    setCurrentBoard: (board: BoardVersion) => void;
    setLoading: (loading: boolean) => void;
    toggleSidebar: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
  };
}

const initialState = {
  currentBoard: BOARD_VERSIONS.BOARD_1,
  ui: {
    loading: false,
    sidebarCollapsed: false,
    theme: 'light' as const,
  },
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  
  actions: {
    setCurrentBoard: (board) => set({ currentBoard: board }),
    
    setLoading: (loading) => set(state => ({
      ui: { ...state.ui, loading }
    })),
    
    toggleSidebar: () => set(state => ({
      ui: { ...state.ui, sidebarCollapsed: !state.ui.sidebarCollapsed }
    })),
    
    setTheme: (theme) => set(state => ({
      ui: { ...state.ui, theme }
    })),
  },
})); 