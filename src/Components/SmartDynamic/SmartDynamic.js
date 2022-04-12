import React, { useEffect, useState } from 'react'

import SponsorNr1 from './SponsorNr1/SponsorNr1';
import { subscribeToParser } from "../../utils/socketIO";

export default function SmartDynamic() {
  const [showSponsor, setShowSponsor] = useState('none')
  const [sponsor, setSponsor] = useState({ data: {}, type: '', show: false });

  useEffect(() => {
    subscribeToParser(data => {
      setSponsor(data)
    })
  }, [])

  useEffect(() => {
    if (sponsor.type !== '') {
      if (sponsor.type === 'Odds') {
        if (sponsor.show)
          setShowSponsor('show')
        else
          setShowSponsor('hide')
      }
    } else
      setShowSponsor('none')
  }, [sponsor])

  return (
    <>
      {sponsor.type === 'Odds' && <SponsorNr1 data={sponsor.data} action={showSponsor} />}
    </>
  )
}
