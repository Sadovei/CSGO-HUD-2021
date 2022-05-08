import React from 'react'
import './TimeOutComponent.scss'
export default function TimeOutComponent({ typeOfPause, time }) {
    return (
        <>
            <div>{typeOfPause}</div>
            <div>{time}</div>
        </>
    )
}
