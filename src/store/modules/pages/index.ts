import { combineReducers } from "redux";
import { parcels } from "./parcels";
import { parcelsAsigned } from "./parcelsAsigned";
import { parcel } from "./parcel";
import { templates } from "./templates";
import { template } from "./template";
import { prices } from "./prices";
import { document } from "./document";
import { documents } from "./documents";

export const pages = combineReducers({
  parcels,
  parcelsAsigned,
  parcel,
  templates,
  template,
  prices,
  document,
  documents,
});
