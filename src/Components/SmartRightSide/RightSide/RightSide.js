import React from 'react'
import imagesPlayer from '../../../utils/imagesPlayer';
import Player from './Player/Player'
import './RightSide.scss'

export default function RightSide({ team, players }) {
    let test = []
    Object.values(players).forEach(element => {
        test.push(imagesPlayer(element))
    });
    return (
        <div className="right-side-wrapper">
            {Object.values(players).map((player, indexPlayer) =>
                <Player key={indexPlayer}
                    info={player}
                    team={team}
                    DefuseIMG={test[indexPlayer].DefuseIMG}
                    grenadeImg={test[indexPlayer].grenadeImg}
                    BombIMG={test[indexPlayer].BombIMG}
                    PistolIMG={test[indexPlayer].PistolIMG}
                    WeaponIMG={test[indexPlayer].WeaponIMG}
                    ammoFillAnim={test[indexPlayer].ammoFillAnim} />)}
        </div>
    )
}
