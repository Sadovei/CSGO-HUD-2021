import React from 'react'
import './SponsorNr1.scss'

let dataFetch

export default function SponsorNr1({ data, action }) {
    if (data !== null) {
        dataFetch = [
            {
                "teamName": "Copenhagen Flames",
                "shortName": "Copenhagen",
                "teamKey": "g2_esports",
                "odds": "2.00"
            },
            {
                "teamName": "Copenhagen Flames",
                "shortName": "Copenhagen F.",
                "teamKey": "natus_vincere",
                "odds": "2.76"
            }
        ]
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
                    <div className="logos-wrapper">
                        <div className="primary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${leftLogo}/logo.webp)` }}></div>
                        <div className="secondary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${leftLogo}/logo.webp)` }}></div>
                    </div>

                    <p className="team-name">{dataFetch[0].shortName}</p>

                    <div className="cote-wrapper">
                        <p className="first-number">{cote.left.primu}</p>
                        <p className='dot'>.</p>
                        <p className="second-number">{cote.left.doi}</p>
                    </div>
                </div>

                <div className="right-side-wrapper">
                    <div className="cote-wrapper">
                        <p className="first-number">{cote.right.primu}</p>
                        <p className='dot'>.</p>
                        <p className="second-number">{cote.right.doi}</p>
                    </div>

                    <p className="team-name">{dataFetch[1].shortName}</p>

                    <div className="logos-wrapper">
                        <div className="primary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${rightLogo}/logo.webp)` }}></div>
                        <div className="secondary-logo" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${rightLogo}/logo.webp)` }}></div>
                    </div>
                </div>
            </div>
        )
    } else
        return null
}
