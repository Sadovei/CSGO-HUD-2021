import React, { useRef } from 'react'
import "./Timer.scss"

export default function Timer({ type, timer }) {
    // console.log(type, timer)
    let path = useRef()
    let colorTimer,
        dashArray = 400,
        dashOffSet = dashArray

    if (type === 'bomb')
        colorTimer = '#ee0404'
    else if (type === 'defuse' || type === 'CT')
        colorTimer = '#f3d002'
    else if (type === 'T')
        colorTimer = '#f3d002'

    return (
        <svg className="svgWrapper" viewBox="0 0 100 100" stroke="blue">
            <path ref={path} id="rhombPathOverlay" d="M 0 0 h 0 100 v 100 0 h -100 0 v -100 0" fill="none" stroke="none"
                strokeWidth="10"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffSet}
                style={{
                    stroke: "url(#linear)",
                    animationName: "dash",
                    animationDuration: `${timer}s`,
                    animationDirection: "forwards",
                    animationTimingFunction: 'linear'
                }}
            />
            <defs>
                <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="100%" stopColor={colorTimer} stopOpacity="1" />
                </linearGradient>
            </defs>
        </svg>
    )
}
