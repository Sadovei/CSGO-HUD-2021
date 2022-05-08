import './SponsorNr1.scss'

import React from 'react'
import { redisIP } from '../../../utils/URLParameters'

export default function SponsorNr1({ data, action }) {
    let leftLogo = data[0].teamKey
    let rightLogo = data[1].teamKey

    let cote = {
        left: {
            primu: data[0].odds.split('.')[0],
            doi: data[0].odds.split('.')[1]
        },
        right: {
            primu: data[1].odds.split('.')[0],
            doi: data[1].odds.split('.')[1]
        }
    }
    return (
        <div className={`sponsor-main-wrapper font-mont ${action}`}>
            <div className="left-side-wrapper">
                <div className="logo" style={{ backgroundImage: `url(http://${redisIP}/pgl/resources/csgo/team/${leftLogo}/logo.webp)` }}></div>

                <div className="cote-wrapper">
                    <p className="first-number">{cote.left.primu}</p>
                    <p className='dot'>.</p>
                    <p className="second-number">{cote.left.doi}</p>
                </div>
            </div>

            <div className="logoSponsor"></div>

            <div className="right-side-wrapper">
                <div className="cote-wrapper">
                    <p className="first-number">{cote.right.primu}</p>
                    <p className='dot'>.</p>
                    <p className="second-number">{cote.right.doi}</p>
                </div>

                <div className="logo" style={{ backgroundImage: `url(http://${redisIP}/pgl/resources/csgo/team/${rightLogo}/logo.webp)` }}></div>
            </div>
        </div>
    )

}
