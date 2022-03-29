import './CenterVideo.scss'

import React, { useEffect, useRef } from 'react'

import logo from '../../assets/videos/bomb_planted_once.webm'

export default function CenterVideo({ map }) {
    const mapVideo = useRef('')

    useEffect(() => {
        mapVideo.current = map
    }, [map])

    return (
        <video ref={mapVideo}
            className="video-logo"
            src={logo} loop
            preload="true"
            muted={true}>
        </video>
    )
}
