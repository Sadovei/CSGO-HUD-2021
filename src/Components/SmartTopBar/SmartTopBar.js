import './SmartTopBar.scss'

import React, { useEffect, useRef, useState } from 'react'
import { subscribeToTopBar, unsubscribeToTopBar } from '../../utils/socketIO'

import DynamicComponents from './DynamicComponents/DynamicComponents'
import HistoricRounds from './HistoricRounds/HistoricRounds'
import TopBar from './TopBar/TopBar'

export default function SmartTopBar() {
  const [topBarData, setTopBarData] = useState()
  const showHistory = useRef('')
  const showDynamic = useRef('')

  useEffect(() => {
    subscribeToTopBar((data) => {
      setTopBarData(data)
    })
    return unsubscribeToTopBar
  }, [])
  
  if (topBarData && Object.keys(topBarData).length > 0 && topBarData.round.time !== '-100') {
    return (
      <div className='topBar-wrapper'>
        <TopBar topBar={topBarData} />

        <div className='showHistoric-wrapper row'>
          <HistoricRounds data={topBarData.mapInfo.historyRounds} leftTeam={topBarData.leftSide} rightTeam={topBarData.rightSide} showContent={showHistory.current} />
        </div>

        <DynamicComponents topBar={topBarData} showContent={showDynamic.current} />
      </div>
    )
  }
  return null
}
