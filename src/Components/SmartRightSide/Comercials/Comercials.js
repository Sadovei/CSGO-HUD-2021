import './Comercials.scss'

import React, { useEffect, useRef, useState } from 'react'

const SponsorsPNG = require.context('./icons', true)
const sponsorsIMG = SponsorsPNG.keys().map((key) =>
    key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
)
let counter = 0

const SVGMap = SponsorsPNG.keys().reduce((images, path) => {
    const key = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
    images[key] = SponsorsPNG(path).default
    return images
}, {})

export default function Comercials({ phase }) {
    const [animClass, setAnimClass] = useState('')
    const [flag, setFlag] = useState(false)
    const updateStart = useRef(null)

    useEffect(() => {
        if (!updateStart.current) {
            setUpdate(phase.phase)
        }
        return null
    }, [phase.phase, setUpdate])

    useEffect(() => {
        if (counter === sponsorsIMG.length) counter = 0
        const interval = setInterval(() => {
            counter++
        }, 15000)
        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter])

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

    return (
        <div className={`content-wrapper-comercial ${animClass}`}>
            <div
                className='sponsor-image'
                style={{ backgroundImage: `url(${SVGMap[sponsorsIMG[counter]]})` }}
            ></div>
        </div>
    )
}
