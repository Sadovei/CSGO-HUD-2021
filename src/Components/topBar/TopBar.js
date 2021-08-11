import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { mockupTopBar } from '../../utils/mockups';
import { subscribeToTopBar } from '../../utils/socketIO';
import { range } from '../../utils/tools';
import { centerCounter, centerTerrorist } from './icons';
import './TopBar.scss'

export default function TopBar() {
    const [topBarData, setTopBarData] = useState(mockupTopBar);

    useEffect(() => {
        subscribeToTopBar(data => {
            setTopBarData(data)
        })
    }, [])

    let sideLeft = classNames({
        'CT': topBarData.leftSide.sideTeam === 'CT' && true,
        'T': topBarData.leftSide.sideTeam === 'T' && true
    })
    let sideRight = classNames({
        'CT': topBarData.rightSide.sideTeam === 'CT' && true,
        'T': topBarData.rightSide.sideTeam === 'T' && true
    })

    let biggest = topBarData.leftSide.name.length > topBarData.rightSide.name.length ? topBarData.leftSide.name.length : topBarData.rightSide.name.length
    let leftLogo = topBarData.leftSide.nameKey === 'placeholder' ? (`placeholder/${topBarData.leftSide.sideTeam === 'CT' ? 'CT' : 'T'}`) : topBarData.leftSide.nameKey
    let rightLogo = topBarData.rightSide.nameKey === 'placeholder' ? (`placeholder/${topBarData.rightSide.sideTeam === 'CT' ? 'CT' : 'T'}`) : topBarData.rightSide.nameKey

    let timeMinutes = Math.floor((Number(topBarData.round.time) / 60))
    let timeSeconds = Math.ceil(Number(topBarData.round.time)) % 60 < 10 ? `0${Math.ceil(Number(topBarData.round.time)) % 60}` : Math.ceil(Number(topBarData.round.time)) % 60

    const mapsToWin = range(1, (topBarData.mapInfo.bestOf / 2).toFixed(0));
    return (
        <div className="top-bar-wrapper" >
            <div className="first-wrapper">
                <div className="leftSide-wrapper" style={{ width: `calc(5.62vw + ${(biggest < 8 ? biggest * 2 : biggest) * 1.29}vw)` }}>
                    <div className="primary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${leftLogo}/logo.png)` }}></div>
                    <div className="secondary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${leftLogo}/logo.png)` }}></div>
                    <p className='teamName font-tablet'>{topBarData.leftSide.name}</p>
                </div>

                <div className="center-background"></div>
                <div className="center-wrapper" style={{ backgroundImage: `url(${topBarData.leftSide.sideTeam === 'CT' ? centerCounter : centerTerrorist})` }}>
                    <div className="center">
                        <div className="leftScore-wrapper">
                            <p className={`leftSideRounds ${sideLeft} font-mont`}>{topBarData.leftSide.score}</p>
                        </div>

                        <div className="timer-wrapper">
                            <div className="timer-animation">
                            </div>

                            <div className="clock font-mont">
                                <p className="minutes">{timeSeconds === '00' && topBarData.round.phase !== 'paused' ? 1 : timeMinutes}</p>
                                <p className="points">:</p>
                                <p className="seconds">{timeSeconds}</p>
                            </div>
                        </div>

                        <div className="rightScore-wrapper">
                            <p className={`rightSideRounds ${sideRight} font-mont`}>{topBarData.rightSide.score}</p>
                        </div>
                    </div>
                </div>

                <div className="rightSide-wrapper" style={{ width: `calc(5.62vw + ${(biggest < 8 ? biggest * 2 : biggest) * 1.29}vw)` }}>
                    <div className="primary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${rightLogo}/logo.png)` }}></div>
                    <div className="secondary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${rightLogo}/logo.png)` }}></div>
                    <p className='teamName font-tablet'>{topBarData.rightSide.name}</p>
                </div>
            </div>

            <div className="second-wrapper">
                <div className="leftInfo-wrapper">
                    <div className="mapWins-wrapper">
                        {
                            mapsToWin.map((map, index) => (
                                <div className={`map ${map}`} key={index}></div>
                            )
                            )
                        }
                    </div>

                    <div className="status-match-wrapper">
                        <p className="current-status font-tablet">{`ROUND ${topBarData.mapInfo.currentRound}/30`}</p>
                    </div>
                </div>

                <div className="rightInfo-wrapper">
                    <div className="series-status-wrapper">
                        <p className="current-status font-tablet">{`BEST OF ${topBarData.mapInfo.bestOf}`}</p>
                    </div>

                    <div className="mapWins-wrapper">
                        {
                            mapsToWin.map((map, index) => (
                                <div className={`map ${map}`} key={index}></div>
                            )
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="vetoLegend-wrapper"></div>
        </div >

    )
}
