import socketClient from "socket.io-client";

const ENDPOINT = "http://10.97.2.14:4400/?client=Main";
var socket = socketClient(ENDPOINT);

export const subscribeToTopBar = (cb) => {
    socket.on('Main_OverlayTopBar', data => cb(data));
    socket.emit('subscribe', 'Main_OverlayTopBar');
}

export const subscribeToPov = (cb) => {
    socket.on('Main_OverlayPovSide', data => cb(data));
    socket.emit('subscribe', 'Main_OverlayPovSide');
}

export const subscribeToLeftSide = (cb) => {
    socket.on('Main_OverlayLeftSide', data => cb(data));
    socket.emit('subscribe', 'Main_OverlayLeftSide');
}

export const subscribeToRightSide = (cb) => {
    socket.on('Main_OverlayRightSide', data => cb(data));
    socket.emit('subscribe', 'Main_OverlayRightSide');
}

