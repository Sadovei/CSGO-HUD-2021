import socketClient from "socket.io-client";
const { REACT_APP_BACKEND, REACT_APP_PORT } = process.env

const backEND = REACT_APP_BACKEND
const port = REACT_APP_PORT
const ENDPOINT = `http://${backEND}:${port}/?client=igdir`;
const socket = socketClient(ENDPOINT);

export const subscribeToTopBar = (cb) => {
    socket.on(`igdir_OverlayTopBar`, data => cb(data));
    socket.emit(`subscribe`, `igdir_OverlayTopBar`);
}

export const subscribeToLeftSide = (cb) => {
    socket.on(`igdir_OverlayLeftSide`, data => cb(data));
    socket.emit(`subscribe`, `igdir_OverlayLeftSide`);
}

export const subscribeToRightSide = (cb) => {
    socket.on(`igdir_OverlayRightSide`, data => cb(data));
    socket.emit(`subscribe`, `igdir_OverlayRightSide`);
}