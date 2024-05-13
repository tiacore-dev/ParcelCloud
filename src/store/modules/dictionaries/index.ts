import { templates } from "./templates";
import { combineReducers } from "redux";
import { cities } from "./cities";

export const dictionaries = combineReducers({
  templates,
  cities,
});
