import React from 'react'
import './ScoreBoard.scss'
import { useSpring, animated } from 'react-spring'

let scoreboardData

export default function ScoreBoard({ data, action }) {
    if (action === 'show') {
        scoreboardData = data
    }

    let leftLogo = `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${scoreboardData?.leftSide.teamKey}/logo.webp`
    let rightLogo = `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${scoreboardData?.rightSide.teamKey}/logo.webp`

    const props = useSpring({
        bottom: action === 'show' ? '1.1vw' : '-25vw'
    })

    return (
        <animated.div className="scoreBoard-wrapper row"
            style={{ bottom: props.bottom }}>

            <div className="leftSide-players-wrapper col font-mont">
                <div className="logo" style={{ backgroundImage: `url(${leftLogo})` }}></div>
                {
                    scoreboardData?.leftSide.players.map((player, indexPlayer) => {
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
                    scoreboardData?.leftSide.players.map((player, indexPlayer) => {
                        return (
                            <p className="hs-percentage font-tablet" key={indexPlayer}>{player.hs}%</p>
                        )
                    })
                }
            </div>

            <div className="adr-wrapper col">
                <p className="title font-mont">ADR</p>

                <div className="adr-data row">
                    <div className="leftBar-wrapper col">
                        {
                            scoreboardData?.rightSide.players.map((player, indexPlayer) => {
                                return (
                                    <div className="adr-bar" key={indexPlayer}>
                                        <p className="adr font-tablet">{player.adr}</p>
                                        <div className="adr-gradient" style={{ width: `${player.adr * 92.5 / scoreboardData.adr}%` }}></div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="rightBar-wrapper col">
                        {
                            scoreboardData?.rightSide.players.map((player, indexPlayer) => {
                                return (
                                    <div className="adr-bar" key={indexPlayer}>
                                        <p className="adr font-tablet" key={indexPlayer}>{player.adr}</p>
                                        <div className="adr-gradient" style={{ width: `${player.adr * 92.5 / scoreboardData.adr}%` }}></div>
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
                    scoreboardData?.rightSide.players.map((player, indexPlayer) => {
                        return (
                            <p className="hs-percentage font-tablet" key={indexPlayer}>{player.hs}%</p>
                        )
                    })
                }
            </div>

            <div className="rightSide-players-wrapper col">
                <div className="logo" style={{ backgroundImage: `url(${rightLogo})` }}></div>
                {
                    scoreboardData?.rightSide.players.map((player, indexPlayer) => {
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
