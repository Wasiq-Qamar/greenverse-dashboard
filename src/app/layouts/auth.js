import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../routes';

const Auth = () => (
  <Switch>
    {routes.map((i) => {
      if (i.layout === '/auth') {
        return <Route exact path={i.layout + i.path} component={i.component} key={i.id} />;
      }
      return null;
    })}
    <Redirect from="/auth/*" to="/auth/login" />
  </Switch>
);

export default Auth;
