import React, { useEffect, useRef, useState } from 'react'
import TopBar from './TopBar/TopBar'
import VetoLegends from './VetoLegends/VetoLegends'
import pistolRoundVideo from '../../assets/videos/pistol_round.webm'
import plantedBombVideo from '../../assets/videos/bomb_planted.webm'
import classNames from 'classnames'
import { useSpring, animated } from 'react-spring'

export default function SmartTopBar({ topBarData }) {
  const videoRef = useRef(null)
  const [pistolRound, setPistolRound] = useState(false)
  const [bombPlanted, setBombPlanted] = useState(false)

  useEffect(() => {
    if (
      topBarData.mapInfo.currentRound === 0 ||
      topBarData.mapInfo.currentRound === 15
    )
      if (
        topBarData.round.phase === 'live' &&
        Number(topBarData.round.time) >= 114 &&
        !pistolRound
      ) {
        setPistolRound(true)
        videoRef.current.src = pistolRoundVideo
        videoRef.current.play()
      }
    if (
      topBarData.round.bomb === 'planted' &&
      !bombPlanted &&
      Number(topBarData.round.time) >= 40
    ) {
      setBombPlanted(true)
      videoRef.current.src = plantedBombVideo
      videoRef.current.play()
    }

    if (pistolRound || bombPlanted) {
      setTimeout(() => {
        setPistolRound(false)
        setBombPlanted(false)
      }, 5000)
    }
    return null
  }, [
    bombPlanted,
    pistolRound,
    topBarData.mapInfo.currentRound,
    topBarData.round.bomb,
    topBarData.round.phase,
    topBarData.round.time
  ])

  let timeOut = classNames({
    CT: topBarData.round.phase === 'timeout_ct' && true,
    T: topBarData.round.phase === 'timeout_t' && true
  })

  const mvpProps = useSpring({
    opacity:
      topBarData.round.phase === 'timeout_t' ||
      topBarData.round.phase === 'timeout_ct'
        ? '1'
        : '0',
    top:
      topBarData.round.phase === 'timeout_t' ||
      topBarData.round.phase === 'timeout_ct'
        ? '15%'
        : '14%'
  })

  return (
    <>
      <TopBar topBar={topBarData} />
      <VetoLegends
        vetoInfo={topBarData.mapInfo.vetoLegend}
        phase={topBarData.round.phase}
        topBar={topBarData}
      />
      <video
        ref={videoRef}
        className={`video-start ${pistolRound ? 'pistol' : 'bomb'}`}
        controls={false}
        muted={true}
      ></video>

      <animated.div
        className={`timeOut-wrapper ${timeOut} font-tablet`}
        style={{ opacity: mvpProps.opacity, top: mvpProps.top }}
      >
        <div className='logo'></div>
        <p className={`text-side ${timeOut}`}>
          {timeOut === 'CT' ? `COUNTER TERRORIST ` : `TERRORIST `}{' '}
        </p>
        {timeOut === 'CT' && (
          <p className='text font-mont'>
            {4 -
              (topBarData.leftSide.sideTeam === 'CT'
                ? topBarData.leftSide.timeouts_remaining
                : topBarData.rightSide.timeouts_remaining)}
            /4
          </p>
        )}
        {timeOut === 'T' && (
          <p className='text font-mont'>
            {4 -
              (topBarData.leftSide.sideTeam === 'T'
                ? topBarData.leftSide.timeouts_remaining
                : topBarData.rightSide.timeouts_remaining)}
            /4
          </p>
        )}
      </animated.div>
    </>
  )
}
