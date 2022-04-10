import React from 'react'
import SmartLeftSide from './Components/SmartLeftSide/SmartLeftSide'
import SmartRightSide from './Components/SmartRightSide/SmartRightSide'
import SmartTopBar from './Components/SmartTopBar/SmartTopBar'

function App() {
  return (
    <>
      <SmartTopBar />

      <SmartLeftSide />
      <SmartRightSide />
    </>
  )
}

export default App