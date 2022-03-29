import socketClient from "socket.io-client";

const backEND = '10.97.2.14'
const port = '4400'
const ENDPOINT = `http://${backEND}:${port}/?client=main`;
const socket = socketClient(ENDPOINT);

export const subscribeToTopBar = (cb) => {
    socket.on(`main_OverlayTopBar`, data => cb(data));
    socket.emit(`subscribe`, `main_OverlayTopBar`);
}

export const subscribeToLeftSide = (cb) => {
    socket.on(`main_OverlayLeftSide`, data => cb(data));
    socket.emit(`subscribe`, `main_OverlayLeftSide`);
}

export const subscribeToRightSide = (cb) => {
    socket.on(`main_OverlayRightSide`, data => cb(data));
    socket.emit(`subscribe`, `main_OverlayRightSide`);
}