import React from 'react'

export const Player = ({
    info,
    team,
    DefuseIMG,
    grenadeImg,
    BombIMG,
    WeaponIMG,
    ammoFillAnim
}) => {
    return (
        <div className={`left-player-wrapper row slot-${info.observer_slot} ${team} ${info.state.health === 0 ? 'death' : 'alive'
            } ${info.active ? 'pov' : ''}`}>

            <div className='numberSlot-wrapper'>
                <p className='numberSlot'>{info.observer_slot}</p>
            </div>

            <div className='contentPlayer-wrapper'>
                <div className='firstContentPlayer-wrapper'>
                    <img src={`http://redis-birou.pgl.ro/pgl/resources/csgo/team/${info.teamKey}/${info.nameKey}.webp`}
                        className='playerImage' alt='' style={{
                            filter:
                                info.state.health === 0
                                    ? 'grayscale(100%)'
                                    : info.state.flashed / 51 < 1
                                        ? 'brightness(1)'
                                        : `brightness(${info.state.flashed / 51}`
                        }}>
                    </img>

                    <div className='infoPlayer-wrapper'>
                        <div className='firstRow-wrapper'>
                            <p className='playerName'>{info.namePlayer}</p>

                            <div className='aliveInfo-wrapper'>
                                <div className='kills-wrapper'>
                                    <div className='killsImage'></div>
                                    <p className='kills'>{info.match_stats.kills}</p>
                                </div>

                                <div className='death-wrapper'>
                                    <div className='deathImage'></div>
                                    <p className='death'>{info.match_stats.deaths}</p>
                                </div>
                            </div>
                        </div>

                        <div className='secondRow-wrapper'>
                            <div className='money-wrapper'>
                                <p className='money'>${info.state.money}</p>
                            </div>

                            <div className={`currentKills row ${info.state.round_kills > 0 ? 'live' : ''}`}>
                                <div className='killsImage'></div>
                                <span className='currentKills'>{info.state.round_kills}</span>
                            </div>

                            <div className='utils-wrapper row'>
                                {DefuseIMG}
                                {BombIMG}
                                {grenadeImg}
                            </div>

                            <div className='deathInfo-wrapper'>
                                <div className='kills-wrapper'>
                                    <div className='killsImage'></div>
                                    <p className='kills'>{info.match_stats.kills}</p>
                                </div>

                                <div className='death-wrapper'>
                                    <div className='deathImage'></div>
                                    <p className='death'>{info.match_stats.deaths}</p>
                                </div>
                            </div>
                        </div>

                        <div className='thirdRow-wrapper'>
                            <div className={`currentKills row ${info.state.round_kills > 0 ? 'live' : ''}`}>
                                <div className='killsImage'></div>
                                <span className='currentKills'>{info.state.round_kills}</span>
                            </div>

                            <div className='adr-wrapper row'>
                                <p className='adr-notice'>ADR</p>
                                <p className='adr-number'>{info.adr}</p>
                            </div>
                        </div>
                    </div>

                    <div className='secondContentPlayer-wrapper'>
                        <div className='healInfo-wrapper'>
                            <div className={`healImage ${sideTeam}`}></div>
                            <p className={`healNumber ${info.state.health <= 20 ? 'red' : ''}`}>
                                {info.state.health}
                            </p>
                            <div className={`armorImage ${armor}`}></div>
                        </div>

                        <div className='weapon-wrapper row'>
                            {ammoFillAnim}
                            {WeaponIMG}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
