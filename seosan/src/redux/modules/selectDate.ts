import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface CalendarState {
    selected: string;
    currentWeek: string[];
    now: string
}

const getSelectedWeek = (date: string): string[] => {
    const newSelectedWeek = [];
    const sunday = new Date(date);
    const day = sunday.getDay();
    const dateOfSun = sunday.getDate() - day;
    sunday.setDate(dateOfSun);

    for (let i = 0; i < 7; i++) {
        const weekDate = new Date(sunday);
        weekDate.setDate(sunday.getDate() + i);
        newSelectedWeek.push(weekDate.toISOString());
    }
    return newSelectedWeek;
};

const now = new Date().toISOString();

const initialState: CalendarState = {
    selected: now,
    currentWeek: getSelectedWeek(now),
    now: now,
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setSelectedDate: (state, action: PayloadAction<string>) => {
            if (action.payload) {
                state.selected = action.payload;
                state.currentWeek = getSelectedWeek(action.payload);
            }
        },
        setDateNextWeek: (state) => {
            const selectedDate = new Date(state.selected);
            selectedDate.setDate(selectedDate.getDate() + 7);
            state.selected = selectedDate.toISOString();
            state.currentWeek = getSelectedWeek(state.selected);
        },
        setDatePrevWeek: (state) => {
            const selectedDate = new Date(state.selected);
            selectedDate.setDate(selectedDate.getDate() - 7);
            state.selected = selectedDate.toISOString();
            state.currentWeek = getSelectedWeek(state.selected);
        },
        setDateNow: (state) => {
            const today = new Date().toISOString();
            state.now = today;
            state.selected = today;
            state.currentWeek = getSelectedWeek(today);
        }
    },
});

export const {setSelectedDate, setDateNextWeek, setDatePrevWeek, setDateNow} = calendarSlice.actions;
export default calendarSlice.reducer;