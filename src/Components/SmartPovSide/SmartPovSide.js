import React, { useEffect, useState } from 'react'
import { subscribeToPov, unsubscribeToPov } from '../../utils/socketIO'

import PovSide from './PovSide/PovSide'
import imagesPlayer from '../../utils/imagesPlayer'

export default function SmartPovSide({ action }) {
  const [povData, setPovData] = useState()

  useEffect(() => {
    subscribeToPov((data) => {
      setPovData(data)
    })
    return unsubscribeToPov
  }, [])

  if (povData && Object.keys(povData).length > 1) {
    let ImagePlayer = imagesPlayer(povData.weapons, povData.state, povData.observer_slot)

    return (
      <PovSide
        povData={povData}
        DefuseIMG={ImagePlayer.DefuseIMG}
        grenadeImg={ImagePlayer.grenadeImg}
        BombIMG={ImagePlayer.BombIMG}
        activeWeapon={ImagePlayer.activeWeapon}
        action={action}
      />
    )
  }
  return null
}
