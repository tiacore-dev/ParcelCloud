import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Auth } from '../pages/auth/auth';
import { Couriers } from '../pages/couriers/couriers';
import { Main } from '../pages/main/main';
import { CreateParcel } from '../pages/parcels/createParcel';
import { findParcelByNumber } from '../pages/parcels/findParcelByNumber';
import { Parcels } from "../pages/parcels/parcels"

export const AppRouter = () => {
  return (<>

    <Switch>
      <Route
        path="/auth"
        component={Auth}
      />
       <Route
        path="/parcels/create"
        component={CreateParcel}
      />
      <Route
        path="/parcels/instorage/:storageId"
        component={Parcels}
      />
       <Route
        path="/parcels/find"
        component={findParcelByNumber}
      />
      <Route
        path="/parcels/"
        component={Parcels}
      />
      <Route
        path="/reports"
        // component={Reports}
      />
      <Route
        path="/"
        component={Main}
      />

    </Switch>
  </>

  );
}



