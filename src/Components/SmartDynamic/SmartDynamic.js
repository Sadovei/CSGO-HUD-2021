import React, { useEffect, useRef, useState } from 'react'
import { subscribeToHead2Head, token, unsubscribeToHead2Head } from '../../utils/socketIO'

import HeadToHead from './HeadToHead/HeadToHead'
import SmartPovSide from '../SmartPovSide/SmartPovSide'

export default function SmartDynamic() {
  const [head2Head, setHead2Head] = useState(null)
  const showHeadtoHead = useRef('none')

  useEffect(() => {
    if (token === 'igdir') {
      subscribeToHead2Head((data) => {
        setHead2Head(data)
      })
    }

    if (head2Head !== null)
      showHeadtoHead.current = 'show'
    else if (showHeadtoHead.current !== 'show')
      showHeadtoHead.current = 'hide'

    return { unsubscribeToHead2Head }
  }, [head2Head])

  if (head2Head !== null) {
    return (
      <>
        <HeadToHead data={head2Head} action={showHeadtoHead.current} />
        <SmartPovSide action={'hide'} />
      </>
    )
  } else if (head2Head === null) {
    return (
      <>
        <HeadToHead data={head2Head} action={showHeadtoHead.current} />
        <SmartPovSide action={'show'} />
      </>
    )
  }
}
