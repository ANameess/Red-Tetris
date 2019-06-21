import { combineReducers } from "redux";
import {
  CONNECT_PLAYER,
  NEW_ROOM_LIST,
  JOIN_ROOM
} from "../../constants/constants";

const playerName = (state = "", action) => {
  console.log("[STATE UPDATE] with action : ", action.type);
  switch (action.type) {
    case CONNECT_PLAYER:
      return action.playerName;
    default:
      return state;
  }
};

const rooms = (state = [], action) => {
  switch (action.type) {
    case NEW_ROOM_LIST:
      return action.roomList;
    default:
      return state;
  }
};

const currentRoom = (state = "", action) => {
  switch (action.type) {
    case JOIN_ROOM:
      return action.roomName;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  playerName,
  rooms,
  currentRoom
});

export default rootReducer;
