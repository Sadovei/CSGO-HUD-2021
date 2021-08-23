import React, { useEffect, useState } from 'react'

import PovSide from './PovSide/PovSide';
import { subscribeToPov } from '../../utils/socketIO';
import imagesPlayer from '../../utils/imagesPlayer';

export default function SmartPovSide() {
    const [povData, setPovData] = useState();

    useEffect(() => {
        subscribeToPov(data => {
            setPovData(data)
        })
    }, [])

    if (povData === undefined || povData.steamid === undefined) {
        return null;
    }
    else {
        let ImagePlayer = imagesPlayer(povData)
        return <PovSide povData={povData}
            DefuseIMG={ImagePlayer.DefuseIMG}
            grenadeImg={ImagePlayer.grenadeImg}
            BombIMG={ImagePlayer.BombIMG}
            PistolIMG={ImagePlayer.PistolIMG}
            WeaponIMG={ImagePlayer.WeaponIMG}
            activeWeapon={ImagePlayer.activeWeapon}
            ammoFillAnim={ImagePlayer.ammoFillAnim} />;
    }
}
