import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_REGISTERED,
  API_CALL_START,
  API_CALL_END,
} from "../actions/user";
const initialState = {
  loading: false,
  user: null,
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case API_CALL_START:
      return { ...state, loading: true };
    case API_CALL_END:
      return { ...state, loading: false };
    case USER_LOGGED_IN:
      return { ...state, user: payload.user };
    case USER_REGISTERED:
      return { ...state, user: payload.user };
    case USER_LOGGED_OUT:
      return { ...state, user: null };
    default:
      return state;
  }
};
