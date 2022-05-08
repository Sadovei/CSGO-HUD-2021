import './SmartTopBar.scss'

import React, { useEffect, useState } from 'react'
import { subscribeToTopBar, token, unsubscribeToTopBar } from '../../utils/socketIO'

import DynamicComponents from './DynamicComponents/DynamicComponents'
import HistoricRounds from './HistoricRounds/HistoricRounds'
import TopBar from './TopBar/TopBar'
import { redisIP } from '../../utils/tools'

const { REACT_APP_STREAM } = process.env

export default function SmartTopBar({ parserData }) {
  const [topBarData, setTopBarData] = useState()
  const [showHistory, setShowHistory] = useState('none')
  const [showDynamic, setShowDynamic] = useState('show')

  useEffect(() => {
    subscribeToTopBar((data) => {
      setTopBarData(data)
    })
    return unsubscribeToTopBar
  }, [])

  useEffect(() => {
    if (token === 'igdir')
      if (parserData.type !== '') {
        if (parserData.type === 'Historic_Rounds') {
          if (parserData.show) {
            setShowHistory('show')
            setShowDynamic('hide')
          } else {
            setShowHistory('hide')
            setShowDynamic('show')
          }
        }
      } else {
        setShowHistory('none')
        setShowDynamic('show')
      }
  }, [parserData])

  if (topBarData && Object.keys(topBarData).length > 0 && topBarData.round.time !== '-100') {
    return (
      <div className='topBar-wrapper'>
        <TopBar topBar={topBarData} />

        <div className='showHistoric-wrapper row'>
          <HistoricRounds data={topBarData.mapInfo.historyRounds} leftTeam={topBarData.leftSide} rightTeam={topBarData.rightSide} showContent={showHistory} />
        </div>

        <DynamicComponents topBar={topBarData} showContent={showDynamic} />

        <iframe title="radar" id="newRadar" loading="lazy" scrolling="no" frameBorder="none" importance="high" 
        src={`http://${redisIP}/pgl/CSGO/boltobserv/html/map.html#${redisIP}:${REACT_APP_STREAM === 'A' ? '4400' : '4600'}/?client=${token}`}
          width="100%" height="100%" className={topBarData.mapInfo.mapName}></iframe>
      </div>
    )
  }
  return null
}
