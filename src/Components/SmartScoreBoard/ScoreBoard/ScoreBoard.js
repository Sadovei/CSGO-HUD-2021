import React from 'react'
import './ScoreBoard.scss'
import { useSpring, animated } from 'react-spring'

export default function ScoreBoard({ data }) {
    let leftLogo = `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${data.leftSide.teamKey}/logo.webp`
    let rightLogo = `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${data.rightSide.teamKey}/logo.webp`
    return (
        <animated.div className="scoreBoard-wrapper row"
            style={{ bottom: props.bottom }}>

            <div className="leftSide-players-wrapper col font-mont">
                <div className="logo" style={{ backgroundImage: `url(${leftLogo})` }}></div>
                {
                    data.leftSide.players.map((player, indexPlayer) => {
                        return (
                            <div className="player col" key={indexPlayer}>
                                <p className="nickname">{player.nickName}</p>
                                <p className="name">{player.name}</p>
                            </div>
                        )
                    })
                }
            </div>

            <div className="leftSide-hs-wrapper col">
                <p className="title font-mont">HS%</p>
                {
                    data.leftSide.players.map((player, indexPlayer) => {
                        return (
                            <p className="hs-percentage font-tablet" key={indexPlayer}>{player.hs.toFixed(1)}%</p>
                        )
                    })
                }
            </div>

            <div className="adr-wrapper col">
                <p className="title font-mont">ADR</p>

                <div className="adr-data row">
                    <div className="leftBar-wrapper col">
                        {
                            data.rightSide.players.map((player, indexPlayer) => {
                                return (
                                    <div className="adr-bar" key={indexPlayer}>
                                        <p className="adr font-tablet">{player.adr}</p>
                                        <div className="adr-gradient" style={{ width: `${player.adr * 92.5 / data.adr}%` }}></div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="rightBar-wrapper col">
                        {
                            data.rightSide.players.map((player, indexPlayer) => {
                                return (
                                    <div className="adr-bar" key={indexPlayer}>
                                        <p className="adr font-tablet" key={indexPlayer}>{player.adr}</p>
                                        <div className="adr-gradient" style={{ width: `${player.adr * 92.5 / data.adr}%` }}></div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>

            <div className="rightSide-hs-wrapper col">
                <p className="title font-mont">HS%</p>
                {
                    data.rightSide.players.map((player, indexPlayer) => {
                        return (
                            <p className="hs-percentage font-tablet" key={indexPlayer}>{player.hs.toFixed(1)}%</p>
                        )
                    })
                }
            </div>

            <div className="rightSide-players-wrapper col">
                <div className="logo" style={{ backgroundImage: `url(${rightLogo})` }}></div>
                {
                    data.rightSide.players.map((player, indexPlayer) => {
                        return (
                            <div className="player col font-mont" key={indexPlayer}>
                                <p className="nickname">{player.nickName}</p>
                                <p className="name">{player.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </animated.div>
    )
}
