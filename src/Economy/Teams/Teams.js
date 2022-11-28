import './Teams.scss'

import React from 'react'
import { redisIP } from '../../utils/tools'

export default function Teams({ data }) {
    return (
        <>
            <div className="left-team-wrapper">
                <div className="logo" style={{ backgroundImage: `url(http://${redisIP}/pgl/resources/csgo/team/${data.leftSide.nameKey}/logo.webp)` }}></div>

                <div className='name-wrapper'>
                    <p className="team-name">{data.leftSide.name.toUpperCase()}</p>
                </div>

                <div className='score-wrapper'>
                    <p className="score">{data.leftSide.score}</p>
                </div>
            </div>

            <div className="right-team-wrapper">
                <div className='score-wrapper'>
                    <p className="score">{data.rightSide.score}</p>
                </div>

                <div className='name-wrapper'>
                    <p className="team-name">{data.rightSide.name.toUpperCase()}</p>
                </div>

                <div className="logo" style={{ backgroundImage: `url(http://${redisIP}/pgl/resources/csgo/team/${data.rightSide.nameKey}/logo.webp)` }}></div>
            </div>
        </>
    )
}
