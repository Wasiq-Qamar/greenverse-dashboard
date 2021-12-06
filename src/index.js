import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./app/app";
import { StyledEngineProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/css/index.css";
import "./assets/css/table.css";
import "./assets/css/margin.css";
import "./assets/css/padding.css";
import "./assets/css/grid.css";
import "./assets/css/flex.css";
import "./assets/css/colors.css";
import "./assets/css/form.css";
import "./assets/css/offset.css";

ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Provider>,
  document.getElementById("root")
);
