import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserState {
  age: number;
  increase: (by: number) => void;
}

export const useStore = create<UserState>()(
  devtools((set) => ({
    age: 0,
    increase: (by) => set((state) => ({ age: state.age + by })),
  })),
);
