import './PovSide.scss'

import { animated, useSpring } from 'react-spring'

import classNames from 'classnames';
import { token } from '../../../utils/socketIO'

export default function PovSide(
    { povData,
        ammoFillAnim,
        DefuseIMG,
        BombIMG,
        PistolIMG,
        WeaponIMG,
        grenadeImg,
        activeWeapon,
        action }) {
    let picturePlayer = `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${povData.teamKey}/${povData.playerKey}.webp`
    let teamLogo = povData.teamKey === 'placeholder' ? (`placeholder/${povData.team === 'CT' ? 'CT' : 'T'}`) : povData.teamKey
    let flag = povData.playerCountry !== '' ? `http://redis-birou.pgl.ro/pgl/resources/flags/${povData.playerCountry}.png` : 'http://redis-birou.pgl.ro/pgl/resources/flags/zz.png'
    let flagPhoto = false
    let sideTeam = classNames({
        'CT': povData.team === 'CT' && true,
        'T': povData.team === 'T' && true
    })
    let armor = classNames({
        'helmet': povData.state.helmet && true,
        'armor': !povData.state.helmet && povData.state.armor !== 0 && true
    })

    let roundKills = classNames({
        'show': povData.state.round_kills > 0 && true,
        'hide': povData.state.round_kills === 0 && true,
    })

    if (token === 'main')
        flagPhoto = povData.toggleCamera
    const props = useSpring({
        bottom: action === 'show' ? '1.1vw' : '-14vw',
        delay: action === 'show' ? 250 : 0
    })

    return (
        <animated.div className={`pov-wrapper col`} style={{ bottom: props.bottom }}>
            <div className="player-wrapper">
                <div className={`border-image-player ${sideTeam}`}>
                    <div className="background-image-player">
                        <div className="image-player" style={{
                            backgroundImage: `url(${picturePlayer})`, filter: `brightness(${povData.state.flashed / 51 < 1 ? 1 : povData.state.flashed / 51})`,
                            visibility: !flagPhoto ? 'visible' : 'hidden'
                        }}></div>
                    </div>
                </div>

                <div className="info-player-wrapper col">
                    <div className="first-layer-wrapper row">
                        <div className="main-info-player font-mont col">
                            <div className="first-row row">
                                <p className="player-name">{povData.playerName}</p>
                                <div className="player-flag" style={{ backgroundImage: `url(${flag})` }}></div>
                            </div>

                            <div className="second-row row">
                                <div className="first-info row">
                                    <div className="heal-wrapper row">
                                        <div className={`heal-image ${sideTeam}`}></div>
                                        <p className={`heal-number ${povData.state.health <= 20 ? 'red' : ''}`}>{povData.state.health}</p>
                                    </div>

                                    <div className={`armor-wrapper row ${armor}`}>
                                        <div className={`armor-image ${sideTeam}`}></div>
                                        <p className="armor-number">{povData.state.armor}</p>
                                    </div>
                                </div>

                                <div className="second-info row">
                                    <div className="kills-wrapper row">
                                        <p className="kills-notice">K</p>
                                        <p className={`kills-number ${sideTeam}`}>{povData.match_stats.kills}</p>
                                    </div>
                                    <div className="assists-wrapper row">
                                        <p className="assists-notice">A</p>
                                        <p className={`assists-number ${sideTeam}`}>{povData.match_stats.assists}</p>
                                    </div>
                                    <div className="death-wrapper row">
                                        <p className="death-notice">D</p>
                                        <p className={`death-number ${sideTeam}`}>{povData.match_stats.deaths}</p>
                                    </div>
                                </div>

                                <div className={`third-info row ${roundKills}`}>
                                    <div className="death-image"></div>
                                    <p className="kills-notice">x</p>
                                    <span className={`kills-round-number row ${sideTeam}`}>
                                        {povData.state.round_kills}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="team-image" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${teamLogo}/logo.webp)` }}></div>
                    </div >

                    <div className={`second-layer-wrapper ${sideTeam}`}>
                        <div className="heal-life-wrapper row">
                            <div className={`heal-bar ${sideTeam}`} style={{ width: `${povData.state.health}%` }}></div>
                            <div className="dmg" ></div>
                        </div>
                    </div>
                    <div className="third-layer-wrapper row font-tablet">
                        <div className={`bullets-wrapper row ${activeWeapon.ammo_clip === undefined ? 'hide' : 'show'}`}>
                            <div className="bullets-image"></div>
                            <p className="bullets-number">{activeWeapon.ammo_clip}/{activeWeapon.ammo_reserve}</p>
                        </div>

                        <div className="utils-wrapper row">
                            {DefuseIMG}
                            {grenadeImg}
                        </div>

                        <div className="weapons-wrapper row">
                            {BombIMG}
                            {PistolIMG}
                            {ammoFillAnim}
                            {WeaponIMG}
                        </div>
                    </div>
                </div >
            </div >

            <div className="sponsors-wrapper">
                <div className="sponsor-image"></div>
            </div>
        </animated.div>
    )
}
