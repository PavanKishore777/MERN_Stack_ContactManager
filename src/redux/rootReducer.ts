import {combineReducers} from "@reduxjs/toolkit";
import * as contactReducer from "./contacts/contacts.slice"

/**
 *
 */
export const rootReducer = combineReducers({
    [contactReducer.contactFeature]: contactReducer.contactSlice.reducer
});
export default rootReducer;