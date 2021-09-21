import React, { useEffect, useRef, useState } from 'react'
import TopBar from './TopBar/TopBar';
import VetoLegends from './VetoLegends/VetoLegends';
import pistolRoundVideo from '../../assets/videos/pistol_round.webm'
import plantedBombVideo from '../../assets/videos/bomb_planted.webm'

export default function SmartTopBar({ topBarData }) {
    console.log(topBarData.leftSide.timeouts_remaining, topBarData.rightSide.timeouts_remaining)
    //TODO: TimeOut Remaining de facut!
    const videoRef = useRef(null);
    const [pistolRound, setPistolRound] = useState(false)
    const [bombPlanted, setBombPlanted] = useState(false)

    useEffect(() => {
        if (topBarData.mapInfo.currentRound === 0 || topBarData.mapInfo.currentRound === 15)
            if (topBarData.round.phase === 'live' && Number(topBarData.round.time) >= 114 && !pistolRound) {
                setPistolRound(true)
                videoRef.current.src = pistolRoundVideo
                videoRef.current.play();
            }
        if (topBarData.round.bomb === 'planted' && !bombPlanted) {
            setBombPlanted(true)
            videoRef.current.src = plantedBombVideo
            videoRef.current.play();
        }
        if (pistolRound) {
            setTimeout(() => {
                setPistolRound(false)
                setBombPlanted(false)
            }, 5000);
        }
    }, [bombPlanted, pistolRound, topBarData.mapInfo.currentRound, topBarData.round.bomb, topBarData.round.phase, topBarData.round.time])

    return (
        <>
            <TopBar topBar={topBarData} />
            <VetoLegends vetoInfo={topBarData.mapInfo.vetoLegend} phase={topBarData.round.phase} topBar={topBarData} />
            <video ref={videoRef} className={`video-start ${pistolRound ? 'pistol' : 'bomb'}`} controls={false} muted={true}></video>
        </>
    )
}
