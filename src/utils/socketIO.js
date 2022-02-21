import { findGetParameter } from './URLParameters'
import socketClient from 'socket.io-client'

export const token = findGetParameter('token') || 'main'
const backEND = '10.97.2.14'
const port = 4400
const ENDPOINT = `http://${backEND}:${port}/?client=${token}`
const socket = socketClient(ENDPOINT)

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

export const subscribeToHead2Head = (cb) => {
  if (token === 'igdir') {
    socket.on(`igdir_Overlay_Head2Head`, (data) => cb(data))
    socket.emit(`subscribe`, `igdir_Overlay_Head2Head`)
  }
}
export const unsubscribeToHead2Head = () => {
  if (token === 'igdir') {
    socket.on(`igdir_Overlay_Head2Head`)
    socket.emit(`unsubscribe`, `igdir_Overlay_Head2Head`)
  }
}

export const subscribeToSponsorNr1 = (cb) => {
  if (token === 'igdir') {
    socket.on(`igdir_sponsorNr1`, (data) => cb(data))
    socket.emit(`subscribe`, `igdir_sponsorNr1`)
  }
}
export const unsubscribeToSponsorNr1 = () => {
  if (token === 'igdir') {
    socket.on(`igdir_sponsorNr1`)
    socket.emit(`unsubscribe`, `igdir_sponsorNr1`)
  }
}

export const subscribeToScoreBoard = (cb) => {
  if (token === 'igdir') {
    socket.on(`igdir_Overlay_Scoreboard`, (data) => cb(data))
    socket.emit(`subscribe`, `igdir_Overlay_Scoreboard`)
  }
}
export const unsubscribeToScoreBoard = () => {
  if (token === 'igdir') {
    socket.on(`igdir_Overlay_Scoreboard`)
    socket.emit(`unsubscribe`, `igdir_Overlay_Scoreboard`)
  }
}

export const subscribeToCheckStream = (cb) => {
  if (token === 'igdir') {
    if (port === '4600') {
      socket.on(`igdir_checkStream_A`, (data) => cb(data))
      socket.emit(`subscribe`, `igdir_checkStream_A`)
    } else {
      socket.on(`igdir_checkStream_B`, (data) => cb(data))
      socket.emit(`subscribe`, `igdir_checkStream_B`)
    }
  }
}
export const unsubscribeToCheckStream = () => {
  if (token === 'igdir') {
    if (port === '4600') {
      socket.on(`igdir_checkStream_A`)
      socket.emit(`unsubscribe`, `igdir_checkStream_A`)
    } else {
      socket.on(`igdir_checkStream_B`)
      socket.emit(`unsubscribe`, `igdir_checkStream_B`)
    }
  }
}

export const subscribeToRadar = (cb) => {
  socket.on(`${token}_OverlayRadar`, (data) => cb(data))
  socket.emit(`subscribe`, `${token}_OverlayRadar`)
}
export const unsubscribeToRadar = () => {
  socket.on(`${token}_OverlayRadar`)
  socket.emit(`unsubscribe`, `${token}_OverlayRadar`)
}

export const subscribeToMessage = (cb) => {
  socket.on(`${token}_Refresh_Graphics`, (data) => cb(data))
  socket.emit(`subscribe`, `${token}_Refresh_Graphics`)
}
export const unsubscribeToMessage = () => {
  socket.on(`${token}_Refresh_Graphics`)
  socket.emit(`unsubscribe`, `${token}_Refresh_Graphics`)
}
