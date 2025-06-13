import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from '../modules/selectDate';
import modalReducer from '../modules/modal';
import eventReducer from '../modules/event.ts'

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        modal: modalReducer,
        event: eventReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;