import React, { useEffect, useState } from 'react'

import CheckStream from './CheckStream/CheckStream'
import FunFactsComponent from './FunFactsComponent/FunFactsComponent'
import HeadToHead from './HeadToHead/HeadToHead'
import ImageComponent from './ImageComponent/ImageComponent'
import SmartPovSide from '../SmartPovSide/SmartPovSide'
import StaffComponent from './StaffComponent/StaffComponent'
import TicketComponent from './TicketComponent/TicketComponent'
import { token } from '../../utils/socketIO'

export default function SmartDynamic({ parserData }) {
  const [showHeadtoHead, setShowHeadtoHead] = useState('none')
  const [showCheckStream, setShowCheckStream] = useState('none')
  const [showTickets, setShowTickets] = useState('none')
  const [showStaff, setShowStaff] = useState('none')
  const [showRandomContent, setShowRandomContent] = useState('none')
  const [showFunFacts, setShowFunFacts] = useState('none')
  const [showPOV, setShowPOV] = useState('show')

  useEffect(() => {
    if (token === 'igdir')
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
        } else if (parserData.type === 'Tickets') {
          if (parserData.show) {
            setShowTickets('show')
            setShowPOV('hide')
          } else {
            setShowTickets('hide')
            setShowPOV('show')
          }
        }
        else if (parserData.type === 'Casters' || parserData.type === 'Observer') {
          if (parserData.show) {
            setShowStaff('show')
            setShowPOV('hide')
          } else {
            setShowStaff('hide')
            setShowPOV('show')
          }
        }
        else if (parserData.type === 'FunFacts') {
          if (parserData.show) {
            setShowFunFacts('show')
            setShowPOV('hide')
          } else {
            setShowFunFacts('hide')
            setShowPOV('show')
          }
        }
        else if (parserData.type === 'RandomContent') {
          if (parserData.show) {
            setShowRandomContent('show')
            setShowPOV('hide')
          } else {
            setShowRandomContent('hide')
            setShowPOV('show')
          }
        }
      }
  }, [parserData])
  return (
    <>
      {parserData.type === 'Head2Head' && <HeadToHead dataH2H={parserData.data} show={showHeadtoHead} />}

      {parserData.type === 'Check_Stream' && <CheckStream data={parserData.data} show={showCheckStream} />}

      {parserData.type === 'Tickets' && <TicketComponent show={showTickets} />}

      {parserData.type === 'FunFacts' && <FunFactsComponent show={showFunFacts} data={parserData.data} />}

      {parserData.type === 'RandomContent' && <ImageComponent show={showRandomContent} />}

      {parserData.type === 'Casters' && <StaffComponent show={showStaff} data={parserData.data.casters} type="CASTERS" />}

      {parserData.type === 'Observer' && <StaffComponent show={showStaff} data={parserData.data.observer} type="OBSERVER" />}

      <SmartPovSide action={showPOV} />
    </>
  )
}
