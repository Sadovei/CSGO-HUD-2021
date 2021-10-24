import React, { useEffect, useState } from "react";
import { subscribeToRadar, subscribeToTopBar, subscribeToMessage, token, subscribeToCheckStream } from "./utils/socketIO";

import SmartTopBar from "./Components/SmartTopBar/SmartTopBar";
import SmartLeftSide from "./Components/SmartLeftSide/SmartLeftSide";
import SmartRightSide from "./Components/SmartRightSide/SmartRightSide";
import SmartDynamic from "./Components/SmartDynamic/SmartDynamic";
import RadarLayout from "./Components/Radar/Radar";
import CheckStream from "./Components/SmartDynamic/CheckStream/CheckStream";

function App() {
  const [topBar, setTopBar] = useState();
  const [objectData, setObjectData] = useState('');
  const [message, setMessage] = useState(null);
  const [radarToggle, setRadarToggle] = useState(false);
  const [checkStream, setCheckStream] = useState([0, { show: 'false' }, { text: '' }]);

  useEffect(() => {
    subscribeToTopBar(data => {
      setTopBar(data)
    })

    subscribeToRadar((data) => {
      setObjectData(data)
    });

    subscribeToMessage((data) => {
      setMessage(data)
    });

    if (token === 'igdir') {
      subscribeToCheckStream(data => {
        setCheckStream(data)
      })
    }
  }, [])
  useEffect(() => {
    if (message !== null) {
      if (message === 'refresh')
        window.location.reload();
      else if (message === 'radar-off')
        setRadarToggle(true)
      else if (message === 'radar-on')
        setRadarToggle(false)
      setMessage(null)
    }
  }, [message])

  if (topBar) {
    if (topBar.mapInfo.phase === 'gameover' && topBar.round.time <= 0) {
      return null
    } else
      return (
        <>
          <SmartTopBar topBarData={topBar} />
          <SmartRightSide />
          <SmartLeftSide />
          <SmartDynamic />
          {!radarToggle && objectData && <RadarLayout dataObj={objectData} />}
          {checkStream !== [0, false, ''] && <CheckStream data={checkStream[0]} show={checkStream[1].show} text={checkStream[2].text} />}
          {/* <Sponsors /> */}
        </>
      );
  }
  else
    return null
}

export default App;
