import React, { useEffect, useState } from "react";

import Comercials from "./Components/Comercials/Comercials";
import SmartDynamic from "./Components/SmartDynamic/SmartDynamic";
import { subscribeToParser } from "./utils/socketIO";

function App() {
  const [sponsor, setSponsor] = useState({ data: {}, type: '', show: false });

  useEffect(() => {
    subscribeToParser(data => {
      setSponsor(data)
    })
  }, [])

  return (
    <>
      <Comercials />
      <SmartDynamic data={sponsor} />
    </>
  );

}

export default App;
