import { findGetParameter } from './tools'
import socketClient from 'socket.io-client'

const { REACT_APP_STREAM } = process.env

export const token = findGetParameter('token') || 'main'
const backEND = '10.97.2.31'
// const backEND = '10.97.2.14'
const port = REACT_APP_STREAM === 'A' ? 4400 : 4600
const ENDPOINT = `http://${backEND}:${port}/?client=${token}`
const socket = socketClient(ENDPOINT)

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
  socket.on(`${token}_OverlayRightSide`, (data) => cb(data))
  socket.emit(`subscribe`, `${token}_OverlayRightSide`)
}
export const unsubscribeToRightSide = () => {
  socket.on(`${token}_OverlayRightSide`)
  socket.emit(`unsubscribe`, `${token}_OverlayRightSide`)
}
