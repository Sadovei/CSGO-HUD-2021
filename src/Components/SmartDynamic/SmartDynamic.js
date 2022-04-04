import React, { useEffect, useState } from 'react'

import CheckStream from './CheckStream/CheckStream'
import HeadToHead from './HeadToHead/HeadToHead'
import SmartPovSide from '../SmartPovSide/SmartPovSide'

export default function SmartDynamic({ parserData }) {
  const [showHeadtoHead, setShowHeadtoHead] = useState('none')
  const [showCheckStream, setShowCheckStream] = useState('none')
  const [showPOV, setShowPOV] = useState('show')

  useEffect(() => {
    if (parserData.type !== '') {
      if (parserData.type === 'Head2Head') {
        if (parserData.show) {
          setShowHeadtoHead('show')
          setShowPOV('hide')
        } else {
          setShowHeadtoHead('hide')
          setShowPOV('show')
        }
      } else if (parserData.type === 'Check_Stream') {
        if (parserData.show) {
          setShowCheckStream('show')
        } else {
          setShowCheckStream('hide')
        }
      } else if (parserData.type === 'Odds') {
        if (parserData.show)
          setShowPOV('hide')
        else
          setShowPOV('show')
      }
    }
  }, [parserData])

  return (
    <>
      {parserData.type === 'Head2Head' && <HeadToHead dataH2H={parserData.data} action={showHeadtoHead} />}

      {parserData.type === 'Check_Stream' && <CheckStream data={parserData.data} show={showCheckStream} />}

      <SmartPovSide action={showPOV} />
    </>
  )
}
