import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { ParcelsLentMenu } from './parcelsLeftMenu';

export const LeftMenu = () => {
  return (<>

    <Switch>
      <Route
        path="/parcels"
        component={ParcelsLentMenu}
      />

    </Switch>
  </>

  );
}