import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import './Player.scss'

export default function Player({ info, team, DefuseIMG, grenadeImg, BombIMG, PistolIMG, WeaponIMG, ammoFillAnim }) {
    let picturePlayer = `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${info.teamKey}/${info.nameKey}.png`
    let armor = classNames({
        'helmet': info.state.helmet && true,
        'armor': !info.state.helmet && info.state.armor !== 0 && true
    })

    const [prevHeal, setPrevHeal] = useState(100)
    const [flagDmg, setFlagDmg] = useState(false)
    const updateStart = useRef(null);

    useEffect(() => {
        if (info.state.health !== prevHeal) {
            setFlagDmg(true)
            updateStart.current = setTimeout(() => {
                setPrevHeal(info.state.health);
                updateStart.current = null;
            }, 1000);
            setFlagDmg(false)
        }
    }, [info.state.health, prevHeal])

    return (
        <div className={`left-player-wrapper slot-${info.observer_slot} ${team} ${info.state.health === 0 ? 'death' : 'alive'} ${info.active ? 'pov' : ''}`}>
            <div className="main-info-wrapper font-tablet">
                <div className="number-wrapper">
                    <p className="number-slot">{info.observer_slot}</p>
                </div>

                <div className="image-player" style={{ backgroundImage: `url(${picturePlayer})` }}></div>

                <div className="heal-wrapper">
                    <p className="heal-number">{info.state.health}</p>
                    <div className={`armor-image ${armor}`}></div>
                </div>
            </div>

            <div className="secondary-info-wrapper font-mont">
                <div className="first-line-wrapper">
                    <div className="first-box">
                        <p className="player-name">{info.namePlayer}</p>
                    </div>

                    <div className="second-box">
                        <div className="kills-wrapper">
                            <p className="kills-notice">K</p>
                            <p className={`kills-number`}>{info.match_stats.kills}</p>
                        </div>
                        <div className="assists-wrapper">
                            <p className="assists-notice">A</p>
                            <p className={`assists-number`}>{info.match_stats.deaths}</p>
                        </div>
                        <div className="death-wrapper">
                            <p className="death-notice">D</p>
                            <p className={`death-number`}>{info.match_stats.assists}</p>
                        </div>

                        <div className={`round-kills ${info.state.round_kills > 0 ? 'live' : ''}`}>
                            <div className="death-image"></div>
                            <span className={`kills-round-number`}>
                                {info.state.round_kills}
                                <p className="kills-notice">/5</p>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="second-line-wrapper">
                    <div className="heal-life-wrapper">
                        <div className={`heal-bar`} style={{ width: `${info.state.health}%` }}></div>
                        <div className="dmg" style={{
                            transitionDelay: flagDmg ? "0" : "1s",
                            transition: flagDmg ? "" : "width 800ms ease-out",
                            width: prevHeal + "%"
                        }}></div>
                    </div>
                </div>

                <div className="third-line-wrapper">
                    <div className="money-wrapper font-tablet">
                        <p className="money-number">${info.state.money}</p>
                    </div>

                    <div className="utils-wrapper">
                        {DefuseIMG}
                        {grenadeImg}
                    </div>

                    <div className="weapons-wrapper">
                        {BombIMG}
                        {PistolIMG}
                        {ammoFillAnim}
                        {WeaponIMG}
                    </div>
                </div>

                <div className="death-info">
                    <div className="first-box">
                        <p className="player-name">{info.namePlayer}</p>
                    </div>

                    <div className="second-box">
                        <div className="kills-wrapper">
                            <p className="kills-notice">K</p>
                            <p className={`kills-number`}>{info.match_stats.kills}</p>
                        </div>
                        <div className="assists-wrapper">
                            <p className="assists-notice">A</p>
                            <p className={`assists-number`}>{info.match_stats.deaths}</p>
                        </div>
                        <div className="death-wrapper">
                            <p className="death-notice">D</p>
                            <p className={`death-number`}>{info.match_stats.assists}</p>
                        </div>

                        <div className={`round-kills ${info.state.round_kills > 0 ? 'live' : ''}`}>
                            <div className="death-image"></div>
                            <span className={`kills-round-number`}>
                                {info.state.round_kills}
                                <p className="kills-notice">/5</p>
                            </span>
                        </div>

                        <div className="adr-wrapper">
                            <p className="adr-notice">ADR</p>
                            <p className="adr-number">66</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
