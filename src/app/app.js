/* eslint-disable react/jsx-props-no-spreading */
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const AuthLayout = lazy(() => import("./layouts/auth"));
const AppLayout = lazy(() => import("./layouts/app"));

const options = {
  timeout: 4000,
  position: positions.BOTTOM_RIGHT,
};

function App() {
  return (
    <Provider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <Suspense fallback={<h5>Loading...</h5>}>
          <Switch>
            <Route
              path="/auth/login"
              render={(props) => <AuthLayout {...props} />}
            />
            <Route path="/app" render={(props) => <AppLayout {...props} />} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
