import { setSessionCookie } from "../../../utility/session";
import api from "../../api";
import store from "../../store";
import {
  GET_ACTIVE_GATEWAYS,
  GET_INACTIVE_GATEWAYS,
  GET_UNACCEPTED_KEYS,
  SET_LOADING,
  SET_LOADING_INACTIVE,
  SET_SELECTED_GATEWAYS,
  SET_SELECTED_KEYS,
} from "./actionTypes";

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const setLoadingInactive = (payload) => ({
  type: SET_LOADING_INACTIVE,
  payload,
});

export const setActiveGateways = (payload) => ({
  type: GET_ACTIVE_GATEWAYS,
  payload,
});

export const setInactiveGateways = (payload) => ({
  type: GET_INACTIVE_GATEWAYS,
  payload,
});

export const setUnacceptedKeys = (payload) => ({
  type: GET_UNACCEPTED_KEYS,
  payload,
});

export const setSelectedGateways = (payload) => ({
  type: SET_SELECTED_GATEWAYS,
  payload,
});

export const setSelectedKeys = (payload) => ({
  type: SET_SELECTED_KEYS,
  payload,
});

export const getActiveGateways = () => (dispatch) => {
  const alert = store.getState().ui.alert;
  console.log(alert);
  alert.info("Fetching Active Gateways");
  let count = 0;

  function gatewayRequest() {
    api
      .get("/gateway/active")
      .then((res) => {
        const gateways = res.data;
        // console.log("COUNT ", count);
        // console.log("ACTIVE RESPONSE : ", gateways);
        if (count == 2) {
          setSessionCookie("gatewaysActive", "[]");
          dispatch(setActiveGateways([]));
          dispatch(setLoading(false));

          alert.error("Error loading active gateways");
          return;
        }
        if (typeof gateways == "string" || typeof gateways == "boolean") {
          // console.log(typeof gateways);
          count = count + 1;
          gatewayRequest();
        } else {
          // console.log("ACTIVE: ", gateways);
          setSessionCookie("gatewaysActive", JSON.stringify(gateways));
          // console.log("INACTIVE: ", gateways);
          dispatch(setActiveGateways(gateways));
          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        setSessionCookie("gatewaysActive", "[]");
        dispatch(setActiveGateways([]));
        dispatch(setLoading(false));

        if (err.response.data.error) {
          alert.error(err.response.data.error);
        } else {
          alert.error("Error loading active gateways");
        }
      });
  }
  gatewayRequest();
};

export const getInactiveGateways = () => (dispatch) => {
  const alert = store.getState().ui.alert;
  alert.info("Fetching Inactive Gateways");
  let count = 0;

  function gatewayRequest() {
    api
      .get("/gateway/inactive")
      .then((res) => {
        const gateways = res.data;
        // console.log("INACTIVE RESPONSE : ", gateways);
        if (count == 2) {
          setSessionCookie("gatewaysInactive", "[]");
          dispatch(setInactiveGateways([]));
          dispatch(setLoadingInactive(false));

          alert.error("Error loading active gateways");
          return;
        }
        if (typeof gateways == "string" || typeof gateways == "boolean") {
          // console.log(typeof gateways);
          count = count + 1;
          gatewayRequest();
        } else {
          // console.log("ACTIVE: ", gateways);
          setSessionCookie("gatewaysInactive", JSON.stringify(gateways));
          // console.log("INACTIVE: ", gateways);
          dispatch(setInactiveGateways(gateways));
          dispatch(setLoadingInactive(false));
        }
      })
      .catch((err) => {
        setSessionCookie("gatewaysInactive", "[]");
        dispatch(setInactiveGateways([]));
        dispatch(setLoadingInactive(false));

        if (err.response.data.error) {
          alert.error(err.response.data.error);
        } else {
          alert.error("Error loading inactive gateways");
        }
      });
  }
  gatewayRequest();
};

export const getUnacceptedGateways = () => (dispatch) => {
  const alert = store.getState().ui.alert;
  dispatch(setLoading(true));
  alert.success("Fetching Unaccepted Keys");

  function gatewayRequest() {
    api
      .get("/gateway/unaccepted")
      .then((res) => {
        const unacceptedKeys = res.data;
        // console.log('RESPONSE : ', gateways);
        if (
          typeof unacceptedKeys === "string" ||
          typeof unacceptedKeys === "boolean"
        ) {
          gatewayRequest();
        } else {
          setSessionCookie("unacceptedKeys", JSON.stringify(unacceptedKeys));
          dispatch(setUnacceptedKeys(unacceptedKeys));
          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        alert.error("Error loading keys");
        // console.log(err);
      });
  }
  gatewayRequest();
};

export const acceptKeys = (keys) => (dispatch) => {
  const alert = store.getState().ui.alert;
  // alert.info("Accepting Process Started");
  // console.log("KEYS: ", keys);
  api
    .post("/gateway/accept", {
      keys,
    })
    .then((res) => {
      console.log(res.data);
      alert.success("Keys Accepted");
      dispatch(getUnacceptedGateways());
    })
    .catch((err) => {
      console.log("Error: ", err);
      alert.error("Error Accepting Keys");
    });
};
