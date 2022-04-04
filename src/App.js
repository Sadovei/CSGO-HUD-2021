import React, { useEffect, useState } from "react";
import { subscribeToParser, subscribeToTopBar } from "./utils/socketIO";

import Comercials from "./Components/Comercials/Comercials";
import SmartDynamic from "./Components/SmartDynamic/SmartDynamic";

function App() {
  const [topBar, setTopBar] = useState(null);
  const [sponsor, setSponsor] = useState({ data: {}, type: '', show: false });

  useEffect(() => {
    subscribeToTopBar(data => {
      setTopBar(data)
    })

    subscribeToParser(data => {
      setSponsor(data)
    })
  }, [])

  if (topBar !== null) {
    if (topBar.mapInfo.phase === "gameover")
      return null
    return (
      <>
        <Comercials phase={topBar.round.phase} />
        <SmartDynamic data={sponsor} />
      </>
    );
  } else
    return null
}

export default App;
