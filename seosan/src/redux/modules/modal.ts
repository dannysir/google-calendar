import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ModalType = 'add' | 'update';

interface ModalState {
    modalType: ModalType | null;
    isOpen: boolean;
}

const initialState: ModalState = {
    modalType: null,
    isOpen: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<ModalType>) => {
            state.isOpen = true;
            state.modalType = action.payload;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.modalType = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;