import './HistoricRounds.scss'

import React from 'react'
import { redisIP } from '../../../utils/tools'

export default function HistoricRounds({ data, leftTeam, rightTeam, showContent }) {
    let leftLogo = leftTeam.nameKey === 'placeholder' ? `placeholder/${leftTeam.sideTeam === 'CT' ? 'CT' : 'T'}` : leftTeam.nameKey
    let rightLogo = rightTeam.nameKey === 'placeholder' ? `placeholder/${rightTeam.sideTeam === 'CT' ? 'CT' : 'T'}` : rightTeam.nameKey

    return (
        <div className={`historicRound-wrapper row ${showContent}`}>
            <div className='teams-wrapper col'>
                <div className='logo firstTeam' style={{
                    backgroundImage: `url(http://${redisIP}/pgl/resources/csgo/team/${leftLogo}/logo.webp)`
                }}></div>
                <div className='logo secondTeam' style={{
                    backgroundImage: `url(http://${redisIP}/pgl/resources/csgo/team/${rightLogo}/logo.webp)`
                }}></div>
            </div>

            <div className='rounds-wrapper row'>
                {Object.values(data).map((round, indexRound) => {
                    if (indexRound < 15) {
                        let topSide, bottomSide

                        if (round === "ct_win_time" || round === "ct_win_elimination" || round === "ct_win_defuse") {
                            topSide = round
                            bottomSide = ''
                        } else if (round === "t_win_elimination" || round === "t_win_bomb") {
                            topSide = ''
                            bottomSide = round
                        }

                        return <div className='round-wrapper col' key={indexRound}>
                            <div className={`top ${topSide}`}></div>
                            <div className='center'>{indexRound + 1}</div>
                            <div className={`bottom ${bottomSide}`}></div>
                        </div>
                    } else {
                        let topSide, bottomSide

                        if (round === "ct_win_time" || round === "ct_win_elimination" || round === "ct_win_defuse") {
                            bottomSide = round
                            topSide = ''
                        } else if (round === "t_win_elimination" || round === "t_win_bomb") {
                            topSide = round
                            bottomSide = ''
                        }

                        return <div className={`round-wrapper col ${indexRound === 15 ? 'makeSpace' : ''}`} key={indexRound}>
                            <div className={`top ${topSide}`}></div>
                            <div className='center'>{indexRound + 1}</div>
                            <div className={`bottom ${bottomSide}`}></div>
                            {indexRound === 15 && <div className='bar'></div>}
                        </div>
                    }
                })}
            </div>
        </div>
    )
}
