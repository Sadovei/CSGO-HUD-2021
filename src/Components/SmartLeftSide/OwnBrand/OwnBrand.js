import './OwnBrand.scss'

import React, { useEffect, useRef, useState } from 'react'

import america from '../../../assets/videos/america.webm'
import asia from '../../../assets/videos/asia.webm'
import europa_a from '../../../assets/videos/europa_a.webm'
import europa_b from '../../../assets/videos/europa_b.webm'
import major from '../../../assets/videos/major.webm'

export default function OwnBrand({ phase, typeOfEvent }) {
    const [animClass, setAnimClass] = useState('')
    const [flag, setFlag] = useState(false)
    const updateStart = useRef(null)
    const videoReference = useRef(null)

    useEffect(() => {
        if (!updateStart.current) {
            setUpdate(phase.phase)
        }
        return null
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase.phase])

    function setUpdate(phase) {
        if (
            phase === 'freezetime' ||
            phase === 'timeout_t' ||
            phase === 'timeout_ct'
        ) {
            setAnimClass('showStart')
            setFlag(true)
        }

        if (phase === 'live' && flag) {
            updateStart.current = setTimeout(() => {
                setAnimClass('hideStart')
                updateStart.current = null
                setFlag(false)
            }, 5000)
        }

        if (phase === 'bomb' && !flag) {
            setAnimClass('showBomb')
            setFlag(true)
        }

        if (phase === 'bomb' && flag)
            updateStart.current = setTimeout(() => {
                setAnimClass('hideBomb')
                updateStart.current = null
            }, 5000)
    }

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
                className="video-logo"
                controls={false}
                muted={true}
                loop={true}
            ></video>
        </div>
    )
}
