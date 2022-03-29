import './CenterVideo.scss'

import React from 'react'
import logo from '../../assets/videos/logo.webm'

export default function CenterVideo() {
    return (
        <video className="video-logo" src={logo} loop autoPlay={true} preload="true" muted={true}></video>
    )
}
