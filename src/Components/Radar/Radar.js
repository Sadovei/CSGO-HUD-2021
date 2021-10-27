import './Radar.scss'
import React, { createRef, useEffect, useState } from 'react'
import PlayerCanvas from './PlayerCanvas/PlayerCanvas'

export default function RadarLayout({ dataObj }) {
  const [mapName, setMapName] = useState(
    dataObj.map.name.includes('/')
      ? dataObj.map.name.split('/')[2] + '_radar'
      : dataObj.map.name + '_radar'
  )
  const [lowerRadar, setLowerRadar] = useState('.webp')
  useEffect(() => {
    if (dataObj.map.name !== mapName) {
      dataObj.map.name.includes('/')
        ? setMapName(dataObj.map.name.split('/')[2] + '_radar')
        : setMapName(dataObj.map.name + '_radar')
    }

    Object.keys(dataObj.players).forEach((steamID) => {
      if (dataObj.players[steamID].observed) {
        const posOb = dataObj.players[steamID].gameData.position.split(',')
        if (mapName === 'de_nuke_radar' && posOb[2] < -495) {
          setLowerRadar('_lower.webp')
        } else if (mapName === 'de_vertigo_radar' && posOb[2] < 11700) {
          setLowerRadar('_lower.webp')
        } else setLowerRadar('.webp')
      }
    })
    return null
    // eslint-disable-next-line
  }, [dataObj.players, dataObj.map.name])

  const terrorImage = createRef()
  const ctImage = createRef()
  const directionIndicator = createRef()
  const selectedIndicator = createRef()
  const bullet = createRef()
  const observedBool = createRef()
  const deadCS = createRef()
  const deadTerror = createRef()
  const bombImg = createRef()
  const bmbPlanted = createRef()
  const fragT = createRef()
  const fragCT = createRef()
  const explodeFragT = createRef()
  const explodeFragCT = createRef()
  const flashBangT = createRef()
  const flashBangCT = createRef()
  const smokeT = createRef()
  const smokeCT = createRef()
  const smokeBlastT = createRef()
  const smokeBlastCT = createRef()
  const incGrenadeCT = createRef()
  const incGrenareT = createRef()

  const playersData = Object.keys(dataObj.players).map(
    (playersData, elemIndex) => {
      return (
        <PlayerCanvas
          key={elemIndex}
          ctImgs={ctImage}
          terrorImg={terrorImage}
          bulletIndicator={bullet}
          selectedIndicator={selectedIndicator}
          observedBool={observedBool}
          deadCs={deadCS}
          deadTerror={deadTerror}
          bombImg={bombImg}
          bmbPlanted={bmbPlanted}
          mapname={mapName}
          directionIndicator={directionIndicator}
          playerdata={dataObj.players[playersData]}
          bombData={dataObj.bomb}
          fragT={fragT}
          fragCT={fragCT}
          flashBangT={flashBangT}
          flashBangCT={flashBangCT}
          explodeFragT={explodeFragT}
          explodeFragCT={explodeFragCT}
          smokeT={smokeT}
          smokeCT={smokeCT}
          smokeBlastT={smokeBlastT}
          smokeBlastCT={smokeBlastCT}
          incGrenadeCT={incGrenadeCT}
          incGrenareT={incGrenareT}
          playerIndex={elemIndex}
          playerSteam={playersData}
        />
      )
    }
  )

  return (
    <div className={`radar-wrapper ${mapName}`}>
      <div
        className='row canvasWrapper'
        style={{
          backgroundImage: `url(http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/maps/${
            mapName + lowerRadar
          })`
        }}
      />
      {playersData}
      <div>
        <img
          ref={terrorImage}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/smarald/t-slot-elipse.webp'
          }
        />
        <img
          ref={ctImage}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/smarald/ct-slot-elipse.webp'
          }
        />
        <img
          ref={directionIndicator}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/map_direction_indicator_centered.webp'
          }
        />
        <img
          ref={selectedIndicator}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/map_view_selected_centered.webp'
          }
        />
        <img
          ref={bullet}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/shootBullet.svg'
          }
        />
        <img
          ref={observedBool}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/map_view_selected_centered.webp'
          }
        />
        <img
          ref={deadTerror}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/deadTerror.svg'
          }
        />
        <img
          ref={deadCS}
          style={{ display: 'none' }}
          alt=''
          src={'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/deadCS.svg'}
        />
        <img
          ref={bombImg}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/bomb_c4.svg'
          }
        />
        <img
          ref={bmbPlanted}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/bomb_c4 - planted.svg'
          }
        />
        <img
          ref={fragT}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/fragGrenadeT.svg'
          }
        />
        <img
          ref={fragCT}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/fragGrenadeCT.svg'
          }
        />
        <img
          ref={explodeFragT}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/explosionFragGT.svg'
          }
        />
        <img
          ref={explodeFragCT}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/explosionFragGCT.svg'
          }
        />
        <img
          ref={flashBangT}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/flashbangTerror.svg'
          }
        />
        <img
          ref={flashBangCT}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/flashbangCT.svg'
          }
        />
        <img
          ref={smokeT}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/smokegrenadeT.svg'
          }
        />
        <img
          ref={smokeCT}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/smokeGrenadeCT.svg'
          }
        />
        <img
          ref={smokeBlastT}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/smarald/smokeBlastT.webp'
          }
        />
        <img
          ref={smokeBlastCT}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/smarald/smokeBlastCT.webp'
          }
        />
        <img
          ref={incGrenadeCT}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/incgrenade-blue.webp'
          }
        />
        <img
          ref={incGrenareT}
          style={{ display: 'none' }}
          alt=''
          src={
            'http://redis-birou.pgl.ro/pgl/CSGO-2021/radar/icons/molotov-orange.webp'
          }
        />
      </div>
    </div>
  )
}
