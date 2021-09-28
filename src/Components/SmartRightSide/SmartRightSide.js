import React, { useEffect, useState } from 'react'

import { subscribeToRightSide } from '../../utils/socketIO'
import RightSide from './RightSide/RightSide'

export default function SmartRightSide() {
    const [rightSide, setRightSide] = useState();

    useEffect(() => {
        subscribeToRightSide(data => {
            setRightSide(data)
        })
    }, [])

    if (rightSide === undefined) {
        return null;
    }

    return (
        <div className="right-wrapper">
            <RightSide team={rightSide.side} players={rightSide.players} />
        </div>
    )
}
