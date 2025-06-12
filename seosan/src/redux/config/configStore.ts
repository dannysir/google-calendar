import { createStore } from "redux";
import { combineReducers } from "redux";
import calendarReducer from '../modules/selectDate.ts'

const rootReducer = combineReducers({
    calendar: calendarReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);