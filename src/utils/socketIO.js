import socketClient from "socket.io-client";
import { redisIP } from "./tools";

const { REACT_APP_STREAM } = process.env

const port = REACT_APP_STREAM === 'A' ? 4400 : 4600
const ENDPOINT = `http://${redisIP}:${port}/?client=igdir`;
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