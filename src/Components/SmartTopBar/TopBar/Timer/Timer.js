import React, { useRef } from 'react'
import "./Timer.scss"

export default function Timer({ type, timer }) {
    let path = useRef(), pathLength = 400;
    if (path.current !== undefined) {
        pathLength = path.current.getTotalLength()
    }
    
    return (
        <svg className="svgWrapper" viewBox="0 0 100 100" stroke="blue">
            <path ref={path} id="rhombPathOverlay" d="M 0 0 h 0 100 v 100 0 h -100 0 v -100 0" fill="none" stroke="none"
                strokeWidth="10"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength}
                style={{
                    stroke: "url(#linear)"
                }}
            />
            <defs>
                <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="100%" stopColor={type === 'bomb' ? 'red' : 'blue'} stopOpacity="1" />
                </linearGradient>
            </defs>
        </svg>
    )
}
