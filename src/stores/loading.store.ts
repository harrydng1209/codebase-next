import { create } from 'zustand';

interface IState {
  actions: {
    hideLoading: () => void;
    showLoading: () => void;
  };
  getters: {
    getIsLoading: () => boolean;
  };
  isLoading: boolean;
}

export const loadingStore = create<IState>((set, get) => ({
  actions: {
    hideLoading: () => set({ isLoading: false }),
    showLoading: () => set({ isLoading: true }),
  },
  getters: {
    getIsLoading: () => get().isLoading,
  },
  isLoading: false,
}));

export const useLoadingStore = () => {
  const actions = loadingStore((state) => state.actions);
  const getters = loadingStore((state) => state.getters);

  return { ...actions, ...getters };
};
