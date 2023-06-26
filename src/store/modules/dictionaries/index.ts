import { combineReducers } from "redux";
import { cities } from "./cities"
import { templates } from "./templates"

export const dictionaries = combineReducers({
    cities,
    templates
})