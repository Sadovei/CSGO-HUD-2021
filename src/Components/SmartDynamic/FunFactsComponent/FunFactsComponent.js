import './FunFactsComponent.scss'

// import { animated, useSpring } from 'react-spring'

// import React from 'react'
// import { redisIP } from '../../../utils/tools'

export default function FunFactsComponent({ dataH2H, show }) {
  // const props = useSpring({
  //   bottom: show === 'show' ? '1vw' : '-25vw',
  //   delay: show === 'show' ? 250 : 0
  // })
  // let leftPicturePlayer = `http://${redisIP}/pgl/resources/csgo/team/${dataH2H.leftPlayer.teamKey}/${dataH2H.leftPlayer.playerKey}.webp`
  // let rightPicturePlayer = `http://${redisIP}/pgl/resources/csgo/team/${dataH2H.rightPlayer.teamKey}/${dataH2H.rightPlayer.playerKey}.webp`
  
  return null

  // return (
  //   <animated.div className='funFacts-wrapper  row' style={{ bottom: props.bottom }}>
  //     <div className='leftSide-wrapper player'>
  //       <div className='image-player' style={{ backgroundImage: `url(${leftPicturePlayer})` }}></div>

  //       <div className='info-wrapper col'>
  //         <p className='nickName'>{dataH2H.leftPlayer.playerName}</p>
  //       </div>
  //     </div>

  //     <div className='h2h-info-wrapper col'>
  //       <div className='specificKills-wrapper info col'>
  //         <p className={`number number-left ${dataH2H.leftPlayer.specificKills > dataH2H.rightPlayer.specificKills ? '' : 'small'}`}>{dataH2H.leftPlayer.specificKills}</p>
  //         <p className='title'>DIRECT DUELS WON</p>
  //         <p className={`number number-right ${dataH2H.leftPlayer.specificKills < dataH2H.rightPlayer.specificKills ? '' : 'small'}`}>{dataH2H.rightPlayer.specificKills}</p>
  //       </div>

  //       <div className='accuracy-wrapper info col'>
  //         <p className={`number number-left ${dataH2H.leftPlayer.accuracy > dataH2H.rightPlayer.accuracy ? '' : 'small'}`}>{dataH2H.leftPlayer.accuracy}%</p>
  //         <p className='title'>ACCURACY</p>
  //         <p className={`number number-right ${dataH2H.leftPlayer.accuracy < dataH2H.rightPlayer.accuracy ? '' : 'small'}`}>{dataH2H.rightPlayer.accuracy}%</p>
  //       </div>

  //       <div className='headshots-wrapper info col'>
  //         <p className={`number number-left ${dataH2H.leftPlayer.headshots > dataH2H.rightPlayer.headshots ? '' : 'small'}`}>{dataH2H.leftPlayer.headshots}%</p>
  //         <p className='title'>HS%</p>
  //         <p className={`number number-right ${dataH2H.leftPlayer.headshots < dataH2H.rightPlayer.headshots ? '' : 'small'}`}>{dataH2H.rightPlayer.headshots}%</p>
  //       </div>

  //       <div className='multiKills-wrapper info col'>
  //         <p className={`number number-left ${dataH2H.leftPlayer.multiKills > dataH2H.rightPlayer.multiKills ? '' : 'small'}`}>{dataH2H.leftPlayer.multiKills}</p>
  //         <p className='title'>MULTI KILLS</p>
  //         <p className={`number number-right ${dataH2H.leftPlayer.multiKills < dataH2H.rightPlayer.multiKills ? '' : 'small'}`}>{dataH2H.rightPlayer.multiKills}</p>
  //       </div>

  //       <div className='clutches-wrapper info col'>
  //         <p className={`number number-left ${dataH2H.leftPlayer.openingKills > dataH2H.rightPlayer.openingKills ? '' : 'small'}`}>{dataH2H.leftPlayer.openingKills}</p>
  //         <p className='title'>OPENING KILLS</p>
  //         <p className={`number number-right ${dataH2H.leftPlayer.openingKills < dataH2H.rightPlayer.openingKills ? '' : 'small'}`}>{dataH2H.rightPlayer.openingKills}</p>
  //       </div>

  //       <div className='utilityDMG-wrapper info col'>
  //         <p className={`number number-left ${dataH2H.leftPlayer.utilityDMG > dataH2H.rightPlayer.utilityDMG ? '' : 'small'}`}>{dataH2H.leftPlayer.utilityDMG}</p>
  //         <p className='title'>UTILITY DAMAGE</p>
  //         <p className={`number number-right ${dataH2H.leftPlayer.utilityDMG < dataH2H.rightPlayer.utilityDMG ? '' : 'small'}`}>{dataH2H.rightPlayer.utilityDMG}</p>
  //       </div>
  //     </div>

  //     <div className='rightSide-wrapper player'>
  //       <div className='image-player' style={{ backgroundImage: `url(${rightPicturePlayer})` }}></div>

  //       <div className='info-wrapper col'>
  //         <p className='nickName'>{dataH2H.rightPlayer.playerName}</p>
  //       </div>
  //     </div>
  //   </animated.div>
  // )
}
