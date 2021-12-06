import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import routes from "../routes";

const App = (props) => {
  return (
    <>
      <Sidebar />
      <Header />
      <Switch>
        {routes.map((i) => {
          if (i.layout === "/app") {
            return (
              <Route
                exact
                path={i.layout + i.path}
                component={i.component}
                key={i.id}
              />
            );
          }
          return null;
        })}
        <Redirect from="/app/*" to="/app/" />
      </Switch>
    </>
  );
};

export default App;
