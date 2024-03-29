import React, { useEffect, useRef, useState } from 'react'
import './EconomyLeft.scss'

export default function EconomyLeft({ economy, team, phase }) {
  const [animClass, setAnimClass] = useState('')
  const [flag, setFlag] = useState(false)
  const updateStart = useRef(null)

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
  }

  return (
    <div className={`economy-wrapper row ${team} font-tablet ${animClass}`}>
      <div className='image'></div>
      <div className='info-wrapper row'>
        <div className='rounds-wrapper col'>
          <div
            className={`round rounds-1 ${economy.roundLose > 0 ? 'lose' : ''}`}
          ></div>
          <div
            className={`round rounds-2 ${economy.roundLose > 1 ? 'lose' : ''}`}
          ></div>
          <div
            className={`round rounds-3 ${economy.roundLose > 2 ? 'lose' : ''}`}
          ></div>
          <div
            className={`round rounds-4 ${economy.roundLose > 3 ? 'lose' : ''}`}
          ></div>
          <div
            className={`round rounds-5 ${economy.roundLose > 4 ? 'lose' : ''}`}
          ></div>
        </div>

        <div className='loss-bonus-wrapper col'>
          <p className='money'>{economy.bonus}</p>
          <p className='loss-notice'>Loss bonus</p>
        </div>

        <div className='equipment-wrapper col'>
          <p className='equipment-value'>${economy.eq_value}</p>
          <p className='equipment-notice'>Equipment value</p>
        </div>
      </div>
    </div>
  )
}
