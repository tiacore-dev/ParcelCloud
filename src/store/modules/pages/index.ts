import { combineReducers } from "redux";
import { parcels } from "./parcels/reducers"

export const pages = combineReducers({
    parcels
})