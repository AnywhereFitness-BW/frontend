import { ADDED_MESSAGE, DELETED_MESSAGE, DELETED_ALL_MESSAGES, FADED_MESSAGE } from "../actions/messages";

const initialState = {
  visible: true,
  messages: [],
};
// Message format: {id: Date.now(), text: "This is an error", visible: true, type: "danger"}
// The type of the message will dictate the color (Boostrap Alerts)

export const messagesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADDED_MESSAGE:
      return { ...state, messages: [...state.messages, payload] };
    case DELETED_MESSAGE:
      return { ...state, messages: state.messages.filter((msg) => msg.id !== payload) };
    case FADED_MESSAGE:
      return {
        ...state,
        messages: state.messages.map((msg) => {
          if (msg.id === payload) msg.visible = false;
          return msg;
        }),
      };
    case DELETED_ALL_MESSAGES:
      return { ...state, messages: [] };
    default:
      return state;
  }
};
