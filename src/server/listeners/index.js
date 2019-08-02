import Game from "../game/class";
import { initClientState } from "../game/controller";
import { connectPlayer, disconnectPlayer } from "../player/controller";
import { joinRoom, leaveRoom, startGame } from "../room/controller";
import { onKeyPressed } from "../piece/controller";
import {
  LEAVE_ROOM,
  CONNECTION,
  DISCONNECT_PLAYER,
  NEW_PLAYER,
  JOIN_ROOM,
  START_GAME,
  DISCONNECT,
  LOG_LINE,
  KEY_PRESSED,
  LOBBY_ROOM,
  NEW_CHAT_MESSAGE,
  ADD_CHAT_MESSAGE
} from "../../constants/constants";

export const initListeners = io => {
  io.on(CONNECTION, socket => {
    initClientState(socket);
    // console.log("[JOIN] socket room : ", io.sockets.adapter.rooms);
    socket.on(NEW_PLAYER, (data, callback) => {
      console.log("[EVENT] ", NEW_PLAYER);
      connectPlayer(data, callback, socket, io);
    });
    socket.on(JOIN_ROOM, (data, callback) => {
      console.log("[EVENT] ", JOIN_ROOM);
      joinRoom(data, callback, socket, io);
      // console.log("[JOIN] socket room : ", io.sockets.adapter.rooms);
    });
    socket.on(DISCONNECT_PLAYER, () => {
      console.log("[EVENT] ", DISCONNECT_PLAYER);
      disconnectPlayer(socket, io);
    });
    socket.on(LEAVE_ROOM, () => {
      console.log("[EVENT] ", LEAVE_ROOM);
      leaveRoom(socket, io);
      // console.log("[JOIN] socket room : ", io.sockets.adapter.rooms);
    });
    socket.on(START_GAME, () => startGame(socket, io));
    socket.on(KEY_PRESSED, data => {
      console.log("[EVENT] ", KEY_PRESSED);
      onKeyPressed(data.code, socket, io);
    });
    socket.on(NEW_CHAT_MESSAGE, message => {
      emitChatMessage(message, socket, io);
    });
    socket.on(DISCONNECT, reason => {
      console.log(LOG_LINE, "[EVENT] DISCONNECT :", reason);
      disconnectPlayer(socket, io);
    });
  });
};

const emitChatMessage = (message, socket, io) => {
  const player = Game.findPlayer(socket.id);
  if (!player) return;
  io.in(player.room || LOBBY_ROOM).emit(ADD_CHAT_MESSAGE, {
    message: {
      type: "message",
      author: player.name,
      text: message
    }
  });
};
