import { findGetParameter, redisIP } from "./URLParameters";
import socketClient from "socket.io-client";

const { REACT_APP_STREAM } = process.env

export const token = findGetParameter("client") || 'main';
const port = REACT_APP_STREAM === 'A' ? 4400 : 4600
const ENDPOINT = `http://${redisIP}:${port}/?client=${token}`;
const socket = socketClient(ENDPOINT);

const PORTPARSER = REACT_APP_STREAM === 'A' ? 4500 : 4700
const ENDPOINTPARSER = `http://${redisIP}:${PORTPARSER}/?client=${token}`
const socketParser = socketClient(ENDPOINTPARSER)

export const subscribeToTopBar = (cb) => {
  let prevTopBarData = ''

  socket.on(`${token}_OverlayTopBar`, (data) => {
    if (prevTopBarData !== JSON.stringify(data)) {
      prevTopBarData = JSON.stringify(data)
      cb(data)
    }
  })
  socket.emit(`subscribe`, `${token}_OverlayTopBar`);
}

export const subscribeToParser = (cb) => {
  socketParser.on(`ParserConnection`, (data) => cb(data))
  socketParser.emit(`subscribe`, `ParserConnection`)
}