import './Radar.scss'

import React from 'react'
import SmartDynamic from './Components/SmartDynamic/SmartDynamic'
import SmartLeftSide from './Components/SmartLeftSide/SmartLeftSide'
import SmartRightSide from './Components/SmartRightSide/SmartRightSide'
import SmartTopBar from './Components/SmartTopBar/SmartTopBar'

function App() {
  return (
    <>
      <SmartTopBar />

      <SmartLeftSide />
      <SmartRightSide />
      <SmartDynamic />
    </>
  )
}

export default App