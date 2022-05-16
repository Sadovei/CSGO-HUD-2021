import './Player.scss'

import React, { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'
import { redisIP } from '../../../../utils/tools'

export default function Player({
  info,
  team,
  DefuseIMG,
  grenadeImg,
  BombIMG,
  PistolIMG,
  WeaponIMG,
  Taser,
  showADR,
  ammoFillAnim
}) {
  const [prevHeal, setPrevHeal] = useState(100)
  const [flagDmg, setFlagDmg] = useState(false)
  const updateStart = useRef(null)

  useEffect(() => {
    if (info.state.health !== prevHeal) {
      setFlagDmg(true)
      updateStart.current = setTimeout(() => {
        setPrevHeal(info.state.health)
        updateStart.current = null
      }, 1000)
      setFlagDmg(false)
    }
    return null
  }, [info.state.health, prevHeal])

  let armor = classNames({
    helmet: info.state.helmet,
    armor: !info.state.helmet && info.state.armor !== 0
  })

  let lowHealthArmor = classNames({
    lowHealth: info.state.health < 25,
  })

  let lowHealth = classNames({
    lowHealth: info.state.health < 5,
  })

  return (
    <div className={`left-player-wrapper row slot-${info.observer_slot} ${team} ${info.state.health === 0 ? 'death' : 'alive'}${info.active ? ' pov' : ''}`}>
      <div className='numberSlot-wrapper'>
        <p className='numberSlot'>{info.observer_slot}</p>
      </div>

      <div className='contentPlayer-wrapper'>
        <div className='firstContentPlayer-wrapper row'>
          <div className='playerImage-wrapper'>
            <div className='playerImage' alt='' style={{
              backgroundImage: `url(http://${redisIP}/pgl/resources/csgo/team/${info.teamKey}/${info.playerKey}.webp)`,
              filter: info.state.health === 0
                ? 'grayscale(100%)'
                : info.state.flashed / 51 < 1
                  ? 'brightness(1)'
                  : `brightness(${info.state.flashed / 51}`
            }}>
            </div>
          </div>

          <div className='infoPlayer-wrapper col'>
            <div className='firstRow-wrapper row'>
              <p className='playerName'>{info.playerName}</p>

              <div className='aliveInfo-wrapper row'>
                <div className='kills-wrapper row'>
                  <div className='killsImage'></div>
                  <p className='kills'>{info.match_stats.kills}</p>
                </div>

                <div className='death-wrapper row'>
                  <div className='deathImage'></div>
                  <p className='death'>{info.match_stats.deaths}</p>
                </div>
              </div>
            </div>

            <div className='secondRow-wrapper row'>
              <div className='money-wrapper row'>
                <p className='moneyFirst'>${Math.floor(info.state.money / 1000) !== 0 && Math.floor(info.state.money / 1000)}</p>
                <p className='moneySecond'>{info.state.money > 0 ?
                  (Math.floor(info.state.money / 1000) > 0 ?
                    (String(info.state.money % 1000).padStart(3, '0')) : info.state.money % 1000) : '0'}</p>
              </div>

              <div className={`currentKills-wrapper row ${info.state.round_kills > 0 ? 'live' : ''}`}>
                <div className='killsImage'></div>
                <span className='currentKills'>{info.state.round_kills}</span>
              </div>

              <div className='utils-wrapper row'>
                {DefuseIMG}
                {BombIMG}
                {grenadeImg}
              </div>

              <div className='deathInfo-wrapper row'>
                <div className='kills-wrapper row'>
                  <div className='killsImage'></div>
                  <p className='kills'>{info.match_stats.kills}</p>
                </div>

                <div className='death-wrapper row'>
                  <div className='deathImage'></div>
                  <p className='death'>{info.match_stats.deaths}</p>
                </div>
              </div>
            </div>

            <div className='thirdRow-wrapper row'>
              <div className={`currentKills-wrapper row ${info.state.round_kills > 0 ? 'live' : ''}`}>
                <div className='killsImage'></div>
                <span className='currentKills'>{info.state.round_kills}</span>
              </div>

              <div className={`adr-wrapper row ${showADR}`}>
                <p className='adr-notice'>ADR</p>
                <p className='adr-number'>{info.adr}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='secondContentPlayer-wrapper row'>
          <div className='healInfo-wrapper row'>
            <div className={`healImage ${lowHealth}`}></div>
            <p className={`healNumber ${info.state.health <= 25 ? 'red' : ''}`}>
              {info.state.health}
            </p>
            <div className={`armorImage ${armor} ${lowHealthArmor}`}></div>
          </div>
          <div className='weapon-wrapper row'>
            {ammoFillAnim}
            {Taser}
            {PistolIMG}
            {WeaponIMG}
          </div>

          <div className={`healBar ${info.state.health === 100 ? 'fullHeal' : ''}`} style={{
            width: `${info.state.health}%`,
            transitionDelay: flagDmg ? '0' : '1s',
            transition: flagDmg ? '' : 'width 800ms ease-out',
          }}></div>

          <div className={`dmg ${info.state.health === 100 ? 'fullHeal' : ''}`} style={{
            transitionDelay: flagDmg ? '0' : '1s',
            transition: flagDmg ? '' : 'width 800ms ease-out',
            width: prevHeal + '%'
          }}></div>
        </div>
      </div>

      <div className='bk-player'></div>
      <div className='border-player'></div>
    </div >
  )
}
