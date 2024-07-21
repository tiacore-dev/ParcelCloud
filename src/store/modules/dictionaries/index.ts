import { templates } from "./templates";
import { combineReducers } from "redux";
import { cities } from "./cities";
import { responsible } from "./responsible";

export const dictionaries = combineReducers({
  responsible,
  templates,
  cities,
});
