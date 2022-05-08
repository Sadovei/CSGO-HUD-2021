import classNames from 'classnames'
import React from 'react'

import './TimeOutComponent.scss'

export default function TimeOutComponent({ topBar }) {
    let timeOut = classNames({
        CT: topBar.round.phase === 'timeout_ct',
        T: topBar.round.phase === 'timeout_t',
        ANY: topBar.round.phase === 'paused'
    })

    let teamKeyLogo = timeOut === 'CT' ?
        (topBar.leftSide.sideTeam === 'CT' ? topBar.leftSide.nameKey : topBar.rightSide.nameKey) : timeOut === 'T' &&
        (topBar.leftSide.sideTeam === 'T' ? topBar.leftSide.nameKey : topBar.rightSide.nameKey)

    let logo = teamKeyLogo === 'placeholder' ? `placeholder/${topBar.leftSide.sideTeam === timeOut ? topBar.leftSide.sideTeam : topBar.rightSide.sideTeam === timeOut && topBar.rightSide.sideTeam}` :
        teamKeyLogo

    let timeMinutes =
        Number(topBar.round.time) >= 0
            ? Math.floor(Number(topBar.round.time) / 60)
            : 0

    let timeSeconds =
        Number(topBar.round.time) >= 0
            ? Math.ceil(Number(topBar.round.time)) % 60 < 10
                ? `0${Math.ceil(Number(topBar.round.time)) % 60}`
                : Math.ceil(Number(topBar.round.time)) % 60
            : '00'
    if (topBar.round.phase === 'paused' || topBar.round.phase === 'timeout_t' || topBar.round.phase === 'timeout_ct')
        return (
            <div className='time-wrapper font-mont'>
                <div className={`logo-wrapper ${timeOut}`}>
                    {topBar.round.phase !== 'paused' && <div className={`logo ${timeOut}`} style={{backgroundImage: `url(http://10.99.4.20/pgl/resources/csgo/team/${logo}/logo.webp)`}}></div>}
                    {topBar.round.phase === 'paused' && <div className={`logo ${timeOut}`}></div>}
                </div>

                <div className={`typeOfPause-wrapper ${topBar.round.phase === 'paused' ? 'matchPaused' : 'timeOut'}`}>
                    <p className='text'>{topBar.round.phase === 'paused' ? 'MATCH PAUSED' : 'TACTICAL'}</p>
                    {timeOut === 'T' ? (
                        <span className='number'>PAUSE {4 -
                            (topBar.leftSide.sideTeam === 'T'
                                ? topBar.leftSide.timeouts_remaining
                                : topBar.rightSide.timeouts_remaining)}
                            /4</span>
                    ) : timeOut === 'CT' && (<span className='number'>{4 - (topBar.leftSide.sideTeam === 'CT'
                        ? topBar.leftSide.timeouts_remaining
                        : topBar.rightSide.timeouts_remaining)
                    }/4</span>)}
                </div>

                {topBar.round.phase !== 'paused' &&
                    <div className='time row'>
                        <p className='minutes'>
                            {timeSeconds === '00' && topBar.round.phase !== 'paused'
                                ? topBar.round.phase === 'bomb'
                                    ? '0'
                                    : '1'
                                : timeMinutes}
                        </p>

                        <p className='points'>:</p>

                        <span className='seconds row'>
                            <p className='firstTimeSecond'>
                                {timeSeconds.toString().split('')[0]}
                            </p>

                            <p className='secondTimeSecond'>
                                {timeSeconds.toString().split('')[1]}
                            </p>
                        </span>
                    </div>}
            </div>
        )
    return null
}
