import './TeamLogo.scss'

import React from 'react'

export default function TeamLogo({ data }) {
    return (
        <>
            <div className="left-team-wrapper">
                <div className="logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${data.leftSide.nameKey}/logo.webp)` }}></div>
                <p className="team-name font-tablet">{data.leftSide.name.toUpperCase()}</p>
            </div>

            <div className="right-team-wrapper">
                <p className="team-name font-tablet">{data.rightSide.name.toUpperCase()}</p>
                <div className="logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${data.rightSide.nameKey}/logo.webp)` }}></div>
            </div>
        </>
    )
}
