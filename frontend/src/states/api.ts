import { create } from 'zustand';

interface ApiStore {
  apiUrl: string;
  gqlUrl: string;
  setApiUrls: (apiUrl: string, gqlUrl: string) => void;
}

export const useApiStore = create<ApiStore>()((set) => ({
  apiUrl: '',
  gqlUrl: '',
  setApiUrls: (apiUrl, gqlUrl) => set({ apiUrl, gqlUrl }),
}));
