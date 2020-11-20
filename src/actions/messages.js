import { v4 as uuid } from "uuid";
export const ADDED_MESSAGE = "ADDED_MESSAGE";
export const DELETED_MESSAGE = "DELETED_MESSAGE";
export const DELETED_ALL_MESSAGES = "DELETED_MESSAGES";
export const FADED_MESSAGE = "FADED_MESSAGE";

export const addMessage = (message, type) => (dispatch) => {
  const msg = { id: uuid(), text: message, type, visible: true };
  return dispatch({ type: ADDED_MESSAGE, payload: msg });
};

export const deleteMessage = (id) => (dispatch) => {
  dispatch({ type: FADED_MESSAGE, payload: id });
  return setTimeout(() => dispatch({ type: DELETED_MESSAGE, payload: id }), 1000);
};

export const deleteAllMessages = () => {
  return { type: DELETED_ALL_MESSAGES };
};
