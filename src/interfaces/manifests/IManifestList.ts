import { IManifest } from "./IManifest";

export interface IManifestList extends Omit<IManifest, "manifests"> {}

export interface IManifestsListColumn extends IManifestList {
  key: string;
}
