import api from "../../api";
import store from "../../store";
import {
  ADD_DEPLOY,
  IS_DEPLOYING,
  SET_DEPLOYS,
  SET_PROGRESS,
  SET_LOGS,
  REMOVE_LOGS,
  SET_SELECTED_LOG_IDS,
} from "./actionTypes";

export const setDeploys = (payload) => ({
  type: SET_DEPLOYS,
  payload,
});

export const pushDeploy = (payload) => ({
  type: ADD_DEPLOY,
  payload,
});

export const setIsDeploying = (payload) => ({
  type: IS_DEPLOYING,
  payload,
});

export const setProgress = (payload) => ({
  type: SET_PROGRESS,
  payload,
});

export const setLogs = (payload) => ({
  type: SET_LOGS,
  payload,
});

export const setSelectedLogIds = (payload) => ({
  type: SET_SELECTED_LOG_IDS,
  payload,
});

export const removeSelectedLogs = () => ({
  type: REMOVE_LOGS,
});

export const addDeploy =
  ({ selectedGateways, selectedFile, selectedVersion }) =>
  (dispatch) => {
    const alert = store.getState().ui.alert;
    // console.log("AFASDFASDFAS", store.getState());
    if (store.getState().deploy.deploys.length > 0) {
      alert.info("Deployment Added in Queue");
    }
    api
      .post("/deploy", {
        selectedGateways,
        selectedFile,
        selectedVersion: selectedVersion.versionName,
      })
      .then((res) => {
        const { deploy } = res.data;
        dispatch(pushDeploy(deploy));
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const getDeploys = () => (dispatch) => {
  api
    .get("/deploy")
    .then((res) => {
      const { deploys } = res.data;
      dispatch(setDeploys(deploys));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteDeploy =
  ({ id }) =>
  (dispatch) => {
    // console.log("Actions: ",id)
    api
      .delete(`/deploy/${id}`)
      .then((res) => {
        console.log("DELETED SCHEDULED DEPLOY");
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const deploy = (deployObj) => (dispatch) => {
  dispatch(setIsDeploying(true));
  const alert = store.getState().ui.alert;
  alert.info("Starting Deployment");

  // console.log("@@@@@@@@@@@@@@@", deployObj.selectedGateways[0]);

  function getTotalStates() {
    api
      .get(`deploy/states/${deployObj.selectedGateways[0]}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        deployFunc();
      });
  }

  function deployFunc() {
    alert.info("Deployment Started");
    // console.log(selectedGateways, selectedFile, selectedVersion);
    api
      .post("/deploy/execute", {
        deployObj,
      })
      .then((res) => {
        // console.log('Started');
        console.log(res.data);
        if (res.status === 200) {
          alert.success("Deployment Successful");

          dispatch(setIsDeploying(false));
          dispatch(getDeploys());
          dispatch(setProgress([]));
        } else {
          return;
        }
      })
      .catch((err) => {
        // console.log('Error');
        // console.log(err);
        if (
          err.response.data === "Deployment in Progress" ||
          err.response.data === "standard error"
        ) {
          return;
        }
        alert.error("Deployment Unsuccessful");

        dispatch(setIsDeploying(false));
        dispatch(setProgress([]));
      });
  }

  getTotalStates();
};

export const getProgress =
  ({ gatewayIds }) =>
  (dispatch) => {
    // console.log("GETPROGRESS CALLED", gatewayIds);
    const alert = store.getState().ui.alert;
    api
      .post("/deploy/progress", { gatewayIds })
      .then((res) => {
        const progress = res.data;
        // console.log(progress);
        dispatch(setProgress(progress));
      })
      .catch((err) => {
        if (err.response.data.error) {
          alert.error(err.response.data.error);
        }
        // alert.error("Get Progress Failed");
        console.log(err);
      });
  };

export const getLogs = () => (dispatch) => {
  // console.log("GETPROGRESS CALLED", gatewayIds);
  api
    .get("/deploy/logs")
    .then((res) => {
      const logs = res.data;
      // console.log(logs);
      dispatch(setLogs(logs));
    })
    .catch((err) => {
      // if (err.response.data.error) {
      //   alert.error(err.response.data.error);
      // }
      // alert.error("No Logs Found");
      // console.log(err);
    });
};

export const removeLogs =
  ({ gatewayIds }) =>
  (dispatch) => {
    console.log("REMOVE LOGS CALLED", gatewayIds);
    const alert = store.getState().ui.alert;
    api
      .delete(`/deploy/logs?gatewayIds=${gatewayIds.join(",")}`)
      .then((res) => {
        console.log(res.data);
        dispatch(removeSelectedLogs());
        alert.success("Logs deleted successfully");
      })
      .catch((err) => {
        if (err.response.data.error === "standard error") {
          dispatch(removeSelectedLogs());
          alert.success("Logs deleted successfully");
        }
        alert.error("Logs deletion unsuccessfull");
        console.log(err);
      });
  };
