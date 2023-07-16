import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { ParcelsLeftMenu } from './parcelsLeftMenu';

export const LeftMenu = () => {
  return (<>

    <Switch>
      <Route
        path="/parcels"
        component={ParcelsLeftMenu}
        key='parcels'
      />

      <Route
        path="/templates"
        component={ParcelsLeftMenu}
        key='templates'
      />

      <Route
        path="/docs"
        component={ParcelsLeftMenu}
        key='docs'
      />

    </Switch>
  </>

  );
}