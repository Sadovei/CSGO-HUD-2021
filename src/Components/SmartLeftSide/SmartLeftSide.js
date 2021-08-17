import React, { useEffect, useState } from 'react'

import { subscribeToLeftSide } from '../../utils/socketIO'
import EconomyLeft from './EconomyLeft/EconomyLeft';
import UtilitiesLeft from './UtilitiesLeft/UtilitiesLeft';
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
            <div className='dynamic-wrapper col'>
                <UtilitiesLeft utilities={leftSide.utility} team={leftSide.side} phase={leftSide.roundPhase} />
                <EconomyLeft economy={leftSide.economy} team={leftSide.side} phase={leftSide.roundPhase} />
            </div>
            <LeftSide team={leftSide.side} players={leftSide.players} phase={leftSide.roundPhase.phase} />
        </div>
    )

}
