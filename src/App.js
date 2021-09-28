import React, { useEffect, useState } from "react";
import { subscribeToLeftSide, subscribeToRightSide, subscribeToTopBar } from "./utils/socketIO";

import CenterEconomy from "./Components/CenterEconomy/CenterEconomy";
import LeftSide from "./Components/LeftSide/LeftSide";
import RightSide from "./Components/RightSide/RightSide";
import TeamLogo from "./Components/TeamLogo/TeamLogo";

function App() {
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
            <TeamLogo data={topBar} />
          </div>

          <div className="second-wrapper">
            {leftSide &&
              <div className='left-wrapper'>
                <LeftSide team={leftSide.side} players={leftSide.players} phase={leftSide.roundPhase.phase} />
              </div>
            }

            {leftSide && rightSide &&
              <CenterEconomy dataLeft={leftSide} dataRight={rightSide} />
            }

            {rightSide &&
              <div className="right-wrapper">
                <RightSide team={rightSide.side} players={rightSide.players} phase={rightSide.roundPhase.phase} />
              </div>
            }

          </div>
        </>
      );
  }
  else
    return null
}

export default App;
