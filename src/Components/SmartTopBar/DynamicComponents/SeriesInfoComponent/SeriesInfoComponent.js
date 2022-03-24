import './SeriesInfoComponent.scss'

import React from 'react'
import { range } from '../../../../utils/tools'

export default function SeriesInfoComponent({ mapInfo, leftSide, rightSide }) {
    let leftWin = 0
    let rightWin = 0

    Object.values(mapInfo.vetoLegend).forEach((info) => {
        if (info[leftSide.nameKey] < info[rightSide.nameKey])
            rightWin += 1
        if (info[leftSide.nameKey] > info[rightSide.nameKey])
            leftWin += 1
    })

    const mapsToWin = range(1, (mapInfo.bestOf / 2).toFixed(0))

    return (
        <div className='seriesInfo-wrapper row'>
            <div className='leftInfo-wrapper row'>
                {mapsToWin.map((map, index) => (
                    <div
                        className={`map ${map} ${leftWin > index ? 'win' : 'lose'
                            }`}
                        key={index}
                    ></div>
                ))}
            </div>

            <div className='status-match-wrapper'>
                {mapInfo.currentRound < 30 ||
                    (mapInfo.currentRound === 30 &&
                        leftSide.score !== rightSide.score) ? (
                    <p className='current-status font-tablet'>{`ROUND ${mapInfo.currentRound + 1}`}</p>
                ) : (
                    <p className='current-status font-tablet'>{`Round ${Number(
                        (mapInfo.currentRound % 6) + 1
                    )}/6 OT${Math.floor(
                        (mapInfo.currentRound - 30) / 6 + 1
                    )}`}</p>
                )}
            </div>

            <div className='rightInfo-wrapper row'>
                {mapsToWin.map((map, index) => (
                    <div
                        className={`map ${map} ${rightWin > index ? 'win' : 'lose'
                            }`}
                        key={index}
                    ></div>
                ))}
            </div>
        </div>
    )
}
