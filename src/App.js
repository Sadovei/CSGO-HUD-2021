import React, { useEffect, useState } from "react";
import { subscribeToRadar, subscribeToTopBar } from "./utils/socketIO";

import SmartTopBar from "./Components/SmartTopBar/SmartTopBar";
import SmartLeftSide from "./Components/SmartLeftSide/SmartLeftSide";
import SmartRightSide from "./Components/SmartRightSide/SmartRightSide";
import SmartDynamic from "./Components/SmartDynamic/SmartDynamic";
import RadarLayout from "./Components/Radar/Radar";

function App() {
  const [topBar, setTopBar] = useState();
  const [objectData, setObjectData] = useState('');

  useEffect(() => {
    subscribeToTopBar(data => {
      setTopBar(data)
    })

    subscribeToRadar((data) => {
      setObjectData(data)
    });
  }, [])
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
          {objectData && <RadarLayout dataObj={objectData} />}
        </>
      );
  }
  else
    return null
}

export default App;
