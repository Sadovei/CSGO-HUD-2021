import React, { useEffect, useRef, useState } from 'react'
import './VetoLegends.scss'

export default function VetoLegends({ vetoInfo, phase }) {
    const [animClass, setAnimClass] = useState('');
    const [flag, setFlag] = useState(false);
    const updateStart = useRef(null);
    let index = 0

    useEffect(() => {
        if (!updateStart.current) {
            setUpdate(phase);
        }
    }, [phase, setUpdate]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function setUpdate(phase) {
        if (phase === 'freezetime' || phase === 'timeout_t' || phase === 'timeout_ct') {
            setAnimClass('showStart');
            setFlag(true)
        }

        if (phase === 'live' && flag) {
            updateStart.current = setTimeout(() => {
                setAnimClass('hideStart');
                updateStart.current = null;
                setFlag(false)
            }, 5000);
        }
    }

    return (
        <div className="main-wrapper">
            <div className={`veto-legends-wrapper font-tablet ${animClass}`}>
                {Object.entries(vetoInfo).map((map, indexMap) => {

                    return (
                        <div key={indexMap} className="map">
                            <div className="first-row">
                                <p className="map-name">{map[0]}</p>
                                {map[1].leftTeamScore === null && index === 0 && (index = indexMap,
                                    <p className="current">Current</p>)
                                }

                                {map[1].leftTeamScore === null && index < indexMap &&
                                    <div className="info-wrapper">
                                        <div className="logo-left" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${map[1].leftTeamKey}/logo.png)` }}></div>
                                        <p className="score-notice">vs</p>
                                        <div className="logo-right" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${map[1].rightTeamKey}/logo.png)` }}></div>
                                    </div>
                                }

                                {map[1].leftTeamScore !== null &&
                                    <div className="info-wrapper">
                                        <div className="logo-left" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${map[1].leftTeamKey}/logo.png)` }}></div>
                                        <p className="score-left">{map[1].leftTeamScore}</p>
                                        <p className="score-notice">-</p>
                                        <p className="score-right">{map[1].rightTeamScore}</p>
                                        <div className="logo-right" style={{ backgroundImage: `url(http://redis-birou.pgl.ro/pgl/resources/csgo/team/${map[1].rightTeamKey}/logo.png)` }}></div>
                                    </div>
                                }
                            </div>
                            <div className="second-row">
                                <p className="map-notice">PICKED BY</p>
                                <p className="map-text">{map[1].pickName}</p>
                            </div>
                        </div>
                    )
                })}
            </div >
        </div>
    )
}
