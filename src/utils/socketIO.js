import { findGetParameter } from "./URLParameters";
import socketClient from "socket.io-client";

const { REACT_APP_BACKEND, REACT_APP_PORT } = process.env

export const token = findGetParameter("token") || 'main';
const backEND = REACT_APP_BACKEND
const port = REACT_APP_PORT
const ENDPOINT = `http://${backEND}:${port}/?client=igdir`;
const socket = socketClient(ENDPOINT);

const backENDPARSER = '10.97.2.240'
const PORTPARSER = 4400
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
  let prevParserData = ''
  socketParser.on(`ParserConnection`, (data) => {
    if (prevParserData !== JSON.stringify(data)) {
      prevParserData = JSON.stringify(data)
      cb(data)
    }
  })
  socketParser.emit(`subscribe`, `ParserConnection`)
}