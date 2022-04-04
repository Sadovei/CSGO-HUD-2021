import './SponsorNr1.scss'

import React from 'react'

let dataFetch

export default function SponsorNr1({ data, action }) {
    if (data !== null) {
        dataFetch = data
    }

    if (dataFetch) {
        let leftLogo = dataFetch[0].teamKey
        let rightLogo = dataFetch[1].teamKey

        let cote = {
            left: {
                primu: dataFetch[0].odds.split('.')[0],
                doi: dataFetch[0].odds.split('.')[1]
            },
            right: {
                primu: dataFetch[1].odds.split('.')[0],
                doi: dataFetch[1].odds.split('.')[1]
            }
        }

        return (
            <div className={`sponsor-main-wrapper font-mont ${action}`}>
                <div className="left-side-wrapper">
                    <div className="logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${leftLogo}/logo.webp)` }}></div>

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

                    <div className="logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${rightLogo}/logo.webp)` }}></div>
                </div>
            </div>
        )
    } else
        return null
}
