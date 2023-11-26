import { combineReducers } from "redux";
import { parcelsSettings } from "./parcels";
import { templatesSettings } from "./templates";
import { documentsSettings } from "./documents";
import { manifestsSettings } from "./manifests";
import { parcelsAsignedSettings } from "./parcelsAsigned";
import { parcelsInStorageSettings } from "./parcelsInStorage";
import { generalSettings } from "./general";

export const settings = combineReducers({
  parcelsSettings,
  templatesSettings,
  documentsSettings,
  manifestsSettings,
  parcelsAsignedSettings,
  parcelsInStorageSettings,
  generalSettings,
});
