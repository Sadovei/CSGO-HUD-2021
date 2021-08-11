import React, { useEffect, useState } from "react";
import LeftSide from "./Components/LeftSide/LeftSide";
import RightSide from "./Components/RightSide/RightSide";
import TopBar from "./Components/TopBar/TopBar";
import PovSide from "./Components/PovSide/PovSide";
import { subscribeToPov } from "./utils/socketIO";

function App() {
  const [povData, setPovData] = useState(undefined);

  useEffect(() => {
    subscribeToPov(data => {
      setPovData(data)
    })
  }, [])
  return (
    <>
      <TopBar />
      <LeftSide />
      <RightSide />
      <PovSide povData={povData} />
      <div className="bk-ref"></div>
    </>
  );
}

export default App;
