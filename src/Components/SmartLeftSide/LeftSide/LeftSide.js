import './LeftSide.scss'

import Player from './Player/Player'
import React from 'react'
import imagesPlayer from '../../../utils/imagesPlayer';

export default function LeftSide({ team, players, phase }) {
    return (
        <div className="left-side-wrapper">
            {Object.values(players).map((player, indexPlayer) => {
                let elementsPlayer = imagesPlayer(player.weapons, player.state, player.observer_slot, phase)

                return < Player key={indexPlayer}
                    info={player}
                    team={team}
                    DefuseIMG={elementsPlayer.DefuseIMG}
                    grenadeImg={elementsPlayer.grenadeImg}
                    BombIMG={elementsPlayer.BombIMG}
                    PistolIMG={elementsPlayer.PistolIMG}
                    WeaponIMG={elementsPlayer.WeaponIMG}
                    ammoFillAnim={elementsPlayer.ammoFillAnim} />
            }
            )}
        </div>
    )
}