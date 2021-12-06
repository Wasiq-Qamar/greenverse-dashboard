import api from "../../api";
import store from "../../store";
import {
  GET_CONFIG_LIST,
  SET_META_LOADING,
  SET_SELECTED_FILE,
  SET_SELECTED_FILE_META,
  SET_UPLOAD_FILE_META,
} from "./actionTypes";

export const setMetaLoading = (payload) => ({
  type: SET_META_LOADING,
  payload,
});

export const setSelectedFile = (payload) => ({
  type: SET_SELECTED_FILE,
  payload,
});

export const setSelectedFileMeta = (payload) => ({
  type: SET_SELECTED_FILE_META,
  payload,
});

export const setUploadFileMeta = (payload) => ({
  type: SET_UPLOAD_FILE_META,
  payload,
});

export const setConfig = (payload) => ({
  type: GET_CONFIG_LIST,
  payload,
});

export const getConfigFiles = () => (dispatch) => {
  api
    .get("/config/configFiles")
    .then((res) => {
      const { fileList } = res.data;
      // console.log("RESPONSE : ",fileList)
      dispatch(setConfig(fileList));
    })
    .catch((err) => {
      // console.log(err);
    });
};

export const getConfigFileMetadata =
  ({ filename }) =>
  (dispatch) => {
    dispatch(setSelectedFile(filename));
    api
      .post("/config/meta", { filename })
      .then((res) => {
        const data = res.data;
        // console.log("RESPONSE : ", data);
        dispatch(setSelectedFileMeta(data));
        // dispatch(setConfig(fileList));
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  };

export const uploadConfigFile =
  ({ data }) =>
  (dispatch) => {
    const alert = store.getState().ui.alert;
    // console.log(data)
    // console.log(name)
    // fetch(`http://167.71.163.95:3005/configFile`, {
    //   method: 'POST',
    //   body: data,
    //   headers: {
    //     Authorization: `Bearer ${getSessionCookie('token')}`
    //   }
    // })
    api
      .post("/config/configFile", data)
      .then((res) => {
        dispatch(setUploadFileMeta(res.data));
        // console.log(res.data);

        dispatch(setMetaLoading(false));
      })
      .catch((err) => {
        if (err.response.data.error) {
          alert.error(err.response.data.error);
        } else {
          alert.error("Upload Unsuccessful");
          // console.log(err.response.data.error)
        }
      });
  };

export const removeConfigFile =
  ({ filename }) =>
  () => {
    // console.log(filename);
    const alert = store.getState().ui.alert;
    api
      .post("/config/remove", { filename })
      .then((res) => {
        alert.success("File Upload Cancelled");
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
