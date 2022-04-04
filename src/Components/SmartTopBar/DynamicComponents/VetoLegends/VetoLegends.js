import './VetoLegends.scss'

import React, { useEffect, useRef, useState } from 'react'

import { currentMatch } from '../../../../utils/tools'

export default function VetoLegends({ topBar }) {
  const [animClass, setAnimClass] = useState('')
  const [flag, setFlag] = useState(false)
  const updateStart = useRef(null)

  useEffect(() => {
    if (!updateStart.current) {
      setUpdate(topBar.round.phase)
    }
    return null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topBar.round.phase, updateStart.current])

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

  let leftLogo =
    topBar.leftSide.nameKey === 'placeholder'
      ? `placeholder/${topBar.leftSide.sideTeam === 'CT' ? 'CT' : 'T'}`
      : topBar.leftSide.nameKey

  let rightLogo =
    topBar.rightSide.nameKey === 'placeholder'
      ? `placeholder/${topBar.rightSide.sideTeam === 'CT' ? 'CT' : 'T'}`
      : topBar.rightSide.nameKey

  let matchCurrent = currentMatch(topBar.mapInfo.vetoLegend, topBar)
  if (topBar.leftSide.nameKey === 'placeholder') return null

  return (
    <div className={`vetoLegends-wrapper row ${animClass}`}>
      {Object.keys(topBar.mapInfo.vetoLegend).map((map, indexMap) => {
        return (
          <div key={indexMap} className='map-wrapper col'>
            <div className='first-row'>
              <p className='map-name'>{map}</p>
              {matchCurrent === indexMap && <p className='current'>CURRENT</p>}

              {topBar.mapInfo.vetoLegend[map][topBar.leftSide.nameKey] !== null && (
                <div className='info-wrapper'>
                  <div
                    className='logo-left'
                    style={{
                      backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${leftLogo}/logo.webp)`
                    }}
                  ></div>

                  <p className='score-left'>
                    {topBar.mapInfo.vetoLegend[map][topBar.leftSide.nameKey]}
                  </p>

                  <p className='score-notice'>-</p>

                  <p className='score-right'>
                    {topBar.mapInfo.vetoLegend[map][topBar.rightSide.nameKey]}
                  </p>

                  <div
                    className='logo-right'
                    style={{
                      backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${rightLogo}/logo.webp)`
                    }}
                  ></div>
                </div>
              )}
            </div>

            <div className='second-row col'>
              {(Object.keys(topBar.mapInfo.vetoLegend).length - 1 !== 0) && (indexMap !== Object.keys(topBar.mapInfo.vetoLegend).length - 1) && <p className='map-notice'>PICKED BY</p>}
              <p className={`map-text ${topBar.mapInfo.vetoLegend[map].pickName === 'Decider Map' ? 'decider' : ''}`}>{topBar.mapInfo.vetoLegend[map].pickName.toUpperCase()}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
