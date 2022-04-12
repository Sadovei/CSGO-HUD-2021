import React, { useEffect, useState } from "react";
import { subscribeToParser, subscribeToTopBar } from "./utils/socketIO";

import Comercials from "./Components/Comercials/Comercials";
import SmartDynamic from "./Components/SmartDynamic/SmartDynamic";

function App() {
  const [topBar, setTopBar] = useState({ round: { phase: "" } });
  const [sponsor, setSponsor] = useState({ data: {}, type: '', show: false });

  useEffect(() => {
    subscribeToTopBar(data => {
      setTopBar(data)
    })

    subscribeToParser(data => {
      setSponsor(data)
    })
  }, [])

  return (
    <>
      <Comercials phase={topBar.round.phase} />
      <SmartDynamic data={sponsor} />
    </>
  );
}

export default App;
