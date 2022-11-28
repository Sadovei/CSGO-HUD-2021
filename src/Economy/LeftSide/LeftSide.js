import './LeftSide.scss'

import Player from './Player/Player'
import React from 'react'
import imagesPlayer from '../../utils/imagesPlayer';

export default function LeftSide({ team, players, phase, dataEconomy }) {
    return (
        <div className="left-side-wrapper economy-hud">
            <div className={`left-center-wrapper ${team}`}>
                <div className="team-money-wrapper">
                    <p className="text-money font-tablet">TEAM MONEY</p>
                    <p className="money font-tablet">${dataEconomy.remaining_money}</p>
                </div>

                <div className="equipment-wrapper">
                    <p className="text-equipment font-tablet">EQUIPMENT MONEY</p>
                    <p className="equipment font-tablet">${dataEconomy.eq_value}</p>
                </div>
            </div>

            {Object.values(players).map((player, indexPlayer) => {
                let imgPlayer = imagesPlayer(player, phase);

                return <Player key={indexPlayer}
                    info={player}
                    team={team}
                    DefuseIMG={imgPlayer.DefuseIMG}
                    grenadeImg={imgPlayer.grenadeImg}
                    BombIMG={imgPlayer.BombIMG}
                    PistolIMG={imgPlayer.PistolIMG}
                    WeaponIMG={imgPlayer.WeaponIMG}
                    ammoFillAnim={imgPlayer.ammoFillAnim} />
            })}
        </div>
    )
}
