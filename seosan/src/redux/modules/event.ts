import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

interface EventType {
    id: number;
    title: string;
    eventDate: string;
    startTime: number;
    endTime: number;
    repeat: boolean;
}

interface EventState {
    eventArray: EventType[];
}

const initialState: EventState = {
    eventArray: [],
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<EventType>) => {
            const newEvent: EventType = {
                ...action.payload
            };
            state.eventArray.push(newEvent);
        },
        updateEvent: (state, action: PayloadAction<EventType>) => {
            const index = state.eventArray.findIndex(event => event.id === action.payload.id);
            if (index !== -1) {
                state.eventArray[index] = action.payload;
            }
        },
        deleteEvent: (state, action: PayloadAction<number>) => {
            state.eventArray = state.eventArray.filter(event => event.id !== action.payload);
        },
    },
});

export const {addEvent, updateEvent, deleteEvent} = eventSlice.actions;
export default eventSlice.reducer;