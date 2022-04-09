import React, { useEffect, useState } from 'react'
import { subscribeToLeftSide, unsubscribeToLeftSide } from '../../utils/socketIO'

import EconomyLeft from './EconomyLeft/EconomyLeft'
import LeftSide from './LeftSide/LeftSide'
import OwnBrand from './OwnBrand/OwnBrand'
import UtilitiesLeft from './UtilitiesLeft/UtilitiesLeft'

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
        <div className='dynamic-wrapper col'>
          <UtilitiesLeft
            utilities={leftSide.utility}
            team={leftSide.side}
            phase={leftSide.roundPhase}
          />

          <EconomyLeft
            economy={leftSide.economy}
            team={leftSide.side}
            phase={leftSide.roundPhase}
          />

          <OwnBrand phase={leftSide.roundPhase} typeOfEvent={leftSide?.typeOfEvent ? leftSide.typeOfEvent : ''} />
        </div>

        <LeftSide
          team={leftSide.side}
          players={leftSide.players}
          phase={leftSide.roundPhase.phase}
        />
      </div>
    )
  return null
}
