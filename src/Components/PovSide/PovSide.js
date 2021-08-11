import './PovSide.scss'
import classNames from 'classnames';
import _uniqueId from 'lodash/uniqueId';

let latestDamage = 0;
let prevHealth = 0;

export default function PovSide({ povData }) {
    if (povData === undefined || povData.steamid === undefined) return (null);

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

    const weaponPrimary = ['Shotgun', 'Machine Gun', 'Submachine Gun', 'Rifle', 'SniperRifle']
    const eqSVGs = require.context("!@svgr/webpack!../../assets/icons/equipment", true, /\.svg$/);
    const SVGMap = eqSVGs.keys().reduce((images, path) => {
        const key = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
        images[key] = eqSVGs(path).default;
        return images;
    }, {});

    let picturePlayer = `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${povData.teamKey}/${povData.playerKey}.png`
    let teamLogo = povData.teamKey === 'placeholder' ? (`placeholder/${povData.team === 'CT' ? 'CT' : 'T'}`) : povData.teamKey
    let flag = `http://redis-birou.pgl.ro/pgl/resources/flags/${povData.playerCountry}.png`

    let activeWeapon = {
        ammo_clip: undefined,
        ammo_clip_max: undefined,
        type: undefined
    }
    let pistol = undefined, weaponMain = undefined, grenades = {}, grenadeImg = [], bombC4 = undefined, primaryWeaponAmmoOffset = 100

    Object.keys(povData.weapons).forEach(weapon => {
        if (povData.weapons[weapon].state === 'active') {
            activeWeapon.ammo_clip = povData.weapons[weapon].ammo_clip
            activeWeapon.ammo_clip_max = povData.weapons[weapon].ammo_clip_max
            activeWeapon.type = povData.weapons[weapon].type
        }

        if (weaponPrimary.includes(povData.weapons[weapon].type)) {
            weaponMain = povData.weapons[weapon].name.split(/_(.+)/)[1]
            primaryWeaponAmmoOffset = 100 * povData.weapons[weapon].ammo_clip / povData.weapons[weapon].ammo_clip_max;
        }

        if (povData.weapons[weapon].type === 'Pistol') {
            pistol = povData.weapons[weapon].name.split('_')[1]
            primaryWeaponAmmoOffset = 100 * povData.weapons[weapon].ammo_clip / povData.weapons[weapon].ammo_clip_max;
        }

        if (povData.weapons[weapon].type === 'C4') {
            bombC4 = povData.weapons[weapon].name.split('_')[1]
        }

        if (povData.weapons[weapon].type === 'Grenade') {
            grenades[povData.weapons[weapon].name.split('_')[1]] = {
                count: povData.weapons[weapon].ammo_reserve,
                state: 'holstered'
            }

            if (povData.weapons[weapon].state === 'active') {
                grenades[povData.weapons[weapon].name.split('_')[1]].state = 'active'
            }
        }
    })

    let WeaponIMG, PistolIMG, DefuseIMG, BombIMG;
    if (activeWeapon.type !== undefined && weaponMain !== undefined) {
        let NadeSVG = SVGMap[weaponMain];
        WeaponIMG = <div className={`primary ${weaponPrimary.includes(activeWeapon.type) ? 'active' : 'holstered'}`}>
            {(NadeSVG !== null) ? < NadeSVG /> : null}
        </div>
    }

    if (activeWeapon.type !== undefined && pistol !== undefined) {
        let NadeSVG = SVGMap[pistol];

        PistolIMG = <div className={`secondary ${activeWeapon.type !== 'Pistol' ? 'holstered' : 'active'}`}>
            {(NadeSVG !== null) ? < NadeSVG /> : null}
        </div>
    }

    if (povData.state.defusekit) {
        let NadeSVG = SVGMap.defuser;

        DefuseIMG = <div className={`defuse`}>
            {(NadeSVG !== null) ? < NadeSVG /> : null}
        </div>
    }

    if (activeWeapon.type !== undefined && bombC4 !== undefined) {
        let NadeSVG = SVGMap.c4;

        BombIMG = <div className={`bomb ${activeWeapon.type === 'C4' ? 'active' : 'holstered'}`}>
            {(NadeSVG !== null) ? < NadeSVG /> : null}
        </div>
    }

    Object.keys(grenades).forEach((grenade, indexGrenade) => {
        let NadeSVG = SVGMap[grenade];
        if (grenades[grenade].count === 2) {
            grenadeImg.push(<div className={`grenade ${grenade} ${grenades[grenade].state !== 'active' ? 'holstered' : 'holstered'}`} key={_uniqueId('index-')}>
                {(NadeSVG !== null) ? < NadeSVG /> : null}
            </div>);
            grenadeImg.push(<div className={`grenade ${grenade} ${grenades[grenade].state}`} key={_uniqueId('index-')}>
                {(NadeSVG !== null) ? < NadeSVG /> : null}
            </div>);
        } else
            grenadeImg.push(<div className={`grenade ${grenade} ${grenades[grenade].state}`} key={_uniqueId('index-')}>
                {(NadeSVG !== null) ? < NadeSVG /> : null}
            </div>);
    })

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

    let ammoFillAnim = <svg className="ammo-helper">
        <defs>
            <linearGradient id={"ammo-fill"} x1="0" y1="0%" x2="100%" y2="0%" spreadMethod="pad">
                <stop stopColor="white" stopOpacity="1" offset={primaryWeaponAmmoOffset + "%"} />
                <stop stopColor="gray" stopOpacity="1" offset={primaryWeaponAmmoOffset + "%"} />
            </linearGradient>
        </defs>
    </svg>;
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
