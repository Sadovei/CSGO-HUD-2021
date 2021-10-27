import React, { useEffect, useRef, useState } from 'react'
import { currentMatch } from '../../../utils/tools'
import './VetoLegends.scss'

export default function VetoLegends({ vetoInfo, phase, topBar }) {
  const [animClass, setAnimClass] = useState('')
  const [flag, setFlag] = useState(false)
  const updateStart = useRef(null)
  useEffect(() => {
    if (!updateStart.current) {
      setUpdate(phase)
    }
    return null
  }, [phase, setUpdate])

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
  let matchCurrent = currentMatch(vetoInfo, topBar)
  if (topBar.leftSide.nameKey === 'placeholder') return null
  else
    return (
      <div className='main-wrapper'>
        <div className={`veto-legends-wrapper font-tablet ${animClass}`}>
          {Object.keys(vetoInfo).map((map, indexMap) => {
            return (
              <div key={indexMap} className='map'>
                <div className='first-row'>
                  <p className='map-name'>{map}</p>
                  {matchCurrent === indexMap ? (
                    <p className='current'>Current</p>
                  ) : (
                    matchCurrent < indexMap && (
                      <div className='info-wrapper'>
                        <div
                          className='logo-left'
                          style={{
                            backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${topBar.leftSide.nameKey}/logo.webp)`
                          }}
                        ></div>
                        <p className='score-notice'>vs</p>
                        <div
                          className='logo-right'
                          style={{
                            backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${topBar.rightSide.nameKey}/logo.webp)`
                          }}
                        ></div>
                      </div>
                    )
                  )}

                  {vetoInfo[map][topBar.leftSide.nameKey] !== null && (
                    <div className='info-wrapper'>
                      <div
                        className='logo-left'
                        style={{
                          backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${topBar.leftSide.nameKey}/logo.webp)`
                        }}
                      ></div>
                      <p className='score-left'>
                        {vetoInfo[map][topBar.leftSide.nameKey]}
                      </p>
                      <p className='score-notice'>-</p>
                      <p className='score-right'>
                        {vetoInfo[map][topBar.rightSide.nameKey]}
                      </p>
                      <div
                        className='logo-right'
                        style={{
                          backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${topBar.rightSide.nameKey}/logo.webp)`
                        }}
                      ></div>
                    </div>
                  )}
                </div>
                <div className='second-row'>
                  {indexMap !== 2 && <p className='map-notice'>PICKED BY</p>}
                  <p className='map-text'>{vetoInfo[map].pickName}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
}
