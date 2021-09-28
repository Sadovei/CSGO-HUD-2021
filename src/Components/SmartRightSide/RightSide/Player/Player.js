import React from 'react'
import './Player.scss'

export default function Player({ info, team, DefuseIMG, grenadeImg, BombIMG, PistolIMG, WeaponIMG, ammoFillAnim }) {
    let picturePlayer = `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${info.teamKey}/${info.nameKey}.webp`

    return (
        <div className={`right-player-wrapper row slot-${info.observer_slot} ${team} ${info.state.health === 0 ? 'death' : 'alive'} ${info.active ? 'pov' : ''}`}>
            <div className="main-info-wrapper font-tablet">
                <div className="image-player" style={{ backgroundImage: `url(${picturePlayer})`, filter: info.state.health === 0 ? 'grayscale(100%)' : (info.state.flashed / 51) < 1 ? 'brightness(1)' : `brightness(${info.state.flashed / 51}` }}></div>

                <div className="number-wrapper row">
                    <p className="number-slot">{info.observer_slot}</p>
                </div>
            </div>
        </div >
    )
}
