import React from 'react'
import logo from '../../assets/videos/logo.webm'
import './CenterEconomy.scss'

export default function CenterEconomy({ dataLeft, dataRight }) {
    return (
        <div className='center-wrapper'>
            <div className={`left-center-wrapper ${dataLeft.side}`}>
                <div className="team-money-wrapper">
                    <p className="money font-tablet">${dataLeft.economy.remaining_money}</p>
                    <p className="text-money font-tablet">TEAM MONEY</p>
                </div>

                <div className="equipment-wrapper">
                    <p className="equipment font-tablet">${dataLeft.economy.eq_value}</p>
                    <p className="text-equipment font-tablet">EQUIPMENT MONEY</p>
                </div>
            </div>

            <video className="video-logo" src={logo} loop autoPlay={true} preload="true" muted={true}></video>

            <div className={`right-center-wrapper ${dataRight.side}`}>
                <div className="team-money-wrapper">
                    <p className="money font-tablet">${dataRight.economy.remaining_money}</p>
                    <p className="text-money font-tablet">TEAM MONEY</p>
                </div>

                <div className="equipment-wrapper">
                    <p className="equipment font-tablet">${dataRight.economy.eq_value}</p>
                    <p className="text-equipment font-tablet">EQUIPMENT MONEY</p>
                </div>
            </div>
        </div>
    )
}
