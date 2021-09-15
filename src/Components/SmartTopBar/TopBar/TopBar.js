import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { range } from '../../../utils/tools';
import { centerCounter, centerTerrorist } from './icons';
import Timer from './Timer/Timer';
import './TopBar.scss'

export default function TopBar({ topBar }) {
    const [timeTimer, setTimeTimer] = useState(0);
    const [phaseTimer, setPhaseTimer] = useState();
    const [flag, setFlag] = useState(true);

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
        if (info[topBar.leftSide.nameKey] < info[topBar.rightSide.nameKey])
            rightWin += 1
        if (info[topBar.leftSide.nameKey] > info[topBar.rightSide.nameKey])
            leftWin += 1
    })

    let biggest = topBar.leftSide.name.length > topBar.rightSide.name.length ? topBar.leftSide.name.length : topBar.rightSide.name.length
    let leftLogo = topBar.leftSide.nameKey === 'placeholder' ? (`placeholder/${topBar.leftSide.sideTeam === 'CT' ? 'CT' : 'T'}`) : topBar.leftSide.nameKey
    let rightLogo = topBar.rightSide.nameKey === 'placeholder' ? (`placeholder/${topBar.rightSide.sideTeam === 'CT' ? 'CT' : 'T'}`) : topBar.rightSide.nameKey
    let timeMinutes = Number(topBar.round.time) >= 0 ? Math.floor((Number(topBar.round.time) / 60)) : 0
    let timeSeconds = Number(topBar.round.time) >= 0 ? Math.ceil(Number(topBar.round.time)) % 60 < 10 ? `0${Math.ceil(Number(topBar.round.time)) % 60}` : Math.ceil(Number(topBar.round.time)) % 60 : 0
    const mapsToWin = range(1, (topBar.mapInfo.bestOf / 2).toFixed(0));

    useEffect(() => {
        setUpdate(topBar.round.phase, topBar.round.win_team);
        setFlag(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topBar.round.phase, topBar.round.win_team]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function setUpdate(phase, round_win) {
        if (((phase === 'defuse' || phase === 'bomb') && round_win === '') && flag) {
            setTimeTimer(Number(timeSeconds))
            setPhaseTimer(phase)
            setFlag(false)
        }

        if ((round_win === 'CT' || round_win === 'T') && flag) {
            setTimeTimer(Number(timeSeconds))
            setPhaseTimer(round_win)
            setFlag(false)
        }
    }

    return (
        <div className="top-bar-wrapper" >
            <div className="first-wrapper">
                <div className="leftSide-wrapper" style={{ width: `calc(18vw + ${(biggest / 2) * 1.29}vw)` }}>
                    <div className="primary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${leftLogo}/logo.webp)` }}></div>
                    <div className="secondary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${leftLogo}/logo.webp)` }}></div>
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
                            {timeTimer !== 0 && <Timer type={phaseTimer} timer={timeTimer} />}
                        </div>

                        <div className="rightScore-wrapper">
                            <p className={`rightSideRounds ${sideRight} font-mont`}>{topBar.rightSide.score}</p>
                        </div>
                    </div>
                </div>

                <div className="rightSide-wrapper" style={{ width: `calc(18vw + ${(biggest / 2) * 1.29}vw)` }}>
                    <div className="primary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${rightLogo}/logo.webp)` }}></div>
                    <div className="secondary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${rightLogo}/logo.webp)` }}></div>
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
                        {(topBar.mapInfo.currentRound < 30 || (topBar.mapInfo.currentRound === 30 && topBar.leftSide.score !== topBar.rightSide.score)) ?
                            <p className="current-status font-tablet">{`ROUND ${topBar.mapInfo.currentRound + 1}/30`}</p>
                            :
                            <p className="current-status font-tablet">{`Round ${Number(topBar.mapInfo.currentRound % 6 + 1)}/6 OT${Math.floor(((topBar.mapInfo.currentRound - 30) / 6) + 1)}`}</p>

                        }
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
