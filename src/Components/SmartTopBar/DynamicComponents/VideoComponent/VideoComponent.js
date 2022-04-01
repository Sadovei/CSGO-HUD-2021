import './VideoComponent.scss'

import React, { useEffect, useRef, useState } from 'react'

import pistolRoundVideo from '../../../../assets/videos/pistol_round.webm'
import plantedBombVideo from '../../../../assets/videos/bomb_planted_once.webm'

export const VideoComponent = ({ topBarData }) => {
    const videoReference = useRef(null)
    const [pistolRound, setPistolRound] = useState(false)
    const [bombPlanted, setBombPlanted] = useState(false)

    useEffect(() => {
        if (topBarData.mapInfo.currentRound === 0 || topBarData.mapInfo.currentRound === 15)
            if (topBarData.round.phase === 'live' && Number(topBarData.round.time) >= 114 && !pistolRound) {
                videoReference.current.src = pistolRoundVideo
                videoReference.current.play()
                setPistolRound(true)
            }

        if (topBarData.round.bomb === 'planted' && !bombPlanted && Number(topBarData.round.time) >= 40) {
            setBombPlanted(true)
            videoReference.current.src = plantedBombVideo
            videoReference.current.play()
        }

        if (pistolRound || bombPlanted) {
            setTimeout(() => {
                setPistolRound(false)
                setBombPlanted(false)
            }, 5000)
        }
    }, [bombPlanted, pistolRound, topBarData.mapInfo.currentRound, topBarData.round.bomb, topBarData.round.phase, topBarData.round.time])

    return (
        <video
            ref={videoReference}
            className={`video-start ${pistolRound ? 'pistol' : 'bomb'}`}
            controls={false}
            muted={true}
        ></video>
    )
}
