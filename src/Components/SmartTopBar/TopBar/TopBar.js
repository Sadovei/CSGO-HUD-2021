import './TopBar.scss'

import React, { useEffect, useRef, useState } from 'react'

import bombPlanted from '../../../assets/videos/bombPlanted.webm'
import { calcDefusePerc } from './TopBarStore'
import classNames from 'classnames'
import onFire from '../../../assets/videos/on_fire.webm'

export default function TopBar({ topBar }) {
  const [biggestName, setBiggestName] = useState(0);
  const defuseState = useRef(false)
  const videoRef = useRef()
  const videoRefOnFire = useRef()
  
  // Set width of TopBar by Names of Teams
  useEffect(() => {
    if (topBar.leftSide.name.length > topBar.rightSide.name.length) {
      setBiggestName(topBar.leftSide.name.length);
    } else
      setBiggestName(topBar.rightSide.name.length);
  }, [topBar.leftSide.name, topBar.rightSide.name]);

  //Bomb Planted Video
  useEffect(() => {
    if (topBar.round.phase === 'bomb') {
      videoRef.current.src = bombPlanted
      videoRef.current.play()
    }

    if (topBar.round.phase === "defuse") {
      Number(topBar.round.time) > 5
        ? defuseState.current = false
        : defuseState.current = true
    }
  }, [topBar.round.phase]);

  //Team OnFire
  useEffect(() => {
    if (topBar.mapInfo.teamOnFire !== 'none') {
      videoRefOnFire.current.src = onFire
      videoRefOnFire.current.play()
    }
  }, [topBar.mapInfo.teamOnFire]);

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

  let clockTimer = classNames({
    T: topBar.round.phase === 'over' && topBar.round.win_team === 'T',
    CT:
      ((topBar.round.win_team === 'CT' && topBar.round.phase === 'over') ||
        topBar.round.phase === 'defuse') &&
      true,
    red:
      ((Number(topBar.round.time) <= 10 && topBar.round.phase === 'live') ||
        (topBar.round.phase === 'freezetime' &&
          Number(topBar.round.time) <= 10) ||
        topBar.round.phase === 'bomb') &&
      true
  })

  let sideLeft = classNames({
    CT: topBar.leftSide.sideTeam === 'CT',
    T: topBar.leftSide.sideTeam === 'T'
  })

  let sideRight = classNames({
    CT: topBar.rightSide.sideTeam === 'CT',
    T: topBar.rightSide.sideTeam === 'T'
  })

  let flameSide = classNames({
    right: topBar.rightSide.sideTeam === topBar.mapInfo.teamOnFire,
    left: topBar.leftSide.sideTeam === topBar.mapInfo.teamOnFire
  })

  return (
    <div className='topBar row'>
      <div className='leftSide-wrapper row'>
        <div className='teamLogo' style={{
          backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${leftLogo}/logo.webp)`
        }}></div>

        <div className='teamName' style={{ width: `${biggestName}vw` }}>{topBar.leftSide.name}</div>
      </div>

      <div className='centerSide-wrapper row'>
        <div className={`leftScore-wrapper ${sideLeft}`}>
          <p className='score'>{topBar.leftSide.score}</p>
        </div>

        <div className={`time-wrapper ${clockTimer}`}>
          {(topBar.round.phase !== 'bomb' && topBar.round.phase !== 'defuse') &&
            <div className='time row'>
              <p className='minutes'>
                {timeSeconds === '00' && topBar.round.phase !== 'paused'
                  ? topBar.round.phase === 'bomb'
                    ? '0'
                    : '1'
                  : timeMinutes}
              </p>

              <p className='points'>:</p>

              <span className='seconds row'>
                <p className='firstTimeSecond'>
                  {timeSeconds.toString().split('')[0]}
                </p>

                <p className='secondTimeSecond'>
                  {timeSeconds.toString().split('')[1]}
                </p>
              </span>
            </div>
          }
          <video ref={videoRef}
            className={`bombPlanted ${(topBar.round.phase === 'bomb' || topBar.round.phase === 'defuse') ? 'show' : 'hide'}`}
            controls={false}
            muted={true}
            loop={true}>
          </video>
        </div>

        <div className={`rightScore-wrapper ${sideRight}`}>
          <p className='score'>{topBar.rightSide.score}</p>
        </div>
      </div>

      <div className='rightSide-wrapper row'>
        <div className='teamName' style={{ width: `${biggestName}vw` }}>{topBar.rightSide.name}</div>

        <div className='teamLogo' style={{
          backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${rightLogo}/logo.webp)`
        }}></div>
      </div>

      <video ref={videoRefOnFire}
        className={`onFire ${flameSide}`}
        controls={false}
        autoPlay={true}
        muted={true}
        loop={true}>
      </video>

      <div className='bombTime-wrapper row'>
        <div className='leftSideTime-wrapper'>
          {sideLeft === 'CT' ?
            <div className='defuse' style={{ width: calcDefusePerc(defuseState.current, Number(topBar.round.bombState).toFixed(3)) + '%' }}></div> :
            <div className={`bomb ${(topBar.round.phase === 'bomb' || topBar.round.phase === 'defuse') && 'show'}`}></div>}
        </div>

        <div className='rightSideTime-wrapper'>
          {sideRight === 'CT' ?
            <div className='defuse' style={{ width: calcDefusePerc(defuseState.current, Number(topBar.round.bombState).toFixed(3)) + '%' }}></div> :
            <div className={`bomb ${(topBar.round.phase === 'bomb' || topBar.round.phase === 'defuse') && 'show'}`}></div>}
        </div>
      </div>
    </div >
  )
}
