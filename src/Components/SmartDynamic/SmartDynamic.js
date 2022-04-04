import React, { useEffect, useState } from 'react'

import SponsorNr1 from './SponsorNr1/SponsorNr1';

export default function SmartDynamic({ data }) {
  const [showSponsor, setShowSponsor] = useState('none')
  useEffect(() => {
    if (data.type !== '') {
      if (data.type === 'Odds') {
        if (data.show)
          setShowSponsor('show')
        else
          setShowSponsor('hide')
      }
    } else
      setShowSponsor('none')
  }, [data])

  if (data?.type === 'Odds')
    return (
      <SponsorNr1 data={data.data} action={showSponsor} />
    )
  else
    return null
}
