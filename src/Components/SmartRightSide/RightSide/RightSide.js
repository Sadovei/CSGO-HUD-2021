import React from 'react'
import Player from './Player/Player'
import './RightSide.scss'

export default function RightSide({ team, players }) {
    return (
        <div className="right-side-wrapper">
            {Object.values(players).map((player, indexPlayer) =>
                <Player key={indexPlayer}
                    info={player}
                    team={team} />)}
        </div>
    )
}
