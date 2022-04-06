import './TimeOutComponent.scss'

import { animated, useSpring } from 'react-spring'

import React from 'react'
import classNames from 'classnames'

export default function TimeOutComponent({ topBarData }) {
    let timeOut = classNames({
        CT: topBarData.round.phase === 'timeout_ct',
        T: topBarData.round.phase === 'timeout_t',
        ANY: topBarData.round.phase === 'paused'
    })

    const mvpProps = useSpring({
        opacity: topBarData.round.phase === 'timeout_t' || topBarData.round.phase === 'timeout_ct' || topBarData.round.phase === 'paused'
            ? '1' : '0',
        top: topBarData.round.phase === 'timeout_t' || topBarData.round.phase === 'timeout_ct' || topBarData.round.phase === 'paused'
            ? '15%' : '14%'
    })

    let teamKeyLogo = timeOut === 'CT' ?
        (topBarData.leftSide.sideTeam === 'CT' ? topBarData.leftSide.nameKey : topBarData.rightSide.nameKey) : timeOut === 'T' &&
        (topBarData.leftSide.sideTeam === 'T' ? topBarData.leftSide.nameKey : topBarData.rightSide.nameKey)

    let logo = teamKeyLogo === 'placeholder' ? `placeholder/${topBarData.leftSide.sideTeam === timeOut ? topBarData.leftSide.sideTeam : topBarData.rightSide.sideTeam === timeOut && topBarData.rightSide.sideTeam}` :
        teamKeyLogo

    return (
        <animated.div className='timeOut-wrapper row' style={{ opacity: mvpProps.opacity, top: mvpProps.top }}>
            <div className='logo-wrapper'>
                <div className={`logo ${timeOut}`} style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${logo}/logo.webp)` }}></div>
            </div>

            <div className={`content-wrapper col ${timeOut}`}>
                <div className='text-wrapper row'>
                    <p className='text'>{timeOut !== 'ANY' ? 'TACTICAL PAUSE' : 'MATCH PAUSE'}</p>

                    {timeOut === 'T' ? (
                        <p className='number'>{4 -
                            (topBarData.leftSide.sideTeam === 'T'
                                ? topBarData.leftSide.timeouts_remaining
                                : topBarData.rightSide.timeouts_remaining)}
                            /4</p>
                    ) : timeOut === 'CT' && (<p className='number'>{4 - (topBarData.leftSide.sideTeam === 'CT'
                        ? topBarData.leftSide.timeouts_remaining
                        : topBarData.rightSide.timeouts_remaining)
                    }/4</p>)}
                </div>

                <p className={`textSide ${timeOut}`}>
                    {timeOut === 'CT' ?
                        (topBarData.leftSide.sideTeam === 'CT' ? topBarData.leftSide.name : topBarData.rightSide.name) :
                        timeOut === 'T' &&
                        (topBarData.leftSide.sideTeam === 'T' ? topBarData.leftSide.name : topBarData.rightSide.name)}
                </p>
            </div>
        </animated.div>
    )
}
