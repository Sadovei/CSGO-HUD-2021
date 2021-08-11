import LeftSide from "./Components/LeftSide/LeftSide";
import React from "react";
import RightSide from "./Components/RightSide/RightSide";
import SmartPovSide from "./Components/SmartPovSide/SmartPovSide";
import TopBar from "./Components/TopBar/TopBar";

function App() {

  return (
    <>
      <TopBar />
      <LeftSide />
      <RightSide />
      <SmartPovSide />
      <div className="bk-ref"></div>
    </>
  );
}

export default App;
