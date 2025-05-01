import { create } from 'zustand';

const useDataStore = create((set, get) => ({
  data: null,

  setData: (newData) => set({ data: newData }),

  getData: () => get().data,
}));

export default useDataStore;
