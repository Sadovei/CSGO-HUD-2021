import React, { useEffect, useState } from "react";

import Comercials from "./Components/Comercials/Comercials";
import SmartDynamic from "./Components/SmartDynamic/SmartDynamic";
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
        <Comercials phase={topBar.round.phase} />
        <SmartDynamic />
      </>
    );
  } else
    return null
}

export default App;
