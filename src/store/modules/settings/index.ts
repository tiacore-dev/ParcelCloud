import { combineReducers } from "redux";
import { parcelsSettings } from "./parcels";
import { templatesSettings } from "./templates";
import { documentsSettings } from "./documents";
import { manifestsSettings } from "./manifests";

export const settings = combineReducers({
  parcelsSettings,
  templatesSettings,
  documentsSettings,
  manifestsSettings,
});
