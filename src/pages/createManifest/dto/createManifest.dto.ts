import { IauthToken } from "../../../hooks/useAuth";
import { IEditableManifestState } from "../../../store/modules/editableEntities/editableManifest";

export interface CreateManifestDto
  extends Omit<IEditableManifestState, "sent" | "parcels"> {
  parcels: string[];
  authToken: IauthToken;
}
