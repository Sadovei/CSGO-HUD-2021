import React from 'react'
import './Player.scss'

export default function Player({ info, team, DefuseIMG, grenadeImg, BombIMG, PistolIMG, WeaponIMG, ammoFillAnim }) {
    return (
        <div className={`right-player-wrapper row slot-${info.observer_slot} ${team} ${info.state.health === 0 ? 'death' : 'alive'} ${info.active ? 'pov' : ''}`}>
            <div className="weapons-wrapper row">
                {PistolIMG}
                {ammoFillAnim}
                {WeaponIMG}
            </div>

            <div className="utils-wrapper row">
                {DefuseIMG}
                {grenadeImg}
                {BombIMG}
            </div>

            <div className="money-wrapper font-tablet">
                <p className={`money-number ${team}`}>${info.state.money}</p>
            </div>

            <div className="first-box row">
                <p className="player-name font-tablet">{info.namePlayer}</p>
            </div>
        </div >
    )
}
