import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {EventType} from "./event.ts";

export type ModalType = 'add' | 'update';

interface ModalState {
    modalType: ModalType | null;
    isOpen: boolean;
    selectedEvent?: EventType | null;
}

interface OpenModalPayload {
    modalType: ModalType;
    selectedEvent?: EventType | null;
}

const initialState: ModalState = {
    modalType: null,
    isOpen: false,
    selectedEvent: null,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<OpenModalPayload>) => {
            state.isOpen = true;
            state.modalType = action.payload.modalType;
            state.selectedEvent = action.payload.selectedEvent || null;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.modalType = null;
            state.selectedEvent = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;