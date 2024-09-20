import {create } from 'zustand';
interface ModalState {
    modal: boolean;
    setModal: (modal: boolean) => void;
}
export const useModalStore = create<ModalState>((set) => ({
    modal: false,
    setModal: (modal) => set((state) => ({ ...state, modal })),
}))