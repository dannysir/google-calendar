import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from '../modules/selectDate';
import modalReducer from '../modules/modal';

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        modal: modalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;