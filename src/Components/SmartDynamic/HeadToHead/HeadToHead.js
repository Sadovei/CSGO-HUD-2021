import './HeadToHead.scss'

import React, { useRef } from 'react'
import { animated, useSpring } from 'react-spring'

import classNames from 'classnames'

let dataH2H

export default function HeadToHead({ data, action }) {
  const styleApplied = useRef('')

  const showEl = useSpring({
    from: { bottom: '-25vw' },
    to: { bottom: '1.1vw' }
  })

  const hideEl = useSpring({
    from: { bottom: '1.1vw' },
    to: { bottom: '-25vw' }
  })

  if (action === 'show') {
    dataH2H = data
    styleApplied.current = showEl
  } else if (action === 'hide')
    styleApplied.current = hideEl

  let leftPicturePlayer = `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${dataH2H?.leftPlayer?.teamKey}/${dataH2H?.leftPlayer?.playerKey}.webp`
  let rightPicturePlayer = `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${dataH2H?.rightPlayer?.teamKey}/${dataH2H?.rightPlayer?.playerKey}.webp`
  let flagLeft = `http://redis-birou.pgl.ro/pgl/resources/flags/${dataH2H?.leftPlayer?.flag}.png`
  let flagRight = `http://redis-birou.pgl.ro/pgl/resources/flags/${dataH2H?.rightPlayer?.flag}.png`

  let leftSide = classNames({
    CT: dataH2H?.leftPlayer.side === 'CT' && true,
    T: dataH2H?.leftPlayer.side === 'T' && true
  })
  let rightSide = classNames({
    CT: dataH2H?.rightPlayer.side === 'CT' && true,
    T: dataH2H?.rightPlayer.side === 'T' && true
  })

  return (
    <animated.div className='headToHead-wrapper  row' style={styleApplied.current !== '' ? styleApplied.current : null}>
      <div className='leftSide-wrapper player'>
        <div
          className='image-player'
          style={{ backgroundImage: `url(${leftPicturePlayer})` }}
        ></div>

        <div className='info-wrapper col'>
          <p className='nickName'>{dataH2H?.leftPlayer.playerNickName}</p>
          <div className='name-wrapper row'>
            <p className='name'>{dataH2H?.leftPlayer.playerName}</p>
            <div
              className='flag'
              style={{ backgroundImage: `url(${flagLeft})` }}
            ></div>
          </div>
          <p className='teamName'>{dataH2H?.leftPlayer.teamName}</p>
        </div>
      </div>

      <div className='h2h-info-wrapper col'>
        <div className='duels-wrapper info col'>
          <p className='title'>DUELS</p>
          <div className='bar-info row'>
            <div className={`bar-wrapper left ${leftSide}`}>
              <p className='number number-left'>{dataH2H?.leftPlayer.duels}%</p>
              <div
                className='bar'
                style={{ width: `${(dataH2H?.leftPlayer.duels * 92) / 100}%` }}
              ></div>
            </div>

            <div className={`bar-wrapper right ${rightSide}`}>
              <p className='number number-right'>
                {dataH2H?.rightPlayer.duels}%
              </p>
              <div
                className='bar'
                style={{ width: `${(dataH2H?.rightPlayer.duels * 92) / 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className='adr-wrapper info col'>
          <p className='title'>ADR</p>

          <div className='bar-info row'>
            <div className={`bar-wrapper left ${leftSide}`}>
              <p className='number number-left'>{dataH2H?.leftPlayer.adr}</p>
              <div
                className='bar'
                style={{
                  width: `${(dataH2H?.leftPlayer.adr * 92) / dataH2H?.adr}%`
                }}
              ></div>
            </div>

            <div className={`bar-wrapper right ${rightSide}`}>
              <p className='number number-right'>{dataH2H?.rightPlayer.adr}</p>
              <div
                className='bar'
                style={{
                  width: `${(dataH2H?.rightPlayer.adr * 92) / dataH2H?.adr}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className='kast-wrapper info col'>
          <p className='title'>KAST</p>

          <div className='bar-info row'>
            <div className={`bar-wrapper left ${leftSide}`}>
              <p className='number number-left'>{dataH2H?.leftPlayer.kast}</p>
              <div
                className='bar'
                style={{
                  width: `${(dataH2H?.leftPlayer.kast * 92) / dataH2H?.kast}%`
                }}
              ></div>
            </div>

            <div className={`bar-wrapper right ${rightSide}`}>
              <p className='number number-right'>{dataH2H?.rightPlayer.kast}</p>
              <div
                className='bar'
                style={{
                  width: `${(dataH2H?.rightPlayer.kast * 92) / dataH2H?.kast}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className='hs-wrapper info col'>
          <p className='title'>HS%</p>

          <div className='bar-info row'>
            <div className={`bar-wrapper left ${leftSide}`}>
              <p className='number number-left'>{dataH2H?.leftPlayer.hs}%</p>
              <div
                className='bar'
                style={{ width: `${(dataH2H?.leftPlayer.hs * 92) / 100}%` }}
              ></div>
            </div>

            <div className={`bar-wrapper right ${rightSide}`}>
              <p className='number number-right'>{dataH2H?.rightPlayer.hs}%</p>
              <div
                className='bar'
                style={{ width: `${(dataH2H?.rightPlayer.hs * 92) / 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className='accuracy-wrapper info col'>
          <p className='title'>ACCURACY</p>

          <div className='bar-info row'>
            <div className={`bar-wrapper left ${leftSide}`}>
              <p className='number number-left'>
                {dataH2H?.leftPlayer.accuracy}%
              </p>
              <div
                className='bar'
                style={{
                  width: `${(dataH2H?.leftPlayer.accuracy * 92) / 100}%`
                }}
              ></div>
            </div>

            <div className={`bar-wrapper right ${rightSide}`}>
              <p className='number number-right'>
                {dataH2H?.rightPlayer.accuracy}%
              </p>
              <div
                className='bar'
                style={{
                  width: `${(dataH2H?.rightPlayer.accuracy * 92) / 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className='utility-wrapper info col'>
          <p className='title'>UTILITY USED</p>

          <div className='bar-info row'>
            <div className={`bar-wrapper left ${leftSide}`}>
              <p className='number number-left'>
                {dataH2H?.leftPlayer.grenades_used}
              </p>
              <div
                className='bar'
                style={{
                  width: `${(dataH2H?.leftPlayer.grenades_used * 92) /
                    dataH2H?.utility_grenades_used
                    }%`
                }}
              ></div>
            </div>

            <div className={`bar-wrapper right ${rightSide}`}>
              <p className='number number-right'>
                {dataH2H?.rightPlayer.grenades_used}
              </p>
              <div
                className='bar'
                style={{
                  width: `${(dataH2H?.rightPlayer.grenades_used * 92) /
                    dataH2H?.utility_grenades_used
                    }%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className='rightSide-wrapper player'>
        <div
          className='image-player'
          style={{ backgroundImage: `url(${rightPicturePlayer})` }}
        ></div>

        <div className='info-wrapper col'>
          <p className='nickName'>{dataH2H?.rightPlayer.playerNickName}</p>
          <div className='name-wrapper row'>
            <div
              className='flag'
              style={{ backgroundImage: `url(${flagRight})` }}
            ></div>
            <p className='name'>{dataH2H?.rightPlayer.playerName}</p>
          </div>
          <p className='teamName'>{dataH2H?.rightPlayer.teamName}</p>
        </div>
      </div>
    </animated.div>
  )
}
