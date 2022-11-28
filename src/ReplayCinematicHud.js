import React from 'react'
import SmartLeftSide from './Hud-Cinematic/SmartLeftSide/SmartLeftSide'
import SmartRightSide from './Hud-Cinematic/SmartRightSide/SmartRightSide'
import SmartTopBar from './Hud-Cinematic/SmartTopBar/SmartTopBar'

export default function ReplayCinematicHud() {
    return (
        <>
            <SmartTopBar />
            <SmartLeftSide />
            <SmartRightSide />
        </>
    )
}
