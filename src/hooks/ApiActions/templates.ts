import { AnyAction, Dispatch } from "redux";
import { ITemplate } from "../../interfaces/templates/ITemplate";
import { IauthToken } from "../useAuth";
import { editTemplate } from "../../store/modules/pages/template";
import { useApi } from "../useApi";
import {
  getTemplatesFailure,
  getTemplatesRequest,
  getTemplatesSuccess,
} from "../../store/modules/dictionaries/templates";

export interface EditeTemplateDto extends ITemplate {
  authToken: IauthToken;
}

export const editTemplateAction = (
  dispatch: Dispatch<AnyAction>,
  params: EditeTemplateDto,
) => {
  dispatch(editTemplate.setTemplateDisabled(true));
  useApi<ITemplate[], EditeTemplateDto>("templateedit", "edit", params)
    .then((templatesData) => {
      dispatch(getTemplatesSuccess(templatesData));
    })
    .catch((err) => {
      dispatch(getTemplatesFailure(err));
    });
};

export const deleteTemplateAction = (
  dispatch: Dispatch<AnyAction>,
  params: EditeTemplateDto,
) => {
  dispatch(editTemplate.setTemplateDisabled(true));

  dispatch(getTemplatesRequest());
  useApi<ITemplate[], EditeTemplateDto>("templatedelete", "delete", params)
    .then((templatesData) => {
      dispatch(getTemplatesSuccess(templatesData));
    })
    .catch((err) => {
      dispatch(getTemplatesFailure(err));
    });
};
