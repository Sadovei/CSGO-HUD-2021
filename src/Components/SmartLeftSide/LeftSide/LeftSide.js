import './LeftSide.scss'

import Player from './Player/Player'
import React from 'react'

export default function LeftSide({ team, players }) {
    return (
        <div className="left-side-wrapper">
            {Object.values(players).map((player, indexPlayer) =>
                <Player key={indexPlayer} info={player} team={team} />
            )}
        </div>
    )
}