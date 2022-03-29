import './Teams.scss'

import React from 'react'

export default function Teams({ data }) {
    return (
        <>
            <div className="left-team-wrapper">
                <div className="logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${data.leftSide.nameKey}/logo.webp)` }}></div>

                <div className='name-wrapper'>
                    <p className="team-name">{data.leftSide.name.toUpperCase()}</p>
                </div>
            </div>

            <div className="right-team-wrapper">
                <div className='name-wrapper'>
                    <p className="team-name">{data.rightSide.name.toUpperCase()}</p>
                </div>

                <div className="logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${data.rightSide.nameKey}/logo.webp)` }}></div>
            </div>
        </>
    )
}
