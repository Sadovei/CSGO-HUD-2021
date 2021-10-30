import './TopBar.scss'

import React, { useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { centerCounter, centerTerrorist } from './icons'

import Timer from './Timer/Timer'
import bomb from '../../../assets/videos/bomb.webm'
import { calcDefusePerc } from './TopBarStore'
import classNames from 'classnames'
import hirestime from 'hirestime'
import { range } from '../../../utils/tools'

let boomElapsed = 0
let boomTime = 0
let flagMVP = false
let currentMVP
let test
export default function TopBar({ topBar }) {
  const [mvpsArray, setMVPS] = useState(topBar.mapInfo?.mvps ?? null)

  useEffect(() => {
    if (mvpsArray && mvpsArray !== null)
      currentMVP = Object.keys(mvpsArray).filter((key) => {
        if (mvpsArray[key] && topBar.mapInfo.mvps[key])
          return mvpsArray[key]?.mvps < topBar.mapInfo.mvps[key].mvps
        else
          return undefined
      })[0]

    if (currentMVP !== undefined) {
      setTimeout(() => {
        setMVPS(topBar.mapInfo.mvps)
      }, 4000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topBar.mapInfo.mvps])

  if (currentMVP !== undefined && flagMVP === false && test === undefined) {
    flagMVP = true
    test = currentMVP
  }

  if (flagMVP) {
    setTimeout(() => {
      flagMVP = false
    }, 3500)
    setTimeout(() => {
      test = undefined
    }, 4500)
  }

  const [timeTimer, setTimeTimer] = useState(0)
  const [phaseTimer, setPhaseTimer] = useState()

  const [flagBomb, setFlagBomb] = useState(true)
  const [flagDefuse, setFlagDefuse] = useState(true)

  const [flag, setFlag] = useState(true)
  const [defuseState, setDefuseState] = useState(false)

  let sideLeft = classNames({
    CT: topBar.leftSide.sideTeam === 'CT' && true,
    T: topBar.leftSide.sideTeam === 'T' && true
  })

  let sideRight = classNames({
    CT: topBar.rightSide.sideTeam === 'CT' && true,
    T: topBar.rightSide.sideTeam === 'T' && true
  })

  let picturePlayer =
    currentMVP !== undefined &&
    `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${topBar.mapInfo.mvps[currentMVP].teamKey}/${topBar.mapInfo.mvps[currentMVP].playerKey}.webp`
  let leftWin = 0
  let rightWin = 0

  Object.values(topBar.mapInfo.vetoLegend).forEach((info) => {
    if (info[topBar.leftSide.nameKey] < info[topBar.rightSide.nameKey])
      rightWin += 1
    if (info[topBar.leftSide.nameKey] > info[topBar.rightSide.nameKey])
      leftWin += 1
  })

  let biggest =
    topBar.leftSide.name.length > topBar.rightSide.name.length
      ? topBar.leftSide.name.length
      : topBar.rightSide.name.length
  let leftLogo =
    topBar.leftSide.nameKey === 'placeholder'
      ? `placeholder/${topBar.leftSide.sideTeam === 'CT' ? 'CT' : 'T'}`
      : topBar.leftSide.nameKey
  let rightLogo =
    topBar.rightSide.nameKey === 'placeholder'
      ? `placeholder/${topBar.rightSide.sideTeam === 'CT' ? 'CT' : 'T'}`
      : topBar.rightSide.nameKey
  let timeMinutes =
    Number(topBar.round.time) >= 0
      ? Math.floor(Number(topBar.round.time) / 60)
      : 0
  let timeSeconds =
    Number(topBar.round.time) >= 0
      ? Math.ceil(Number(topBar.round.time)) % 60 < 10
        ? `0${Math.ceil(Number(topBar.round.time)) % 60}`
        : Math.ceil(Number(topBar.round.time)) % 60
      : '00'
  const mapsToWin = range(1, (topBar.mapInfo.bestOf / 2).toFixed(0))

  useEffect(() => {
    setUpdate(topBar.round.phase, topBar.round.win_team)
    setFlag(true)
    return null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topBar.round.phase, topBar.round.win_team])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function setUpdate(phase, round_win) {
    if ((phase === 'defuse' || phase === 'bomb') && round_win === '' && flag) {
      setTimeTimer(Number(timeSeconds))
      setPhaseTimer(phase)
      setFlag(false)
    }

    if ((round_win === 'CT' || round_win === 'T') && flag) {
      setTimeTimer(Number(timeSeconds))
      setPhaseTimer(round_win)
      setFlag(false)
    }
  }

  if (topBar.round.bombState.explodeTime !== '0' && flagBomb) {
    boomElapsed = hirestime()
    setFlagBomb(false)
  }

  if (topBar.round.bombState.explodeTime === '0' && !flagBomb) {
    boomElapsed = 0
    boomTime = 0
    setFlagBomb(true)
  }

  if (boomElapsed !== 0) {
    boomTime =
      boomTime >= 0 ? (40 - boomElapsed.milliseconds() / 1000).toFixed(3) : 0
  }

  if (topBar.round.bombState.defuseTime !== '0' && flagDefuse) {
    Number(topBar.round.bombState.defuseTime) > 5
      ? setDefuseState(false)
      : setDefuseState(true)
    setFlagDefuse(false)
  }

  if (topBar.round.bombState.defuseTime === '0' && !flagDefuse) {
    setFlagDefuse(true)
  }

  const props = useSpring({
    left: topBar.round.bombState.defuseTime !== '0' ? '0.5vw' : '-18vw',
    right: topBar.round.bombState.defuseTime !== '0' ? '1vw' : '-18vw'
  })

  const mvpProps = useSpring({
    opacity: flagMVP ? '1' : '0',
    top: flagMVP ? '9vw' : '8vw'
  })

  let clockTimer = classNames({
    T: topBar.round.phase === 'over' && topBar.round.win_team === 'T' && true,
    CT:
      ((topBar.round.win_team === 'CT' && topBar.round.phase === 'over') ||
        topBar.round.phase === 'defuse') &&
      true,
    red:
      ((Number(topBar.round.time) <= 10 && topBar.round.phase === 'live') ||
        (topBar.round.phase === 'freezetime' &&
          Number(topBar.round.time) <= 10) ||
        topBar.round.phase === 'bomb') &&
      true,
    planted: topBar.round.phase === 'bomb' && true,
    defused: topBar.round.phase === 'defuse' && true
  })

  let bombBeep = classNames({
    show: (topBar.round.phase === 'bomb' || topBar.round.phase === 'defuse') && true,
  })

  return (
    <div className='top-bar-wrapper'>
      <div className='first-wrapper'>
        <div
          className='leftSide-wrapper'
          style={{ width: `calc(18vw + ${(biggest / 2) * 1.29}vw)` }}
        >
          <div
            className='primary-logo'
            style={{
              backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${leftLogo}/logo.webp)`
            }}
          ></div>
          <div
            className='secondary-logo'
            style={{
              backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${leftLogo}/logo.webp)`
            }}
          ></div>
          <p className='teamName font-tablet'>{topBar.leftSide.name}</p>
        </div>

        <div className='center-background'></div>
        <div
          className='center-wrapper'
          style={{
            backgroundImage: `url(${topBar.leftSide.sideTeam === 'CT'
              ? centerCounter
              : centerTerrorist
              })`
          }}
        >
          <div className='center'>
            <div className='leftScore-wrapper'>
              <p className={`leftSideRounds ${sideLeft} font-mont`}>
                {topBar.leftSide.score}
              </p>
            </div>
            <div className='timer-wrapper'>
              <div className={`clock font-mont ${clockTimer}`}>
                <p className='minutes'>
                  {timeSeconds === '00' && topBar.round.phase !== 'paused'
                    ? topBar.round.phase === 'bomb'
                      ? '0'
                      : '1'
                    : timeMinutes}
                </p>
                <p className='points'>:</p>
                <span className='seconds'>
                  <p className='first-Timesecond'>
                    {timeSeconds.toString().split('')[0]}
                  </p>
                  <p className='second-Timesecond'>
                    {timeSeconds.toString().split('')[1]}
                  </p>
                </span>
              </div>
              <div className={`image-bomb-planted ${bombBeep}`}></div>
              {timeTimer > 0 && phaseTimer === 'bomb' && (
                <Timer
                  type={phaseTimer}
                  timer={timeTimer}
                  style={{ opacity: phaseTimer === 'defuse' ? '0' : '1' }}
                />
              )}
              {timeTimer > 0 && phaseTimer === 'defuse' && (
                <Timer
                  type={phaseTimer}
                  timer={timeTimer}
                  style={{ opacity: phaseTimer === 'defuse' ? '1' : '0' }}
                />
              )}
              {timeTimer > 0 && (phaseTimer === 'T' || phaseTimer === 'CT') && (
                <Timer
                  type={phaseTimer}
                  timer={timeTimer}
                  style={{
                    opacity:
                      phaseTimer === 'CT' || phaseTimer === 'T' ? '1' : '0'
                  }}
                />
              )}
            </div>

            <div className='rightScore-wrapper'>
              <p className={`rightSideRounds ${sideRight} font-mont`}>
                {topBar.rightSide.score}
              </p>
            </div>
          </div>
        </div>

        <div
          className='rightSide-wrapper'
          style={{ width: `calc(18vw + ${(biggest / 2) * 1.29}vw)` }}
        >
          <div
            className='primary-logo'
            style={{
              backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${rightLogo}/logo.webp)`
            }}
          ></div>
          <div
            className='secondary-logo'
            style={{
              backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${rightLogo}/logo.webp)`
            }}
          ></div>
          <p className='teamName font-tablet'>{topBar.rightSide.name}</p>
        </div>
      </div>

      <div className='second-wrapper'>
        <div className='leftInfo-wrapper'>
          <div className='mapWins-wrapper'>
            {mapsToWin.map((map, index) => (
              <div
                className={`map ${map} ${sideLeft} ${leftWin > index ? 'win' : 'lose'
                  }`}
                key={index}
              ></div>
            ))}
          </div>

          <div className='status-match-wrapper'>
            {topBar.mapInfo.currentRound < 30 ||
              (topBar.mapInfo.currentRound === 30 &&
                topBar.leftSide.score !== topBar.rightSide.score) ? (
              <p className='current-status font-tablet'>{`ROUND ${topBar.mapInfo.currentRound + 1
                }/30`}</p>
            ) : (
              <p className='current-status font-tablet'>{`Round ${Number(
                (topBar.mapInfo.currentRound % 6) + 1
              )}/6 OT${Math.floor(
                (topBar.mapInfo.currentRound - 30) / 6 + 1
              )}`}</p>
            )}
          </div>
        </div>

        <div className='rightInfo-wrapper'>
          <div className='series-status-wrapper'>
            <p className='current-status font-tablet'>{`BEST OF ${topBar.mapInfo.bestOf}`}</p>
          </div>

          <div className='mapWins-wrapper'>
            {mapsToWin.map((map, index) => (
              <div
                className={`map ${map} ${sideRight} ${rightWin > index ? 'win' : 'lose'
                  }`}
                key={index}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <animated.div
        className={`defuse-wrapper row ${sideRight === 'CT' ? 'right' : 'left'
          }`}
        style={{
          right: sideRight === 'CT' ? props.right : 'unset',
          left: sideRight === 'CT' ? 'unset' : props.left
        }}
      >
        <video
          autoPlay={true}
          src={bomb}
          controls={false}
          loop={true}
          className='video-bomb'
        ></video>

        <div className='info-wrapper col'>
          <p className='defuse-time font-mont'>
            {Number(topBar.round.bombState.defuseTime).toFixed(3)}
          </p>

          <div className='bar-defuse-wrapper'>
            <div
              className='bar-defuse'
              style={{
                width:
                  calcDefusePerc(
                    defuseState,
                    Number(topBar.round.bombState.defuseTime).toFixed(3)
                  ) + '%'
              }}
            ></div>
          </div>
        </div>
      </animated.div>

      {topBar.mapInfo.currentRound > 0 && (
        <animated.div
          className='mvp-wrapper row'
          style={{ opacity: mvpProps.opacity, top: mvpProps.top }}
        >
          {test && (
            <div
              className={`side-image ${topBar.mapInfo.mvps[test].side}`}
            ></div>
          )}
          <div className='info-wrapper col'>
            {test && (
              <p
                className={`side font-tablet ${topBar.mapInfo.mvps[test].side} `}
              >
                {topBar.mapInfo.mvps[test].side === 'CT'
                  ? 'COUNTER TERRORISTS'
                  : 'TERRORISTS'}
              </p>
            )}
            <p className='win-txt font-tablet'>WIN THE ROUND</p>
            <span className='round-txt font-tablet'>
              ROUND MVP:
              {test && (
                <span className='player-txt'>
                  {' '}
                  {topBar.mapInfo.mvps[test].nickName}
                </span>
              )}
            </span>
          </div>
          <div
            className='player-photo'
            style={{ backgroundImage: `url(${picturePlayer})` }}
          ></div>
        </animated.div>
      )}
    </div>
  )
}
