import './Comercials.scss'

import React, { useEffect, useState } from 'react'

import ImagesComponent from './ImagesComponent/ImagesComponent'

export default function Comercials({ phase }) {
    const [animClass, setAnimClass] = useState('')

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

    return (
        <div className={`content-wrapper-comercial ${animClass}`}>
            <ImagesComponent />
        </div>
    )
}
