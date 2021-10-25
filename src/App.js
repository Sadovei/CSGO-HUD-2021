import React, { useEffect, useState } from "react";

import SmartDynamic from "./Components/SmartDynamic/SmartDynamic";
import Sponsors from "./Components/Sponsors/Sponsors";
import { subscribeToTopBar } from "./utils/socketIO";

function App() {
  const [topBar, setTopBar] = useState(null);

  useEffect(() => {
    subscribeToTopBar(data => {
      setTopBar(data)
    })
  }, [])
  
  if (topBar !== null) {
    if (topBar.mapInfo.phase === "gameover")
      return null
    return (
      <>
        <SmartDynamic />
        <Sponsors />
      </>
    );
  } else
    return null
}

export default App;
