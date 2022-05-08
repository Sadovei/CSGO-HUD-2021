import React, { useEffect, useState } from "react";
import { subscribeToTopBar } from "./utils/socketIO";

import TimeOutComponent from "./Components/TimeOutComponent/TimeOutComponent";

function App() {
  const [topBar, setTopBar] = useState({});

  useEffect(() => {
    subscribeToTopBar(data => {
      setTopBar(data)
    })
  }, [])
  return (
    <>
      {Object.keys(topBar).length > 0 && < TimeOutComponent topBar={topBar} />}
    </>
  );
}

export default App;
