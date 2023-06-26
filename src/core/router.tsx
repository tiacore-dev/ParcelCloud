import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Auth } from '../pages/auth/auth';
import { Main } from '../pages/main/main';
import { CreateParcel } from '../pages/createParcel/createParcel';
import { Parcels } from "../pages/parcels/parcels"
import { Parcel } from '../pages/parcel/parcel';
import { Templates } from '../pages/templates/templates';

export interface IParcelsRouteParams {
  parcelId: string
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
        path="/templates"
        component={Templates}
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



