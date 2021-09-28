import React from 'react'
import './TeamLogo.scss'

export default function TeamLogo({ data }) {
    return (
        <>
            <div className="left-team-wrapper">
                <div className="logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${data.leftSide.nameKey}/logo_oog.webp)` }}></div>
                <p className="team-name font-tablet">{data.leftSide.name}</p>
            </div>

            <div className="right-team-wrapper">
                <p className="team-name font-tablet">{data.rightSide.name}</p>
                <div className="logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${data.rightSide.nameKey}/logo_oog.webp)` }}></div>
            </div>
        </>
    )
}
