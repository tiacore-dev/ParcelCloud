import { combineReducers } from "redux";
import { editableParcel } from "./editableParcel";
import { editableManifest } from "./editableManifest";

export const editableEntities = combineReducers({
  editableParcel,
  editableManifest,
});
