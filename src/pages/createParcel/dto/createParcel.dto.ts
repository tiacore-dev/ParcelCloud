import { IauthToken } from "../../../hooks/useAuth";
import { IParcel } from "../../../interfaces/parcels/IParcel";

export interface CreateParcelDto extends Omit<IParcel, "history"> {
  authToken: IauthToken;
}
