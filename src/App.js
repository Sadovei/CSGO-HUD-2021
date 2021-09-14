import React, { useEffect, useState } from "react";
import { subscribeToTopBar } from "./utils/socketIO";

import SmartTopBar from "./Components/SmartTopBar/SmartTopBar";
import SmartLeftSide from "./Components/SmartLeftSide/SmartLeftSide";
import SmartRightSide from "./Components/SmartRightSide/SmartRightSide";
import SmartDynamic from "./Components/SmartDynamic/SmartDynamic";

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
          {/* <SmartTopBar topBarData={topBar} /> */}
          <SmartRightSide />
          <SmartLeftSide />
          {/* <SmartDynamic /> */}
        </>
      );
  }
  else
    return null
}

export default App;
