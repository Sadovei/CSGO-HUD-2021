import './SmartTopBar.scss'

import React, { useEffect, useState } from 'react'
import { subscribeToTopBar, unsubscribeToTopBar } from '../../utils/socketIO'

import TopBar from './TopBar/TopBar'
import SeriesInfoComponent from './SeriesInfoComponent/SeriesInfoComponent'

export default function SmartTopBar() {
  const [topBarData, setTopBarData] = useState()

  useEffect(() => {
    subscribeToTopBar((data) => {
      setTopBarData(data)
    })
    return unsubscribeToTopBar
  }, [])
  
  if (topBarData)
    return (
      <div className='topBar-wrapper'>
        <TopBar topBar={topBarData} />
        <SeriesInfoComponent mapInfo={topBarData.mapInfo} leftSide={topBarData.leftSide} rightSide={topBarData.rightSide} />

      </div>
    )
  return null
}
