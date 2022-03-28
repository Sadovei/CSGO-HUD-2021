import './Radar.scss'

import React from 'react'
import SmartLeftSide from './Components/SmartLeftSide/SmartLeftSide'
import SmartPovSide from './Components/SmartPovSide/SmartPovSide'
import SmartRightSide from './Components/SmartRightSide/SmartRightSide'
import SmartTopBar from './Components/SmartTopBar/SmartTopBar'

function App() {
  return (
    <>
      <SmartTopBar />

      <SmartLeftSide />
      <SmartRightSide />

      
      <SmartPovSide action={'show'} />
    </>
  )
}

export default App