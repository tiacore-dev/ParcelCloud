import { combineReducers } from "redux";
import { parcels } from "./parcels";
import { parcelsAsigned } from "./parcelsAsigned";
import { parcel } from "./parcel";
import { template } from "./template";
import { prices } from "./prices";
import { document } from "./document";
import { documents } from "./documents";
import { manifest } from "./manifest";
import { manifests } from "./manifests";
import { history } from "./history";
import { parcelsInStorage } from "./parcelsInStorage";

export const pages = combineReducers({
  parcels,
  parcelsAsigned,
  parcel,
  template,
  prices,
  document,
  documents,
  manifest,
  manifests,
  history,
  parcelsInStorage,
});
