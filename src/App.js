import './Radar.scss'

import React, { useEffect, useState } from 'react'
import { subscribeToParser, token, unsubscribeToParser } from './utils/socketIO'

import { Route, Routes } from 'react-router-dom'
import MainHud from './MainHud'
import ReplayCinematicHud from './ReplayCinematicHud'
import ReplayHud from './ReplayHud'
import EconomyHud from './EconomyHud'

function App() {
  const [parserData, setparserData] = useState({ type: '', data: {}, show: false })

  useEffect(() => {
    subscribeToParser((data) => {
      setparserData(data)
    })
    return unsubscribeToParser
  }, [])

  useEffect(() => {
    if (parserData.type === 'Refresh') {
      if (parserData.data === token) {
        window.location.reload()
      }
    }
  }, [parserData])

  return (
    <Routes>
      <Route path='/hud' element={<MainHud />} parserData={parserData} />
      <Route path='/hud-replay' element={<ReplayHud />} parserData={parserData} />
      <Route path='/hud-replay-cinematic' element={<ReplayCinematicHud />} parserData={parserData} />
      <Route path='/economy' element={<EconomyHud />} parserData={parserData} />
    </Routes>
  )
}

export default App