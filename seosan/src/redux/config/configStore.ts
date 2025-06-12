import { createStore } from "redux";
import { combineReducers } from "redux";
import calendarReducer from '../modules/selectDate.ts'
import modalReducer from '../modules/modal.ts'

const rootReducer = combineReducers({
    calendar: calendarReducer,
    modal: modalReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);