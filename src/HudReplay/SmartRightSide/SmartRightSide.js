import React, { useEffect, useState } from 'react'
import { subscribeToRightSide, unsubscribeToRightSide } from '../../utils/socketIO'

import RightSide from './RightSide/RightSide'

export default function SmartRightSide() {
  const [rightSide, setRightSide] = useState(undefined)

  useEffect(() => {
    subscribeToRightSide((data) => {
      setRightSide(data)
    })
    return unsubscribeToRightSide
  }, [])

  if (rightSide)
    return (
      <div className='right-wrapper'>
        <RightSide
          team={rightSide.side}
          players={rightSide.players}
          phase={rightSide.roundPhase.phase}
        />
      </div>
    )
  return null
}
