import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Auth } from '../pages/auth/auth';
import { Main } from '../pages/main/main';
import { CreateParcel } from '../pages/createParcel/createParcel';
import { Parcels } from "../pages/parcels/parcels"
import { Parcel } from '../pages/parcel/parcel';
import { Templates } from '../pages/templates/templates';
import { Template } from '../pages/template/template';
import { Prices } from '../pages/prices/prices';
import { Documents } from '../pages/documents/documents';
import { Document } from '../pages/document/document';

export interface IParcelsRouteParams {
  parcelId: string
}

export interface IDocumentsRouteParams {
  documentId: string
}

export interface ITemplatesRouteParams {
  templateId: string
}

export const AppRouter = () => {
  return (<>

    <Switch>
      <Route
        path="/auth"
        component={Auth}
        key='auth'
      />
      <Route
        path="/parcels/create"
        component={CreateParcel}
        key='parcel'
      />
       <Route
        path="/parcels/:parcelId"
        component={Parcel}
        key='parcel'
      />
      <Route
        path="/parcels"
        component={Parcels}
        key='parcels'
      />
      <Route
        path="/templates/:templateId"
        component={Template}
        key='template'
      />
      <Route
        path="/templates"
        component={Templates}
        key='templates'
      />
      <Route
        path="/documents/:documentId"
        component={Document}
        key='document'
      />
      <Route
        path="/documents"
        component={Documents}
        key='documents'
      />
       <Route
        path="/prices"
        component={Prices}
        key='templates'
      />
      <Route
        path="/"
        component={Main}
        key='main'
      />

    </Switch>
  </>

  );
}



