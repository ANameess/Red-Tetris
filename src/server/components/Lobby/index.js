class Lobby {
  constructor() {
    this._rooms = [];
    this._players = [];
  }

  get rooms() {
    return this._rooms;
  }

  addRoom(roomName) {
    this._rooms.push(roomName);
  }

  removeRoom(roomName) {
    this._rooms = this._rooms.filter(room => room.name !== roomName);
  }

  addPlayer(player) {
    this._players.push(player);
  }

  removePlayer(playerId) {
    this._players = this._players.filter(player => player.id !== playerId);
  }

  findRoom(roomName) {
    return this._rooms.find(room => room.name === roomName);
  }

  findPlayer(playerId) {
    let found = this._players.find(player => player.id === playerId);
    if (found) return found;
    for (let i = 0; i < this._rooms.length; i++) {
      let player = this.rooms[i].findPlayer(playerId);
      if (player) return player;
    }
  }

  getRoomsName() {
    return this._rooms.map(room => room.name);
  }
}

const instance = new Lobby();
// Object.freeze(instance);

export default instance;
