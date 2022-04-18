import React, { useEffect, useState } from "react";
import { subscribeToParser, subscribeToTopBar } from "./utils/socketIO";

import Comercials from "./Components/Comercials/Comercials";
import SmartDynamic from "./Components/SmartDynamic/SmartDynamic";

function App() {
  const [topBar, setTopBar] = useState({ round: { phase: "" } });

  useEffect(() => {
    subscribeToTopBar(data => {
      setTopBar(data)
    })
  }, [])

  return (
    <>
      <Comercials phase={topBar.round.phase} />
      <SmartDynamic />
    </>
  );
}

export default App;
