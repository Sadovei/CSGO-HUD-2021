import React from 'react'
import Player from './Player/Player'
import './LeftSide.scss'

export default function LeftSide({ team, players }) {
    return (
        <div className="left-side-wrapper">
            {Object.values(players).map((player, indexPlayer) =>
                <Player key={indexPlayer}
                    info={player}
                    team={team} />)}
        </div>
    )
}
