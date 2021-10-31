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

  if (povData === undefined || povData.playerName === '') {
    return null
  } else {
    let ImagePlayer = imagesPlayer(povData)

    return (
      <PovSide
        povData={povData}
        DefuseIMG={ImagePlayer.DefuseIMG}
        grenadeImg={ImagePlayer.grenadeImg}
        BombIMG={ImagePlayer.BombIMG}
        PistolIMG={ImagePlayer.PistolIMG}
        WeaponIMG={ImagePlayer.WeaponIMG}
        activeWeapon={ImagePlayer.activeWeapon}
        ammoFillAnim={ImagePlayer.ammoFillAnim}
        action={action}
      />
    )
  }
}
