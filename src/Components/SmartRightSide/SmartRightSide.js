import React, { useEffect, useState } from 'react'
import { subscribeToRightSide, unsubscribeToRightSide } from '../../utils/socketIO'

import EconomyRight from './EconomyRight/EconomyRight'
import RightSide from './RightSide/RightSide'
import UtilitiesRight from './UtilitiesRight/UtilitiesRight'

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
        <div className='dynamic-wrapper col'>
          <UtilitiesRight
            utilities={rightSide.utility}
            team={rightSide.side}
            phase={rightSide.roundPhase}
          />

          <EconomyRight
            economy={rightSide.economy}
            team={rightSide.side}
            phase={rightSide.roundPhase}
          />
        </div>

        <RightSide
          team={rightSide.side}
          players={rightSide.players}
          phase={rightSide.roundPhase.phase}
        />
      </div>
    )
  return null
}
