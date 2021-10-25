import socketClient from "socket.io-client";
import { findGetParameter } from "./URLParameters";
const { REACT_APP_BACKEND, REACT_APP_PORT } = process.env

let token = findGetParameter("token") || 'main';
const backEND = REACT_APP_BACKEND
const port = REACT_APP_PORT
const ENDPOINT = `http://${backEND}:${port}/?client=igdir`;
const socket = socketClient(ENDPOINT);
console.log(port, backEND)

export const subscribeToTopBar = (cb) => {
    socket.on(`${token}_OverlayTopBar`, data => cb(data));
    socket.emit(`subscribe`, `${token}_OverlayTopBar`);
}

export const subscribeToPov = (cb) => {
    socket.on(`${token}_OverlayPovSide`, data => cb(data));
    socket.emit(`subscribe`, `${token}_OverlayPovSide`);
}

export const subscribeToLeftSide = (cb) => {
    socket.on(`${token}_OverlayLeftSide`, data => cb(data));
    socket.emit(`subscribe`, `${token}_OverlayLeftSide`);
}

export const subscribeToRightSide = (cb) => {
    socket.on(`${token}_OverlayRightSide`, data => cb(data));
    socket.emit(`subscribe`, `${token}_OverlayRightSide`);
}
