import './Comercials.scss'

import React, { useEffect, useRef, useState } from 'react'

const SponsorsPNG = require.context('./icons', true)
const sponsorsIMG = SponsorsPNG.keys().map((key) =>
    key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
)

const SVGMap = SponsorsPNG.keys().reduce((images, path) => {
    const key = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
    images[key] = SponsorsPNG(path).default
    return images
}, {})

export default function Comercials({ phase }) {
    const [animClass, setAnimClass] = useState('')
    const counter = useRef(0)

    useEffect(() => {
        if (phase === 'freezetime' || phase === 'timeout_t' || phase === 'timeout_ct') {
            setAnimClass('showStart')
        }

        if (phase === 'live') {
            setTimeout(() => {
                setAnimClass('hideStart')
            }, 5000)
        }

        if (phase === 'bomb') {
            setAnimClass('showBomb')
        }

        if (phase === 'bomb')
            setTimeout(() => {
                setAnimClass('hideBomb')
            }, 5000)
        return null
    }, [phase])

    useEffect(() => {
        setInterval(() => {
            if (counter.current === 3)
                counter.current = 0
            else
                counter.current++
        }, 15000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={`content-wrapper-comercial ${animClass}`}>
            <div className='sponsor-image' style={{ backgroundImage: `url(${SVGMap[sponsorsIMG[counter.current]]})` }}></div>
        </div>
    )
}