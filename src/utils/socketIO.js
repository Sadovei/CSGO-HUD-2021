import { findGetParameter } from "./URLParameters";
import socketClient from "socket.io-client";

const { REACT_APP_BACKEND, REACT_APP_PORT } = process.env

export const token = findGetParameter("token") || 'main';
const backEND = REACT_APP_BACKEND
const port = REACT_APP_PORT
const ENDPOINT = `http://${backEND}:${port}/?client=igdir`;
const socket = socketClient(ENDPOINT);

export const subscribeToTopBar = (cb) => {
    socket.on(`igdir_OverlayTopBar`, data => cb(data));
    socket.emit(`subscribe`, `igdir_OverlayTopBar`);
}

export const subscribeToSponsorNr1 = (cb) => {
    if (token === 'igdir') {
        socket.on(`igdir_sponsorNr1`, data => cb(data));
        socket.emit(`subscribe`, `igdir_sponsorNr1`);
    }
}
