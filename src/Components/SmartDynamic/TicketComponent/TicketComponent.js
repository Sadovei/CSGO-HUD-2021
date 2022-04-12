import './TicketComponent.scss'

import { animated, useSpring } from 'react-spring'

import React from 'react'

export default function TicketComponent({ show }) {
    const props = useSpring({
        bottom: show === 'show' ? '1vw' : '-30vw',
        delay: show === 'show' ? 250 : 0
    })

    return (
        <animated.div className='image-wrapper' style={{ bottom: props.bottom }}>
            <div className='image'></div>
        </animated.div>
    )
}
