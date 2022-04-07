import './OwnBrand.scss'

import React, { useEffect, useRef, useState } from 'react'

import america from '../../../assets/videos/america.webm'
import asia from '../../../assets/videos/asia.webm'
import europa_a from '../../../assets/videos/europa_a.webm'
import europa_b from '../../../assets/videos/europa_b.webm'
import major from '../../../assets/videos/major.webm'

export default function OwnBrand({ phase, typeOfEvent }) {
    const [animClass, setAnimClass] = useState('')
    const videoReference = useRef(null)

    useEffect(() => {
        if (phase.phase === 'freezetime' || phase.phase === 'timeout_t' || phase.phase === 'timeout_ct') {
            setAnimClass('showStart')
        }

        if (phase.phase === 'live') {
            setTimeout(() => {
                setAnimClass('hideStart')
            }, 5000)
        }

        if (phase.phase === 'bomb') {
            setAnimClass('showBomb')
            setTimeout(() => {
                setAnimClass('hideBomb')
            }, 5000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase.phase])

    useEffect(() => {
        if (typeOfEvent === 'america')
            videoReference.current.src = america
        else if (typeOfEvent === 'europa_a')
            videoReference.current.src = europa_a
        else if (typeOfEvent === 'europa_b')
            videoReference.current.src = europa_b
        else if (typeOfEvent === 'asia')
            videoReference.current.src = asia
        else
            videoReference.current.src = major
        videoReference.current.play()
    }, [typeOfEvent])

    return (
        <div className={`content-wrapper-ownBrand ${animClass}`}>
            {/* <div className='logo'></div> */}
            <video
                ref={videoReference}
                className={`video-logo ${typeOfEvent}`}
                controls={false}
                muted={true}
                loop={true}
            ></video>
        </div>
    )
}
