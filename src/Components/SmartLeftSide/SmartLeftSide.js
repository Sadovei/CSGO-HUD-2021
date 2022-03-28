import React, { useEffect, useState } from 'react'
import { subscribeToLeftSide, unsubscribeToLeftSide } from '../../utils/socketIO'

import LeftSide from './LeftSide/LeftSide'

export default function SmartLeftSide() {
  const [leftSide, setLeftSide] = useState(undefined)

  useEffect(() => {
    subscribeToLeftSide((data) => {
      setLeftSide(data)
    })
    return unsubscribeToLeftSide
  }, [])

  if (leftSide)
    return (
      <div className='left-wrapper'>
        <LeftSide
          team={leftSide.side}
          players={leftSide.players}
          phase={leftSide.roundPhase.phase}
        />
      </div>
    )
  return null
}
