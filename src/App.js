import React, { useEffect, useState } from "react";
import { subscribeToRadar, subscribeToTopBar, subscribeToMessage } from "./utils/socketIO";

import SmartTopBar from "./Components/SmartTopBar/SmartTopBar";
import SmartLeftSide from "./Components/SmartLeftSide/SmartLeftSide";
import SmartRightSide from "./Components/SmartRightSide/SmartRightSide";
import SmartDynamic from "./Components/SmartDynamic/SmartDynamic";
import RadarLayout from "./Components/Radar/Radar";

function App() {
  const [topBar, setTopBar] = useState();
  const [objectData, setObjectData] = useState('');
  const [message, setMessage] = useState(null);
  const [radarToggle, setRadarToggle] = useState(false);

  useEffect(() => {
    subscribeToTopBar(data => {
      setTopBar(data)
    })

    subscribeToRadar((data) => {
      setObjectData(data)
    });

    subscribeToMessage((data) => {
      setMessage(data)
    });
  }, [])

  useEffect(() => {
    if (message !== null) {
      if (message === 'refresh')
        window.location.reload();
      else if (message === 'radar-off')
        setRadarToggle(true)
      else if (message === 'radar-on')
        setRadarToggle(false)
      setMessage(null)
    }
  }, [message])

  if (topBar) {
    if (topBar.mapInfo.phase === 'gameover' && topBar.round.time <= 0) {
      return null
    } else
      return (
        <>
          <SmartTopBar topBarData={topBar} />
          <SmartRightSide />
          <SmartLeftSide />
          <SmartDynamic />
          {!radarToggle && objectData && <RadarLayout dataObj={objectData} />}
        </>
      );
  }
  else
    return null
}

export default App;
