import React, { useEffect, useState } from 'react'
import { subscribeToRightSide, unsubscribeToRightSide } from '../../utils/socketIO'

import EconomyRight from './EconomyRight/EconomyRight'
import RightSide from './RightSide/RightSide'
import UtilitiesRight from './UtilitiesRight/UtilitiesRight'

export default function SmartRightSide({ parserData }) {
  const [rightSide, setRightSide] = useState(undefined)
  const [showADR, setShowADR] = useState('show')

  useEffect(() => {
    subscribeToRightSide((data) => {
      setRightSide(data)
    })
    return unsubscribeToRightSide
  }, [])

  useEffect(() => {
    if (parserData?.type === 'ADRStatus') {
      if (parserData.show) {
        setShowADR('show')
      } else {
        setShowADR('hide')
      }
    }
  }, [parserData])
  if (rightSide)
    return (
      <div className='right-wrapper mainHud'>
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
          showADR={showADR}
        />
      </div>
    )
  return null
}
