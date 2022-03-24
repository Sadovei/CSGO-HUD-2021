import './UtilitiesLeft.scss'

import { CostGrenades, SVGMap } from '../../../utils/tools'
import React, { useEffect, useRef, useState } from 'react'

export default function UtilitiesLeft({ utilities, team, phase }) {
  const [animClass, setAnimClass] = useState('')
  const [flag, setFlag] = useState(false)
  const updateStart = useRef(null)

  let HeIMG = SVGMap.hegrenade
  let SmokeIMG = SVGMap.smokegrenade
  let FlashIMG = SVGMap.flashbang
  let IncendiaryIMG = team === 'CT' ? SVGMap.incgrenade : SVGMap.molotov
  let noIncendiary =
    team === 'CT' ? utilities.weapon_incgrenade : utilities.weapon_molotov
  let constUtilities = CostGrenades(utilities, team)

  useEffect(() => {
    if (!updateStart.current) {
      setUpdate(phase.phase)
    }
    return null
  }, [phase.phase, setUpdate])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function setUpdate(phase) {
    if (
      phase === 'freezetime' ||
      phase === 'timeout_t' ||
      phase === 'timeout_ct'
    ) {
      setAnimClass('showStart')
      setFlag(true)
    }

    if (phase === 'live' && flag) {
      updateStart.current = setTimeout(() => {
        setAnimClass('hideStart')
        updateStart.current = null
        setFlag(false)
      }, 5000)
    }

    if (phase === 'bomb' && !flag) {
      setAnimClass('showBomb')
      setFlag(true)
    }

    if (phase === 'bomb' && flag)
      updateStart.current = setTimeout(() => {
        setAnimClass('hideBomb')
        updateStart.current = null
      }, 5000)
  }

  return (
    <div className={`utility-wrapper col ${team}  ${animClass}`}>
      <div className='bar'></div>

      <div className='content-wrapper row'>
        <div className='text-wrapper col'>
          <p className='dynamic'>{constUtilities}</p>
          <p className='text-notice'>UTILITY</p>
        </div>

        <div className='grenade he-wrapper row'>
          <p className='numberOf'>{utilities.weapon_hegrenade}X</p>
          <HeIMG />
        </div>

        <div className='grenade flash-wrapper row'>
          <p className='numberOf'>{utilities.weapon_flashbang}X</p>
          <FlashIMG />
        </div>

        <div className='grenade smoke-wrapper row'>
          <p className='numberOf'>{utilities.weapon_smokegrenade}X</p>
          <SmokeIMG />
        </div>

        <div className='grenade incendiary-wrapper row'>
          <p className='numberOf'>{noIncendiary}X</p>
          <IncendiaryIMG />
        </div>
      </div>

      <div className='bk-gradient'></div>
    </div>
  )
}
