import socketClient from "socket.io-client";

const backEND = '10.97.2.31'
const port = '4400'
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