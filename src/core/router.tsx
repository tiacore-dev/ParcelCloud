import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Auth } from '../pages/auth/auth';
// import { Couriers } from '../pages/couriers/couriers';
import { Main } from '../pages/main/main';
import { CreateParcel } from '../pages/parcel/createParcel';
import { Parcels } from "../pages/parcels/parcels"
import { Parcel } from '../pages/parcel/parcel';

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
        path="/reports"
        // component={Reports}
        key='reports'

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



