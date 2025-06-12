import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CalendarState {
    selectedDate: Date | undefined;
}

const initialState: CalendarState = {
    selectedDate: new Date(),
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setSelectedDate: (state, action: PayloadAction<Date | undefined>) => {
            state.selectedDate = action.payload;
        },
    },
});

export const { setSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;