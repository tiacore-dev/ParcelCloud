import { combineReducers } from "redux";
import { parcels } from "./parcels"
import { parcel } from "./parcel"

export const pages = combineReducers({
    parcels,
    parcel
})