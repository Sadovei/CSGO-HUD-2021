import './Radar.scss'

import React, { useEffect, useState } from 'react'
import {
  subscribeToCheckStream,
  subscribeToMessage,
  subscribeToRadar,
  subscribeToTopBar,
  token,
  unsubscribeToCheckStream,
  unsubscribeToMessage,
  unsubscribeToRadar,
  unsubscribeToTopBar
} from './utils/socketIO'

import CheckStream from './Components/SmartDynamic/CheckStream/CheckStream'
import RadarLayout from './Components/Radar/Radar'
import SmartDynamic from './Components/SmartDynamic/SmartDynamic'
import SmartLeftSide from './Components/SmartLeftSide/SmartLeftSide'
import SmartRightSide from './Components/SmartRightSide/SmartRightSide'
import SmartTopBar from './Components/SmartTopBar/SmartTopBar'

function App() {
  const [topBar, setTopBar] = useState()
  const [objectData, setObjectData] = useState('')
  const [message, setMessage] = useState(null)
  const [radarToggle, setRadarToggle] = useState(true)
  const [checkStream, setCheckStream] = useState([
    0,
    { show: 'false' },
    { text: '' }
  ])

  useEffect(() => {
    subscribeToTopBar((data) => {
      setTopBar(data)
    })

    subscribeToRadar((data) => {
      setObjectData(data)
    })

    subscribeToMessage((data) => {
      setMessage(data)
    })

    if (token === 'igdir') {
      subscribeToCheckStream((data) => {
        setCheckStream(data)
      })
    }
    return {
      unsubscribeToRadar,
      unsubscribeToTopBar,
      unsubscribeToMessage,
      unsubscribeToCheckStream
    }
  }, [])

  useEffect(() => {
    if (message !== null) {
      if (message === 'refresh') window.location.reload()
      else if (message === 'radar-off') setRadarToggle(true)
      else if (message === 'radar-on') setRadarToggle(false)
      setMessage(null)
    }
    return null
  }, [message])

  if (topBar) {
    if (topBar.mapInfo.phase === 'gameover' && topBar.round.time <= 0) {
      return null
    } else
      return (
        <>
          <SmartTopBar topBarData={topBar} />
          <SmartRightSide />
          <SmartLeftSide />
          <SmartDynamic />

          {!radarToggle && objectData && <RadarLayout dataObj={objectData} />}

          {checkStream !== [0, false, ''] && (
            <CheckStream
              data={checkStream[0]}
              show={checkStream[1].show}
              text={checkStream[2].text}
            />
          )}
          
          {radarToggle &&
            <iframe title="radar" id="newRadar" loading="lazy" scrolling="no" frameBorder="none" importance="high" src={`http://localhost:4903`}
              width="100%" height="100%" className={objectData?.map?.name}></iframe>
          }
        </>
      )
  } else return null
}

export default App