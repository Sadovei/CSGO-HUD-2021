import { findGetParameter } from "./tools";
import socketClient from "socket.io-client";

export const token = findGetParameter("token") || 'main';
// const backEND = '10.97.2.31'
const backEND = '10.97.2.14'
const port = '4400'
const ENDPOINT = `http://${backEND}:${port}/?client=igdir`;
const socket = socketClient(ENDPOINT);

export const subscribeToTopBar = (cb) => {
    socket.on(`${token}_OverlayTopBar`, (data) => cb(data))
    socket.emit(`subscribe`, `${token}_OverlayTopBar`)
}
export const unsubscribeToTopBar = () => {
    socket.on(`${token}_OverlayTopBar`)
    socket.emit(`unsubscribe`, `${token}_OverlayTopBar`)
}

export const subscribeToPov = (cb) => {
    socket.on(`${token}_OverlayPovSide`, (data) => cb(data))
    socket.emit(`subscribe`, `${token}_OverlayPovSide`)
}
export const unsubscribeToPov = () => {
    socket.on(`${token}_OverlayPovSide`)
    socket.emit(`unsubscribe`, `${token}_OverlayPovSide`)
}

export const subscribeToLeftSide = (cb) => {
    socket.on(`${token}_OverlayLeftSide`, (data) => cb(data))
    socket.emit(`subscribe`, `${token}_OverlayLeftSide`)
}
export const unsubscribeToLeftSide = () => {
    socket.on(`${token}_OverlayLeftSide`)
    socket.emit(`unsubscribe`, `${token}_OverlayLeftSide`)
}

export const subscribeToRightSide = (cb) => {
    socket.on(`${token}_OverlayRightSide`, (data) => cb(data))
    socket.emit(`subscribe`, `${token}_OverlayRightSide`)
}
export const unsubscribeToRightSide = () => {
    socket.on(`${token}_OverlayRightSide`)
    socket.emit(`unsubscribe`, `${token}_OverlayRightSide`)
}