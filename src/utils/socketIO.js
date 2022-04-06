import { findGetParameter } from "./URLParameters";
import socketClient from "socket.io-client";

const { REACT_APP_STREAM } = process.env

export const token = findGetParameter("token") || 'main';
const backEND = '10.97.2.31'
const port = REACT_APP_STREAM === 'A' ? 4400 : 4600
const ENDPOINT = `http://${backEND}:${port}/?client=igdir`;
const socket = socketClient(ENDPOINT);

const backENDPARSER = '10.97.2.31'
const PORTPARSER = REACT_APP_STREAM === 'A' ? 4500 : 4700
const ENDPOINTPARSER = `http://${backENDPARSER}:${PORTPARSER}/?client=${token}`
const socketParser = socketClient(ENDPOINTPARSER)

export const subscribeToTopBar = (cb) => {
  let prevTopBarData = ''

  socket.on(`igdir_OverlayTopBar`, (data) => {
    if (prevTopBarData !== JSON.stringify(data)) {
      prevTopBarData = JSON.stringify(data)
      cb(data)
    }
  })
  socket.emit(`subscribe`, `igdir_OverlayTopBar`);
}

export const subscribeToParser = (cb) => {
  socketParser.on(`ParserConnection`, (data) => cb(data))
  socketParser.emit(`subscribe`, `ParserConnection`)
}