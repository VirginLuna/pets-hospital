/*
 * @Author: Luna
 * @Date: 2023-11-21 16:32:01
 * @Description: store
 */

import { create } from 'zustand';

const useLoginStore = create((set) => ({
  isLogin: false,
  setIsLogin: (newToken: boolean) => set(() => ({ isLogin: newToken })),
  resetIsLogin: () => set({ token: false }),
}));

export default useLoginStore;
