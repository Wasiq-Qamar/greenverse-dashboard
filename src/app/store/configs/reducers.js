import {
  GET_CONFIG_LIST,
  SET_META_LOADING,
  SET_SELECTED_FILE,
  SET_SELECTED_FILE_META,
  SET_UPLOAD_FILE_META,
} from "./actionTypes";

const INIT_STATE = {
  metaLoading: false,

  selectedFile: "",
  selectedFileMeta: {},
  uploadFileMeta: {},

  fileList: [],
};

const Configs = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_SELECTED_FILE:
      return {
        ...state,
        selectedFile: action.payload,
      };
    case SET_SELECTED_FILE_META:
      return {
        ...state,
        selectedFileMeta: action.payload,
      };
    case SET_UPLOAD_FILE_META:
      return {
        ...state,
        uploadFileMeta: action.payload,
      };

    case SET_META_LOADING:
      return {
        ...state,
        metaLoading: action.payload,
      };

    case GET_CONFIG_LIST:
      return {
        ...state,
        fileList: action.payload,
      };

    default:
      return state;
  }
};

export default Configs;
