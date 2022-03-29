import './RightSide.scss'

import Player from './Player/Player'
import React from 'react'
import imagesPlayer from '../../utils/imagesPlayer';

export default function RightSide({ team, players, phase, dataEconomy }) {
    let elementsPlayer = []
    Object.values(players).forEach(element => {
        elementsPlayer.push(imagesPlayer(element, phase))
    });

    return (
        <div className="right-side-wrapper">
            <div className={`right-center-wrapper ${team}`}>
                <div className="team-money-wrapper">
                    <p className="money font-tablet">${dataEconomy.remaining_money}</p>
                    <p className="text-money font-tablet">TEAM MONEY</p>
                </div>

                <div className="equipment-wrapper">
                    <p className="equipment font-tablet">${dataEconomy.eq_value}</p>
                    <p className="text-equipment font-tablet">EQUIPMENT MONEY</p>
                </div>
            </div>

            {Object.values(players).map((player, indexPlayer) =>
                <Player key={indexPlayer}
                    info={player}
                    team={team}
                    DefuseIMG={elementsPlayer[indexPlayer].DefuseIMG}
                    grenadeImg={elementsPlayer[indexPlayer].grenadeImg}
                    BombIMG={elementsPlayer[indexPlayer].BombIMG}
                    PistolIMG={elementsPlayer[indexPlayer].PistolIMG}
                    WeaponIMG={elementsPlayer[indexPlayer].WeaponIMG}
                    ammoFillAnim={elementsPlayer[indexPlayer].ammoFillAnim} />)}
        </div>
    )
}
