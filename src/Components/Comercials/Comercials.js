import './Comercials.scss'

import React, { useEffect, useRef, useState } from 'react'

import { subscribeToTopBar } from '../../utils/socketIO'

export default function Comercials() {
    const [animClass, setAnimClass] = useState('')
    const [topBar, setTopBar] = useState({ round: { phase: '' } });
    const counter = useRef(0)
    const sponsorsIMG = useRef([])
    const SVGMap = useRef({})

    useEffect(() => {
        subscribeToTopBar(data => {
            setTopBar(data)
        })

        sponsorsIMG.current = require.context('./icons', true).keys().map((key) =>
            key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
        )

        SVGMap.current = require.context('./icons', true).keys().reduce((images, path) => {
            const key = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
            images[key] = require.context('./icons', true)(path).default
            return images
        }, {})
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
    }, [topBar.round.phase])
    
    useEffect(() => {
        if (counter.current === sponsorsIMG.length)
            counter.current = 0
        else
            setInterval(() => {
                counter.current++
            }, 15000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter.current])
    
    return (
        <div className={`content-wrapper-comercial ${animClass}`}>
            <div
                className='sponsor-image'
                style={{ backgroundImage: `url(${SVGMap.current[sponsorsIMG.current[counter.current]]})` }}
            ></div>
        </div>
    )
}
