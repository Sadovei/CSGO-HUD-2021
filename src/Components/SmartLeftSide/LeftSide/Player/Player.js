import './Player.scss'

import React from 'react'
import classNames from 'classnames'

export default function Player({ info, team }) {

  let armor = classNames({
    helmet: info.state.helmet,
    armor: !info.state.helmet && info.state.armor !== 0
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
              backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${info.teamKey}/${info.playerKey}.webp)`,
              filter: info.state.health === 0
                ? 'grayscale(100%)'
                : info.state.flashed / 51 < 1
                  ? 'brightness(1)'
                  : `brightness(${info.state.flashed / 51}`
            }}>
            </div>
          </div>
        </div>

        <div className='secondContentPlayer-wrapper row'>
          <div className='healInfo-wrapper row'>
            <div className={`healImage`}></div>

            <p className={`healNumber ${info.state.health <= 20 ? 'red' : ''}`}>{info.state.health}</p>
            
            <div className={`armorImage ${armor}`}></div>
          </div>
        </div>
      </div>

      <div className='bk-player'></div>
    </div >
  )
}
