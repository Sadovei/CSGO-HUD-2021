import socketClient from "socket.io-client";

const { REACT_APP_STREAM } = process.env

const backEND = '10.97.2.31'
const port = REACT_APP_STREAM === 'A' ? 4400 : 4600
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