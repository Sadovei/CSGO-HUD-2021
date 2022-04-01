import './OwnBrand.scss'

import React, { useEffect, useRef, useState } from 'react'

export default function OwnBrand({ phase }) {
    const [animClass, setAnimClass] = useState('')
    const [flag, setFlag] = useState(false)
    const updateStart = useRef(null)

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

    return (
        <div className={`content-wrapper-ownBrand ${animClass}`}>
            <div className='logo'></div>
        </div>
    )
}
