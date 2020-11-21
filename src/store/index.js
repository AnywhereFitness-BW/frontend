import { createStore, applyMiddleware, combineReducers } from "redux";
import { messagesReducer } from "../reducers/messagesReducer";
import { userReducer } from "../reducers/userReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  messages: messagesReducer,
  user: userReducer,
});

// export default createStore(rootReducer, applyMiddleware(thunk));
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  });
export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
