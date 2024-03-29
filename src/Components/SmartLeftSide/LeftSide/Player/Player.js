import './Player.scss'

import React, { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

export default function Player({
  info,
  team,
  DefuseIMG,
  grenadeImg,
  BombIMG,
  PistolIMG,
  WeaponIMG,
  ammoFillAnim
}) {
  let picturePlayer = `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${info.teamKey}/${info.nameKey}.webp`
  let armor = classNames({
    helmet: info.state.helmet && true,
    armor: !info.state.helmet && info.state.armor !== 0 && true
  })
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

  return (
    <div
      className={`left-player-wrapper row slot-${info.observer_slot} ${team} ${info.state.health === 0 ? 'death' : 'alive'
        } ${info.active ? 'pov' : ''}`}
    >
      <div className='main-info-wrapper font-tablet row'>
        <div className='number-wrapper row'>
          <p className='number-slot'>{info.observer_slot}</p>
        </div>

        <div className='image-player-wrapper'>
          <div
            className='image-player'
            style={{
              backgroundImage: `url(${picturePlayer})`,
              filter:
                info.state.health === 0
                  ? 'grayscale(100%)'
                  : info.state.flashed / 51 < 1
                    ? 'brightness(1)'
                    : `brightness(${info.state.flashed / 51}`
            }}
          ></div>
        </div>

        <div className='heal-wrapper col'>
          <p className={`heal-number ${info.state.health <= 20 ? 'red' : ''}`}>
            {info.state.health}
          </p>
          <div className={`armor-image ${armor}`}></div>
        </div>
      </div>

      <div className='secondary-info-wrapper col font-mont'>
        <div className='first-line-wrapper row'>
          <div className='first-box row'>
            <p className='player-name'>{info.namePlayer}</p>
          </div>

          <div className='second-box row'>
            <div className='kills-wrapper row'>
              <p className='kills-notice'>K</p>
              <p className={`kills-number`}>{info.match_stats.kills}</p>
            </div>
            <div className='assists-wrapper row'>
              <p className='assists-notice'>A</p>
              <p className={`assists-number`}>{info.match_stats.assists}</p>
            </div>
            <div className='death-wrapper row'>
              <p className='death-notice'>D</p>
              <p className={`death-number`}>{info.match_stats.deaths}</p>
            </div>

            <div
              className={`round-kills row ${info.state.round_kills > 0 ? 'live' : ''
                }`}
            >
              <div className='death-image'></div>
              <p className='kills-notice'>x</p>
              <span className='kills-round-number row'>
                {info.state.round_kills}
              </span>
            </div>
          </div>
        </div>

        <div className='second-line-wrapper'>
          <div className='heal-life-wrapper row'>
            <div
              className={`heal-bar`}
              style={{ width: `${info.state.health}%` }}
            ></div>
            <div
              className='dmg'
              style={{
                transitionDelay: flagDmg ? '0' : '1s',
                transition: flagDmg ? '' : 'width 800ms ease-out',
                width: prevHeal + '%'
              }}
            ></div>
          </div>
        </div>

        <div className='third-line-wrapper row'>
          <div className='money-wrapper font-tablet'>
            <p className='money-number'>${info.state.money}</p>
          </div>

          <div className='utils-wrapper row'>
            {DefuseIMG}
            {grenadeImg}
          </div>

          <div className='weapons-wrapper row'>
            {BombIMG}
            {PistolIMG}
            {ammoFillAnim}
            {WeaponIMG}
          </div>
        </div>

        <div className='death-info col'>
          <div className='first-box'>
            <p className='player-name'>{info.namePlayer}</p>

            <div className='stats-player row'>
              <div className='kills-wrapper row'>
                <p className='kills-notice'>K</p>
                <p className={`kills-number`}>{info.match_stats.kills}</p>
              </div>
              <div className='assists-wrapper row'>
                <p className='assists-notice'>A</p>
                <p className={`assists-number`}>{info.match_stats.assists}</p>
              </div>
              <div className='death-wrapper row'>
                <p className='death-notice'>D</p>
                <p className={`death-number`}>{info.match_stats.deaths}</p>
              </div>

              <div
                className={`round-kills row ${info.state.round_kills > 0 ? 'live' : ''
                  }`}
              >
                <div className='death-image'></div>
                <p className='kills-notice'>x</p>
                <span className='kills-round-number row'>
                  {info.state.round_kills}
                </span>
              </div>

            </div>
          </div>

          <div className="second-box row">
            <div className='money-wrapper font-tablet'>
              <p className='money-number'>${info.state.money}</p>
            </div>

            <div className='adr-wrapper row'>
              <p className='adr-notice'>DMG</p>
              <p className='adr-number'>{info.adr}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
