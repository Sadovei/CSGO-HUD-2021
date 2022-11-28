import './CenterVideo.scss'

import React, { useEffect, useRef } from 'react'

import de_ancient from '../../assets/videos/de_ancient.webm'
import de_dust2 from '../../assets/videos/de_dust2.webm'
import de_inferno from '../../assets/videos/de_inferno.webm'
import de_mirage from '../../assets/videos/de_mirage.webm'
import de_nuke from '../../assets/videos/de_nuke.webm'
import de_overpass from '../../assets/videos/de_overpass.webm'
import de_vertigo from '../../assets/videos/de_vertigo.webm'

export default function CenterVideo({ map }) {
    const mapVideo = useRef('')

    useEffect(() => {
        switch (map) {
            case 'de_ancient':
                mapVideo.current.src = de_ancient
                break;
            case 'de_dust2':
                mapVideo.current.src = de_dust2
                break;
            case 'de_inferno':
                mapVideo.current.src = de_inferno
                break;
            case 'de_mirage':
                mapVideo.current.src = de_mirage
                break;
            case 'de_nuke':
                mapVideo.current.src = de_nuke
                break;
            case 'de_overpass':
                mapVideo.current.src = de_overpass
                break;
            case 'de_vertigo':
                mapVideo.current.src = de_vertigo
                break;
            default:
                break;
        }
        mapVideo.current.play()
    }, [map])

    return (
        <video ref={mapVideo}
            className={`video-logo ${map}`}
            loop
            preload="true"
            muted={true}>
        </video>
    )
}
