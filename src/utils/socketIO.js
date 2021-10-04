import socketClient from "socket.io-client";
import { findGetParameter } from "./URLParameters";

let token = findGetParameter("token") || 'main';
// const backEND = '10.97.2.31'
const backEND = '10.97.4.45'
// const backEND = 'localhost'
const ENDPOINT = `http://${backEND}:4400/?client=${token}`;
const socket = socketClient(ENDPOINT);

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

export const subscribeToHead2Head = (cb) => {
    socket.on(`Overlay_Head2Head`, data => cb(data));
    socket.emit(`subscribe`, `Overlay_Head2Head`);
}

export const subscribeToScoreBoard = (cb) => {
    socket.on(`Overlay_Scoreboard`, data => cb(data));
    socket.emit(`subscribe`, `Overlay_Scoreboard`);
}

export const subscribeToRadar = (cb) => {
    socket.on(`${token}_OverlayRadar`, (data) => cb(data));
    socket.emit(`subscribe`, `${token}_OverlayRadar`);
};
