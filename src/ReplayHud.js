import React from 'react'
import SmartLeftSide from './HudReplay/SmartLeftSide/SmartLeftSide'
import SmartPovSide from './HudReplay/SmartPovSide/SmartPovSide'
import SmartRightSide from './HudReplay/SmartRightSide/SmartRightSide'
import SmartTopBar from './HudReplay/SmartTopBar/SmartTopBar'

export default function ReplayHud() {
    return (
        <>
            <SmartTopBar />
            <SmartLeftSide />
            <SmartRightSide />
            <SmartPovSide action={'show'} />
        </>
    )
}
