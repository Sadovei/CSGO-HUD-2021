import React, { useEffect, useState } from 'react'

import { subscribeToRightSide } from '../../utils/socketIO'
import RightSide from './RightSide/RightSide'
import EconomyRight from './EconomyRight/EconomyRight'
import UtilitiesRight from './UtilitiesRight/UtilitiesRight';

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
            <div className='dynamic-wrapper col'>
                <UtilitiesRight utilities={rightSide.utility} team={rightSide.side} phase={rightSide.roundPhase} />
                <EconomyRight economy={rightSide.economy} team={rightSide.side} phase={rightSide.roundPhase} />
            </div>

            <RightSide team={rightSide.side} players={rightSide.players} phase={rightSide.roundPhase.phase} />
        </div>
    )
}
