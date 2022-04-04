import './Radar.scss'

import React, { useEffect, useState } from 'react'
import { subscribeToParser, token } from './utils/socketIO'

import SmartDynamic from './Components/SmartDynamic/SmartDynamic'
import SmartLeftSide from './Components/SmartLeftSide/SmartLeftSide'
import SmartRightSide from './Components/SmartRightSide/SmartRightSide'
import SmartTopBar from './Components/SmartTopBar/SmartTopBar'

function App() {
  const [parserData, setparserData] = useState({ type: '', data: {}, show: false })

  useEffect(() => {
    if (token === 'igdir') {
      subscribeToParser((data) => {
        setparserData(data)
      })
    }
  }, [])

  useEffect(() => {
    if (token === 'igdir') {
      if (parserData.type === 'Refresh') {
        if (parserData.data === token) {
          window.location.reload()
        }
      }
    }
  }, [parserData])

  return (
    <>
      <SmartTopBar parserData={parserData} />
      <SmartLeftSide />
      <SmartRightSide />
      <SmartDynamic parserData={parserData} />
    </>
  )
}

export default App