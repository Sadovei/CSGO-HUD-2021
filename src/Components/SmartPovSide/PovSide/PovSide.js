import './PovSide.scss'

import classNames from 'classnames';

let latestDamage = 0;
let prevHealth = 0;

export default function PovSide(
    { povData,
        ammoFillAnim,
        DefuseIMG,
        BombIMG,
        PistolIMG,
        WeaponIMG,
        grenadeImg,
        activeWeapon }) {

    let healthDelta = prevHealth - povData.state.health;
    prevHealth = povData.state.health;

    if (healthDelta !== 0) {
        let damageClear = null;
        latestDamage += healthDelta;
        clearTimeout(damageClear);
        damageClear = setTimeout(() => {
            latestDamage = 0;
        }, 1000);
    }
    if (latestDamage < 0) latestDamage = 0

    let picturePlayer = `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${povData.teamKey}/${povData.playerKey}.png`
    let teamLogo = povData.teamKey === 'placeholder' ? (`placeholder/${povData.team === 'CT' ? 'CT' : 'T'}`) : povData.teamKey
    let flag = `http://redis-birou.pgl.ro/pgl/resources/flags/${povData.playerCountry}.png`

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


    return (
        <div className="pov-wrapper">
            <div className="player-wrapper">
                <div className={`border-image-player ${sideTeam}`}>
                    <div className="background-image-player"></div>
                    <div className="image-player" style={{ backgroundImage: `url(${picturePlayer})` }}></div>
                </div>

                <div className="info-player-wrapper">
                    <div className="first-layer-wrapper">
                        <div className="main-info-player font-mont">
                            <div className="first-row">
                                <p className="player-name">{povData.playerName}</p>
                                <div className="player-flag" style={{ backgroundImage: `url(${flag})` }}></div>
                            </div>

                            <div className="second-row">
                                <div className="first-info">
                                    <div className="heal-wrapper">
                                        <div className={`heal-image ${sideTeam}`}></div>
                                        <p className="heal-number">{povData.state.health}</p>
                                    </div>

                                    <div className={`armor-wrapper ${armor}`}>
                                        <div className={`armor-image ${sideTeam}`}></div>
                                        <p className="armor-number">{povData.state.armor}</p>
                                    </div>
                                </div>

                                <div className="second-info">
                                    <div className="kills-wrapper">
                                        <p className="kills-notice">K</p>
                                        <p className={`kills-number ${sideTeam}`}>{povData.match_stats.kills}</p>
                                    </div>
                                    <div className="assists-wrapper">
                                        <p className="assists-notice">A</p>
                                        <p className={`assists-number ${sideTeam}`}>{povData.match_stats.assists}</p>
                                    </div>
                                    <div className="death-wrapper">
                                        <p className="death-notice">D</p>
                                        <p className={`death-number ${sideTeam}`}>{povData.match_stats.deaths}</p>
                                    </div>
                                </div>

                                <div className={`third-info ${roundKills}`}>
                                    <div className="death-image"></div>
                                    <span className={`kills-round-number ${sideTeam}`}>
                                        {povData.state.round_kills}
                                        <p className="kills-notice">/5</p>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="team-image" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${teamLogo}/logo.png)` }}></div>
                    </div >

                    <div className={`second-layer-wrapper ${sideTeam}`}>
                        <div className="heal-life-wrapper">
                            <div className={`heal-bar ${sideTeam}`} style={{ width: `${povData.state.health}%` }}></div>
                            <div className="dmg" style={{
                                transitionDelay: (latestDamage !== 0) ? "0" : "1s",
                                transition: (latestDamage !== 0) ? "" : "width 800ms ease-out",
                                width: latestDamage + "%"
                            }}></div>
                        </div>
                    </div>

                    <div className="third-layer-wrapper font-tablet">
                        <div className={`bullets-wrapper ${activeWeapon.ammo_clip === undefined ? 'hide' : 'show'}`}>
                            <div className="bullets-image"></div>
                            <p className="bullets-number">{activeWeapon.ammo_clip}/{activeWeapon.ammo_clip_max}</p>
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
                </div >

            </div >

            <div className="sponsors-wrapper"></div>
        </div >
    )
}
