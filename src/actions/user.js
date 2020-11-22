import axios from "axios";
import LocalStorage from "../utilities/localStorage";

import { addMessage } from "../actions/messages";
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const USER_REGISTERED = "USER_REGISTERED";
export const API_CALL_START = "API_CALL_START";
export const API_CALL_END = "API_CALL_END";

const userStorage = LocalStorage("af-user");

export const userLogin = (username, password) => async (dispatch) => {
  dispatch({ type: API_CALL_START });
  try {
    const loginResult = await axios.post("/auth/login", { username, password });
    if (!loginResult.data.errors) {
      await dispatch(checkMe());
    } else {
      dispatch(
        addMessage(
          "Failed to log in, please check your login information and try again.",
          "danger"
        )
      );
    }
  } catch (error) {
    dispatch(
      addMessage(
        "Failed to log in, please check your login information and try again.",
        "danger"
      )
    );
  } finally {
    dispatch({ type: API_CALL_END });
  }
};

export const userRegister = (registerData) => async (dispatch) => {
  let success = false;
  dispatch({ type: API_CALL_START });
  try {
    const registerResponse = await axios.post("/auth/register", registerData);
    if (!registerResponse.data.errors) {
      dispatch({
        type: USER_LOGGED_IN,
        payload: { user: registerResponse.data.data },
      });
      await dispatch(checkMe());
      success = true;
    } else {
      dispatch(addMessage(registerResponse.data.message, "danger"));
    }
  } catch (error) {
    dispatch(addMessage(error.response.message, "danger"));
  } finally {
    dispatch({ type: API_CALL_END });
  }
  return success;
};

export const userLogout = () => async (dispatch) => {
  await axios.get("/auth/logout");
  userStorage.remove();
  return dispatch({ type: USER_LOGGED_OUT });
};

export const loadUser = () => async (dispatch) => {
  let user = userStorage.get();
  if (!user) user = await checkMe()();
  if (user) dispatch({ type: USER_LOGGED_IN, payload: { user } });
};

export const checkMe = () => async (dispatch) => {
  try {
    const response = await axios.get("/auth/me");
    if (!response.data.errors)
      dispatch({
        type: USER_LOGGED_IN,
        payload: {
          user: response.data.data,
        },
      });
    userStorage.set(response.data.data);
    return response.data.data;
  } catch (err) {
    userStorage.remove();
    return null;
  }
};
