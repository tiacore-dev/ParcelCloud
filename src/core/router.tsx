import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Auth } from '../pages/auth/auth';
import { Couriers } from '../pages/couriers/couriers';
import { Main } from '../pages/main/main';
import { CreateParcel } from '../pages/parcels/createParcel';
import { Parcels } from "../pages/parcels/Parcels/parcels"

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
        key='parcelscreate'
      />
      <Route
        path="/parcels/all"
        component={Parcels}
        key='parcelsall'

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



