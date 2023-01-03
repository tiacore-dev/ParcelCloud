import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Couriers } from '../pages/couriers/couriers';
import { Main } from '../pages/main/main';
import { Parcels } from "../pages/parcels/parcels"

export const AppRouter = () => {
  return (<>

    <Switch>
      <Route
        path="/parcels/:parcelId"
        component={Parcels}
      />
      <Route
        path="/couriers"
        component={Couriers}
      />
      <Route
        path="/"
        component={Main}
      />

    </Switch>
  </>

  );
}