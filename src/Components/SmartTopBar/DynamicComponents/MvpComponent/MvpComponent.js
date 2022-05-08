import './MvpComponent.scss'

import React, { useEffect, useRef } from 'react'
import { animated, useSpring } from 'react-spring'
import { redisIP } from '../../../../utils/tools'

export default function MvpComponent({ mvps }) {
    const currentMVP = useRef({})
    const showContent = useRef(false)

    useEffect(() => {
        if (Object.keys(mvps).length > 0) {
            currentMVP.current = mvps
            showContent.current = true
        }

        if (showContent.current)
            setTimeout(() => {
                showContent.current = false
            }, 4000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mvps])

    const mvpProps = useSpring({
        opacity: showContent.current ? '1' : '0'
    })

    return (
        <animated.div className='mvp-wrapper row' style={{ opacity: mvpProps.opacity }}>
            <div className='sideImage-wrapper'>
                <div className={`sideImage ${currentMVP?.current?.teamSide}`}></div>
            </div>

            <div className='info-wrapper col'>
                <p className={`side  ${currentMVP?.current?.teamSide} `}>
                    {currentMVP?.current?.teamSide === 'CT'
                        ? 'COUNTER TERRORISTS'
                        : 'TERRORISTS'}
                </p>

                <p className='winText '>WIN THE ROUND</p>

                <div className='roundText-wrapper row'>
                    <p className='roundText'>ROUND MVP:</p>
                    <p className='playerText'>{currentMVP?.current?.playerName}</p>
                </div>
            </div>

            <div className='playerPhoto-wrapper'>
                <div className='playerPhoto' style={{ backgroundImage: `url(http://${redisIP}/pgl/resources/csgo/team/${currentMVP?.current?.teamKey}/${currentMVP?.current?.playerKey}.webp)` }}></div>
            </div>
        </animated.div>
    )
}
