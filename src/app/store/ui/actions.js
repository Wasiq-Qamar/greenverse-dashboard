import { ALERT } from "./actionTypes";

/**
 * set alert global val
 * @param {object} payload
 * @returns
 */
export const setAlert = (payload) => ({
  type: ALERT,
  payload,
});
