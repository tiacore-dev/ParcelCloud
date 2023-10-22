import { Dispatch } from "redux";
import { IDocumentsSettingsState } from "../../store/modules/settings/documents";
import { IauthToken } from "../useAuth";
import {
  getDocumentsFailure,
  getDocumentsRequest,
  getDocumentsSuccess,
  setViewDocument,
} from "../../store/modules/pages/documents";
import { IDocumentsList } from "../../interfaces/documents/IDocumentsList";
import { useApi } from "../useApi";
import {
  getDocumentFailure,
  getDocumentRequest,
  getDocumentSuccess,
} from "../../store/modules/pages/document";
import { IDocument } from "../../interfaces/documents/IDocument";

export interface GetDocumentsDto extends IDocumentsSettingsState {
  authToken: IauthToken;
}

export interface GetDocumentDto {
  documentId: string;
  authToken: IauthToken;
}
export const getDocuments = (dispatch: Dispatch, param: GetDocumentsDto) => {
  dispatch(getDocumentsRequest());
  useApi<IDocumentsList[], GetDocumentsDto>("documents", "get", param)
    .then((documentsData) => {
      dispatch(getDocumentsSuccess(documentsData));
    })
    .catch((err) => {
      dispatch(getDocumentsFailure(err));
    });
};

export const getDocument = (dispatch: Dispatch, param: GetDocumentDto) => {
  dispatch(getDocumentRequest());
  useApi<IDocument, GetDocumentDto>("document", "get", param)
    .then((documentData) => {
      dispatch(getDocumentSuccess(documentData));
    })
    .catch((err) => {
      dispatch(getDocumentFailure(err));
    });
};

export const viewDocument = (dispatch: Dispatch, param: GetDocumentDto) => {
  useApi<{ id: string }, GetDocumentDto>("documentview", "view", param).then(
    (documentsData) => {
      dispatch(setViewDocument(documentsData.id));
    },
  );
};
