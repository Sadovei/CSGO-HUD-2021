import socketClient from "socket.io-client";
import { findGetParameter } from "./URLParameters";
const { REACT_APP_BACKEND, REACT_APP_PORT } = process.env

export const token = findGetParameter("token") || 'main';
const backEND = REACT_APP_BACKEND
const port = REACT_APP_PORT
const ENDPOINT = `http://${backEND}:${port}/?client=${token}`;
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
    if (token === 'igdir') {
        socket.on(`igdir_Overlay_Head2Head`, data => cb(data));
        socket.emit(`subscribe`, `igdir_Overlay_Head2Head`);
    }
}

export const subscribeToSponsorNr1 = (cb) => {
    if (token === 'igdir') {
        socket.on(`igdir_sponsorNr1`, data => cb(data));
        socket.emit(`subscribe`, `igdir_sponsorNr1`);
    }
}

export const subscribeToScoreBoard = (cb) => {
    if (token === 'igdir') {
        socket.on(`igdir_Overlay_Scoreboard`, data => cb(data));
        socket.emit(`subscribe`, `igdir_Overlay_Scoreboard`);
    }
}

export const subscribeToCheckStream = (cb) => {
    if (token === 'igdir') {
        if (port === '4600') {
            socket.on(`igdir_checkStream_A`, data => cb(data));
            socket.emit(`subscribe`, `igdir_checkStream_A`);
        } else {
            socket.on(`igdir_checkStream_B`, data => cb(data));
            socket.emit(`subscribe`, `igdir_checkStream_B`);
        }
    }
}

export const subscribeToRadar = (cb) => {
    socket.on(`${token}_OverlayRadar`, (data) => cb(data));
    socket.emit(`subscribe`, `${token}_OverlayRadar`);
};

export const subscribeToMessage = (cb) => {
    socket.on(`${token}_Refresh_Graphics`, (data) => cb(data));
    socket.emit(`subscribe`, `${token}_Refresh_Graphics`);
};


