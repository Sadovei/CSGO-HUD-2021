import './ImageComponent.scss'

import { animated, useSpring } from 'react-spring'

import React from 'react'

export default function ImageComponent({ show }) {
    const props = useSpring({
        bottom: show === 'show' ? '1vw' : '-30vw',
        delay: show === 'show' ? 250 : 0
    })

    return (
        <animated.div className='image-wrapper' style={{ bottom: props.bottom }}>
            <div className='image' style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/inGameRandom/test.webp)` }}></div>
        </animated.div>
    )
}
