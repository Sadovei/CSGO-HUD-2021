import socketClient from "socket.io-client";

const ENDPOINT = "http://10.97.2.14:4400/?client=Main";
var socket = socketClient(ENDPOINT);

export const subscribeToMapStatus = (cb) => {
    socket.on('Main_OverlayTopBar', data => cb(data));
    socket.emit('subscribe', 'Main_OverlayTopBar');
}
