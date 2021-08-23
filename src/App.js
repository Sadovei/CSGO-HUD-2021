import React, { useEffect, useState } from "react";
import SmartLeftSide from "./Components/SmartLeftSide/SmartLeftSide";
import SmartRightSide from "./Components/SmartRightSide/SmartRightSide";
import SmartPovSide from "./Components/SmartPovSide/SmartPovSide";
import SmartTopBar from "./Components/SmartTopBar/SmartTopBar";
import { subscribeToTopBar } from "./utils/socketIO";

function App() {
  const [topBar, setTopBar] = useState();

  useEffect(() => {
    subscribeToTopBar(data => {
      setTopBar(data)
    })
  }, [])
  if (topBar) {
    if (topBar.mapInfo.phase === 'gameover' && topBar.round.time <= 0)
      return null
    else
      return (
        <>
          <SmartTopBar topBarData={topBar} />
          <SmartRightSide />
          <SmartPovSide />
          <SmartLeftSide />
        </>
      );
  }
  else
    return null
}

export default App;
