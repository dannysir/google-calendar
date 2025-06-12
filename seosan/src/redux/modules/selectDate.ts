import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CalendarState {
    selectedDate: Date;
    currentWeek: Date[];
}

const getSelectedWeek = (date: Date): Date[] => {
    const newSelectedWeek = [];
    const sunday = new Date(date);
    const day = sunday.getDay();
    const dateOfSun = sunday.getDate() - day;
    sunday.setDate(dateOfSun);

    for (let i = 0; i < 7; i++) {
        const weekDate = new Date(sunday);
        weekDate.setDate(sunday.getDate() + i);
        newSelectedWeek.push(weekDate);
    }
    return newSelectedWeek;
};

const now = new Date();

const initialState: CalendarState = {
    selectedDate: now,
    currentWeek: getSelectedWeek(now),
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setSelectedDate: (state, action: PayloadAction<Date | undefined>) => {
            if (action.payload) {
                state.selectedDate = action.payload;
                state.currentWeek = getSelectedWeek(action.payload);
            }
        },
    },
});

export const { setSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;