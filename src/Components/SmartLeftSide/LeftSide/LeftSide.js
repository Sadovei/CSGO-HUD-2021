import React from 'react'
import imagesPlayer from '../../../utils/imagesPlayer';
import Player from './Player/Player'
import './LeftSide.scss'

export default function LeftSide({ team, players, phase }) {
    let elementsPlayer = []
    Object.values(players).forEach(element => {
        elementsPlayer.push(imagesPlayer(element, phase))
    });
    return (
        <div className="left-side-wrapper">
            {Object.values(players).map((player, indexPlayer) =>
                <Player key={indexPlayer}
                    info={player}
                    team={team}
                    DefuseIMG={elementsPlayer[indexPlayer].DefuseIMG}
                    grenadeImg={elementsPlayer[indexPlayer].grenadeImg}
                    BombIMG={elementsPlayer[indexPlayer].BombIMG}
                    PistolIMG={elementsPlayer[indexPlayer].PistolIMG}
                    WeaponIMG={elementsPlayer[indexPlayer].WeaponIMG}
                    ammoFillAnim={elementsPlayer[indexPlayer].ammoFillAnim}/>)}
        </div>
    )
}
