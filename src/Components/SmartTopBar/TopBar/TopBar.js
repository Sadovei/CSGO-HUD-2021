import classNames from 'classnames';
import React from 'react'
import { range } from '../../../utils/tools';
import { centerCounter, centerTerrorist } from './icons';
import Timer from './Timer/Timer';
import './TopBar.scss'

export default function TopBar({ topBar }) {
    let sideLeft = classNames({
        'CT': topBar.leftSide.sideTeam === 'CT' && true,
        'T': topBar.leftSide.sideTeam === 'T' && true
    })
    let sideRight = classNames({
        'CT': topBar.rightSide.sideTeam === 'CT' && true,
        'T': topBar.rightSide.sideTeam === 'T' && true
    })
    let leftWin = 0
    let rightWin = 0
    Object.values(topBar.mapInfo.vetoLegend).forEach(info => {
        if (info.leftTeamScore < info.rightTeamScore)
            leftWin += 1
        if (info.leftTeamScore > info.rightTeamScore)
            rightWin += 1
    })

    let biggest = topBar.leftSide.name.length > topBar.rightSide.name.length ? topBar.leftSide.name.length : topBar.rightSide.name.length
    let leftLogo = topBar.leftSide.nameKey === 'placeholder' ? (`placeholder/${topBar.leftSide.sideTeam === 'CT' ? 'CT' : 'T'}`) : topBar.leftSide.nameKey
    let rightLogo = topBar.rightSide.nameKey === 'placeholder' ? (`placeholder/${topBar.rightSide.sideTeam === 'CT' ? 'CT' : 'T'}`) : topBar.rightSide.nameKey
    let timeMinutes = Number(topBar.round.time) >= 0 ? Math.floor((Number(topBar.round.time) / 60)) : 0
    let timeSeconds = Number(topBar.round.time) >= 0 ? Math.ceil(Number(topBar.round.time)) % 60 < 10 ? `0${Math.ceil(Number(topBar.round.time)) % 60}` : Math.ceil(Number(topBar.round.time)) % 60 : 0
    const mapsToWin = range(1, (topBar.mapInfo.bestOf / 2).toFixed(0));

    return (
        <div className="top-bar-wrapper" >
            <div className="first-wrapper">
                <div className="leftSide-wrapper" style={{ width: `calc(18vw + ${(biggest / 2) * 1.29}vw)` }}>
                    <div className="primary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${leftLogo}/logo.png)` }}></div>
                    <div className="secondary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${leftLogo}/logo.png)` }}></div>
                    <p className='teamName font-tablet'>{topBar.leftSide.name}</p>
                </div>

                <div className="center-background"></div>
                <div className="center-wrapper" style={{ backgroundImage: `url(${topBar.leftSide.sideTeam === 'CT' ? centerCounter : centerTerrorist})` }}>
                    <div className="center">
                        <div className="leftScore-wrapper">
                            <p className={`leftSideRounds ${sideLeft} font-mont`}>{topBar.leftSide.score}</p>
                        </div>

                        <div className="timer-wrapper">
                            <div className="clock font-mont">
                                <p className="minutes">{(timeSeconds === '00' && topBar.round.phase !== 'paused') ? 1 : timeMinutes}</p>
                                <p className="points">:</p>
                                <p className="seconds">{timeSeconds === 0 ? '00' : timeSeconds}</p>
                            </div>
                            <Timer type={'bomb'} timer={30} />
                        </div>

                        <div className="rightScore-wrapper">
                            <p className={`rightSideRounds ${sideRight} font-mont`}>{topBar.rightSide.score}</p>
                        </div>
                    </div>
                </div>

                <div className="rightSide-wrapper" style={{ width: `calc(18vw + ${(biggest / 2) * 1.29}vw)` }}>
                    <div className="primary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${rightLogo}/logo.png)` }}></div>
                    <div className="secondary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${rightLogo}/logo.png)` }}></div>
                    <p className='teamName font-tablet'>{topBar.rightSide.name}</p>
                </div>
            </div>

            <div className="second-wrapper">
                <div className="leftInfo-wrapper">
                    <div className="mapWins-wrapper">
                        {
                            mapsToWin.map((map, index) => (
                                <div className={`map ${map} ${sideLeft} ${leftWin > index ? 'win' : 'lose'}`} key={index}></div>
                            )
                            )
                        }
                    </div>

                    <div className="status-match-wrapper">
                        <p className="current-status font-tablet">{`ROUND ${topBar.mapInfo.currentRound}/30`}</p>
                    </div>
                </div>

                <div className="rightInfo-wrapper">
                    <div className="series-status-wrapper">
                        <p className="current-status font-tablet">{`BEST OF ${topBar.mapInfo.bestOf}`}</p>
                    </div>

                    <div className="mapWins-wrapper">
                        {
                            mapsToWin.map((map, index) => (
                                <div className={`map ${map} ${sideRight} ${rightWin > index ? 'win' : 'lose'}`} key={index}></div>
                            )
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
