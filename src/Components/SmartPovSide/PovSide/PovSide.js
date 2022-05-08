import './PovSide.scss'

import { animated, useSpring } from 'react-spring'

import classNames from 'classnames';
import { redisIP } from '../../../utils/tools';

export default function PovSide({ povData, DefuseIMG, BombIMG, grenadeImg, activeWeapon, action }) {
    let picturePlayer = `http://${redisIP}/pgl/resources/csgo/team/${povData.teamKey}/${povData.playerKey}.webp`
    let teamLogo = povData.teamKey === 'placeholder' ? (`placeholder/${povData.team === 'CT' ? 'CT' : 'T'}`) : povData.teamKey

    let sideTeam = classNames({
        'CT': povData.teamSide === 'CT',
        'T': povData.teamSide === 'T'
    })
    
    let armor = classNames({
        'helmet': povData.state.helmet,
        'armor': !povData.state.helmet && povData.state.armor !== 0 && true
    })

    const props = useSpring({
        bottom: action === 'show' ? '1vw' : '-14vw',
        delay: action === 'show' ? 250 : 0
    })

    return (
        <animated.div className="pov-wrapper row" style={{ bottom: props.bottom }}>
            <div className='playerImage-wrapper'>
                <div className="imagePlayer" style={{
                    backgroundImage: `url(${picturePlayer})`, filter: `brightness(${povData.state.flashed / 51 < 1 ? 1 : povData.state.flashed / 51})`
                }}></div>
            </div>

            <div className='playerData-wrapper col'>
                <div className={`infoWeapon-wrapper row ${activeWeapon.ammo_clip === undefined ? 'hide' : 'show'}`}>
                    <div className="bulletsImage"></div>
                    <p className="bulletsAmmoClip">{activeWeapon.ammo_clip}</p>
                    <p className={`bulletsAmmoReserve ${sideTeam}`}>{activeWeapon.ammo_reserve}</p>
                </div>

                <div className='itemsPlayer-wrapper row'>
                    {DefuseIMG}
                    {BombIMG}
                    {grenadeImg}
                </div>

                <div className={`lifeBar-wrapper row ${sideTeam}`}>
                    <div className={`healBar ${sideTeam}`} style={{ width: `${povData.state.health}%` }}></div>
                    <div className="dmg"></div>

                    <div className="heal-wrapper row">
                        <div className={`healImage ${sideTeam}`}></div>
                        <p className={`healNumber ${povData.state.health <= 20 ? 'red' : ''}`}>{povData.state.health}</p>
                        <div className={`armorImage ${sideTeam} ${armor}`}></div>
                    </div>
                </div>
            </div>

            <div className='playerInfo-wrapper'>
                <div className='playerInfo-content row'>
                    <div className="teamLogo" style={{ backgroundImage: `url(http://${redisIP}/pgl/resources/csgo/team/${teamLogo}/logo.webp)` }}></div>

                    <div className='playerName-wrapper row'>
                        <p className='playerName'>{povData.playerName}</p>
                    </div>
                </div>
            </div>
            <div className={`bk-color ${sideTeam}`}></div>
        </animated.div >
    )
}
