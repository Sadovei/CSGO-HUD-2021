import React, { useEffect, useState } from 'react'
import {
  subscribeToHead2Head,
  subscribeToScoreBoard,
  token,
  unsubscribeToHead2Head,
  unsubscribeToScoreBoard,
  unsubscribeToSponsorNr1
} from '../../utils/socketIO'

import HeadToHead from './HeadToHead/HeadToHead'
import ScoreBoard from './ScoreBoard/ScoreBoard'
import SmartPovSide from '../SmartPovSide/SmartPovSide'

export default function SmartDynamic() {
  const [head2Head, setHead2Head] = useState(null)
  const [scoreBoard, setScoreBoard] = useState(null)

  useEffect(() => {
    if (token === 'igdir') {
      subscribeToHead2Head((data) => {
        setHead2Head(data)
      })

      subscribeToScoreBoard((data) => {
        setScoreBoard(data)
      })
    }
    return {
      unsubscribeToHead2Head,
      unsubscribeToScoreBoard,
      unsubscribeToSponsorNr1
    }
  }, [])

  if (head2Head !== null && scoreBoard === null) {
    return (
      <>
        <HeadToHead data={head2Head} action={'show'} />
        <ScoreBoard data={null} action={'hide'} />
        <SmartPovSide action={'hide'} />
      </>
    )
  } else if (scoreBoard !== null && head2Head === null) {
    return (
      <>
        <ScoreBoard data={scoreBoard} action={'show'} />
        <HeadToHead data={null} action={'hide'} />
        <SmartPovSide action={'hide'} />
      </>
    )
  } else if (scoreBoard === null && head2Head === null) {
    return (
      <>
        <ScoreBoard data={null} action={'hide'} />
        <HeadToHead data={null} action={'hide'} />
        <SmartPovSide action={'hide'} />
      </>
    )
  } else if (scoreBoard === null && head2Head === null) {
    return (
      <>
        <ScoreBoard data={scoreBoard} action={'hide'} />
        <HeadToHead data={head2Head} action={'hide'} />
        <SmartPovSide action={'show'} />
      </>
    )
  }
}
