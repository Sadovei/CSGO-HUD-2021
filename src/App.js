import React, { useEffect, useState } from "react";
import { subscribeToTopBar } from "./utils/socketIO";

import TimeOutComponent from "./Components/TimeOutComponent/TimeOutComponent";

function App() {
  const [topBar, setTopBar] = useState({ round: { phase: "" } });

  useEffect(() => {
    subscribeToTopBar(data => {
      setTopBar(data)
    })
  }, [])
  console.log(topBar);
  return (
    <>
      <TimeOutComponent typeOfPause={topBar.round.phase} time={topBar.round.time} />
    </>
  );
}

export default App;
