import Promise from "bluebird";
import socket from "../services/socket-api";
import {
  DISCONNECT_PLAYER,
  NEW_PLAYER,
  UPDATE_PLAYER,
  UPDATE_OTHER_PLAYERS
} from "../../constants/constants";
import { updateRoom } from "./room";

export const connectPlayer = playerName => {
  return dispatch => {
    socket.emit(NEW_PLAYER, playerName, response => {
      if (response.status === "success") {
        dispatch(updatePlayer(response.playerInfo));
      }
    });
  };
};

export const disconnectPlayer = () => {
  return dispatch => {
    socket.emit(DISCONNECT_PLAYER);
    dispatch(updateRoom({}));
    window.location.hash = "";
    dispatch(updatePlayer({}));
  };
};

export const updatePlayer = player => ({
  type: UPDATE_PLAYER,
  player
});

export const updateOtherPlayers = otherPlayers => ({
  type: UPDATE_OTHER_PLAYERS,
  otherPlayers
});
