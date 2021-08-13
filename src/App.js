import React from "react";
import SmartLeftSide from "./Components/SmartLeftSide/SmartLeftSide";
import SmartRightSide from "./Components/SmartRightSide/SmartRightSide";
import SmartPovSide from "./Components/SmartPovSide/SmartPovSide";
import SmartTopBar from "./Components/SmartTopBar/SmartTopBar";

function App() {

  return (
    <>
      <SmartTopBar />
      <SmartRightSide />
      <SmartPovSide />
      <SmartLeftSide />
      <div className="bk-ref"></div>
    </>
  );
}

export default App;
