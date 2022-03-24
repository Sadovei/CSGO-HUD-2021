import './EconomyLeft.scss'

import React, { useEffect, useRef, useState } from 'react'

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
    if (phase === 'freezetime' || phase === 'timeout_t' || phase === 'timeout_ct') {
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
    <div className={`economy-wrapper col ${team} ${animClass}`}>
      <div className='bar'></div>

      <div className='content-wrapper row'>
        <div className='image'></div>

        <div className='loss-bonus-wrapper col'>
          <div className='money-wrapper row'>
            <p className='moneyFirst'>${Math.floor(economy.bonus / 1000) !== 0 && Math.floor(economy.bonus / 1000)}</p>
            <p className='moneySecond'>{economy.bonus > 0 ?
              (Math.floor(economy.bonus / 1000) > 0 ?
                (String(economy.bonus % 1000).padStart(3, '0')) : economy.bonus % 1000) : '0'}</p>
          </div>

          <p className='loss-notice'>Loss bonus</p>
        </div>

        <div className='equipment-wrapper col'>
          <div className='equipmentValue-wrapper row'>
            <p className='moneyFirst'>${Math.floor(economy.eq_value / 1000) !== 0 && Math.floor(economy.eq_value / 1000)}</p>
            <p className='moneySecond'>{economy.eq_value > 0 ?
              (Math.floor(economy.eq_value / 1000) > 0 ?
                (String(economy.eq_value % 1000).padStart(3, '0')) : economy.eq_value % 1000) : '0'}</p>
          </div>

          <p className='equipment-notice'>Equipment value</p>
        </div>
      </div>

      <div className='bk-gradient'></div>
    </div>
  )
}
