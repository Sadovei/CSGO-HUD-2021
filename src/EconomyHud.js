import React, { useEffect, useState } from "react";
import { subscribeToLeftSide, subscribeToRightSide, subscribeToTopBar } from "./utils/socketIO";

import CenterVideo from "./Economy/CenterVideo/CenterVideo";
import LeftSide from "./Economy/LeftSide/LeftSide";
import RightSide from "./Economy/RightSide/RightSide";
import Teams from "./Economy/Teams/Teams";

export default function EconomyHud() {
    const [topBar, setTopBar] = useState();
    const [leftSide, setLeftSide] = useState();
    const [rightSide, setRightSide] = useState();

    useEffect(() => {
        subscribeToTopBar(data => {
            setTopBar(data)
        })

        subscribeToLeftSide(data => {
            setLeftSide(data)
        })

        subscribeToRightSide(data => {
            setRightSide(data)
        })
    }, [])
    if (topBar) {
        if (topBar.mapInfo.phase === 'gameover' && topBar.round.time <= 0)
            return null
        else
            return (
                <>
                    <div className="first-wrapper">
                        <Teams data={topBar} />
                    </div>

                    <div className="second-wrapper">
                        {leftSide &&
                            <div className='left-wrapper economy-hud'>
                                <LeftSide team={leftSide.side} players={leftSide.players} phase={leftSide.roundPhase.phase} dataEconomy={leftSide.economy} />
                            </div>
                        }

                        <CenterVideo map={topBar.mapInfo.mapName} />

                        {rightSide &&
                            <div className="right-wrapper economy-hud">
                                <RightSide team={rightSide.side} players={rightSide.players} phase={rightSide.roundPhase.phase} dataEconomy={rightSide.economy} />
                            </div>
                        }

                    </div>
                </>
            );
    }
    else
        return null
}
