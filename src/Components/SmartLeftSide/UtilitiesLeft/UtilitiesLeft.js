import React, { useEffect, useRef, useState } from 'react'
import { CostGrenades, SVGMap } from '../../../utils/tools'
import './UtilitiesLeft.scss'

export default function UtilitiesLeft({ utilities, team, phase }) {
    const [animClass, setAnimClass] = useState('');
    const updateStart = useRef(null);

    let HeIMG = SVGMap.hegrenade;
    let SmokeIMG = SVGMap.smokegrenade;
    let FlashIMG = SVGMap.flashbang;
    let IncendiaryIMG = team === 'CT' ? SVGMap.incgrenade : SVGMap.molotov;
    let noIncendiary = team === 'CT' ? utilities.weapon_incgrenade : utilities.weapon_molotov
    let constUtilities = CostGrenades(utilities, team)

    useEffect(() => {
        if (!updateStart.current) {
            setUpdate(phase.phase);
        }
    }, [phase.phase]);

    function setUpdate(phase) {
        if (phase === 'freezetime' || phase === 'timeout_t' || phase === 'timeout_ct') {
            setAnimClass("showStart");
        }

        if (phase === 'live') {
            updateStart.current = setTimeout(() => {
                setAnimClass("hideStart");
                updateStart.current = null;
            }, 5000);
        }

        if (phase === 'bomb') {
            setAnimClass("showBomb");

            updateStart.current = setTimeout(() => {
                setAnimClass("hideBomb");
                updateStart.current = null;
            }, 5000);
        }
    }


    return (
        <div className={`utility-wrapper ${team} font-tablet ${animClass}`}>
            <div className="bk-color">
                <div className="text-wrapper">
                    <p className="dynamic">{constUtilities}</p>
                    <p className="text-notice">UTILITY</p>
                </div>

                <div className='grenade incendiary-wrapper'>
                    <IncendiaryIMG />
                    <p className="numberOf">X{noIncendiary}</p>
                </div>

                <div className='grenade smoke-wrapper'>
                    <SmokeIMG />
                    <p className="numberOf">X{utilities.weapon_smokegrenade}</p>
                </div>

                <div className='grenade flash-wrapper'>
                    <FlashIMG />
                    <p className="numberOf">X{utilities.weapon_flashbang}</p>
                </div>

                <div className='grenade he-wrapper'>
                    <HeIMG />
                    <p className="numberOf">X{utilities.weapon_hegrenade}</p>
                </div>
            </div>
        </div>
    )
}
