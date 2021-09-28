import React, { useEffect, useState } from 'react'

import { subscribeToLeftSide } from '../../utils/socketIO'
import LeftSide from './LeftSide/LeftSide'

export default function SmartLeftSide() {
    const [leftSide, setLeftSide] = useState();

    useEffect(() => {
        subscribeToLeftSide(data => {
            setLeftSide(data)
        })
    }, [])

    if (leftSide === undefined) {
        return null;
    }

    return (
        <div className='left-wrapper'>
            <LeftSide team={leftSide.side} players={leftSide.players} />
        </div>
    )

}
