import './Comercials.scss'

import React, { useEffect, useState } from 'react'

import { subscribeToTopBar } from '../../utils/socketIO'

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

export default function Comercials() {
    const [animClass, setAnimClass] = useState('')
    const [topBar, setTopBar] = useState({ round: { phase: '' } });

    useEffect(() => {
        subscribeToTopBar(data => {
            setTopBar(data)
        })
    }, [])

    useEffect(() => {
        if (topBar.round.phase === 'freezetime' || topBar.round.phase === 'timeout_t' || topBar.round.phase === 'timeout_ct') {
            setAnimClass('showStart')
        }

        if (topBar.round.phase === 'live') {
            setTimeout(() => {
                setAnimClass('hideStart')
            }, 5000)
        }

        if (topBar.round.phase === 'bomb') {
            setAnimClass('showBomb')
        }

        if (topBar.round.phase === 'bomb')
            setTimeout(() => {
                setAnimClass('hideBomb')
            }, 5000)
        return null
    }, [topBar.round.phase])

    useEffect(() => {
        if (counter === sponsorsIMG.length) counter = 0
        const interval = setInterval(() => {
            counter++
        }, 15000)
        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter])



    return (
        <div className={`content-wrapper-comercial ${animClass}`}>
            <div
                className='sponsor-image'
                style={{ backgroundImage: `url(${SVGMap[sponsorsIMG[counter]]})` }}
            ></div>
        </div>
    )
}
