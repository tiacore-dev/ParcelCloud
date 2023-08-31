import { combineReducers } from "redux";
import { parcelsSettings } from "./parcels";
import { templatesSettings } from "./templates";
import { documentsSettings } from "./documents";

export const settings = combineReducers({
  parcelsSettings,
  templatesSettings,
  documentsSettings,
});
