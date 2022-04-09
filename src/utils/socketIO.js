import { findGetParameter } from './tools'
import socketClient from 'socket.io-client'

const { REACT_APP_STREAM } = process.env

export const token = findGetParameter('client') || 'main'
const backEND = '10.97.2.31'
// const backEND = '10.97.2.14'
const port = REACT_APP_STREAM === 'A' ? 4400 : 4600
const ENDPOINT = `http://${backEND}:${port}/?client=${token}`
const socket = socketClient(ENDPOINT)

const backENDPARSER = '10.97.2.31'
// const backENDPARSER = '10.97.2.16'
const PORTPARSER = REACT_APP_STREAM === 'A' ? 4500 : 4700
const ENDPOINTPARSER = `http://${backENDPARSER}:${PORTPARSER}/?client=${token}`
const socketParser = socketClient(ENDPOINTPARSER)

export const subscribeToTopBar = (cb) => {
  let prevTopBarData = ''

  socket.on(`${token}_OverlayTopBar`, (data) => {
    if (prevTopBarData !== JSON.stringify(data)) {
      prevTopBarData = JSON.stringify(data)
      cb(data)
    }
  })
  socket.emit(`subscribe`, `${token}_OverlayTopBar`)
}
export const unsubscribeToTopBar = () => {
  socket.on(`${token}_OverlayTopBar`)
  socket.emit(`unsubscribe`, `${token}_OverlayTopBar`)
}

export const subscribeToPov = (cb) => {
  let prevPovData = ''
  socket.on(`${token}_OverlayPovSide`, (data) => {
    if (prevPovData !== JSON.stringify(data)) {
      prevPovData = JSON.stringify(data)
      cb(data)
    }
  })
  socket.emit(`subscribe`, `${token}_OverlayPovSide`)
}
export const unsubscribeToPov = () => {
  socket.on(`${token}_OverlayPovSide`)
  socket.emit(`unsubscribe`, `${token}_OverlayPovSide`)
}

export const subscribeToLeftSide = (cb) => {
  let prevLeftSide = ''
  socket.on(`${token}_OverlayLeftSide`, (data) => {
    if (prevLeftSide !== JSON.stringify(data)) {
      prevLeftSide = JSON.stringify(data)
      cb(data)
    }
  })
  socket.emit(`subscribe`, `${token}_OverlayLeftSide`)
}
export const unsubscribeToLeftSide = () => {
  socket.on(`${token}_OverlayLeftSide`)
  socket.emit(`unsubscribe`, `${token}_OverlayLeftSide`)
}

export const subscribeToRightSide = (cb) => {
  let prevRightSide = ''

  socket.on(`${token}_OverlayRightSide`, (data) => {
    if (prevRightSide !== JSON.stringify(data)) {
      prevRightSide = JSON.stringify(data)
      cb(data)
    }
  })
  socket.emit(`subscribe`, `${token}_OverlayRightSide`)
}
export const unsubscribeToRightSide = () => {
  socket.on(`${token}_OverlayRightSide`)
  socket.emit(`unsubscribe`, `${token}_OverlayRightSide`)
}

export const subscribeToRadar = (cb) => {
  let prevRadarData = ''

  socket.on(`${token}_OverlayRadar`, (data) => {
    if (prevRadarData !== JSON.stringify(data)) {
      prevRadarData = JSON.stringify(data)
      cb(data)
    }
  })
  socket.emit(`subscribe`, `${token}_OverlayRadar`)
}
export const unsubscribeToRadar = () => {
  socket.on(`${token}_OverlayRadar`)
  socket.emit(`unsubscribe`, `${token}_OverlayRadar`)
}

export const subscribeToParser = (cb) => {
  socketParser.on(`ParserConnection`, (data) => cb(data))
  socketParser.emit(`subscribe`, `ParserConnection`)
}
export const unsubscribeToParser = () => {
  socketParser.on(`ParserConnection`)
  socketParser.emit(`unsubscribe`, `ParserConnection`)
}