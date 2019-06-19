import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import "./index.css";
import App from "./components/App";

const initialState = {
  playerName: "",
  currentRoom: "",
  error: {
    joinRoomError: false
  },
  toast: {
    show: false,
    message: ""
  },
  rooms: []
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunkMiddleware)
);

store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
