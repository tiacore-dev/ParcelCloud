import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { ParcelsLentMenu } from './parcelsLeftMenu';

export const LeftMenu = () => {
  return (<>

    <Switch>
      <Route
        path="/parcels"
        component={ParcelsLentMenu}
        key='parcels'
      />

      <Route
        path="/templates"
        component={ParcelsLentMenu}
        key='templates'
      />

      <Route
        path="/docs"
        component={ParcelsLentMenu}
        key='docs'
      />

    </Switch>
  </>

  );
}