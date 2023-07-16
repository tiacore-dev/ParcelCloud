import { combineReducers } from "redux";
import { parcels } from "./parcels"
import { parcel } from "./parcel"
import { templates } from "./templates"
import { template } from "./template"
import { prices } from "./prices"




export const pages = combineReducers({
    parcels,
    parcel,
    templates,
    template,
    prices
})