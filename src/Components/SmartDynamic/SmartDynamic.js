import React, { useEffect, useState } from 'react'
import { subscribeToSponsorNr1 } from "../../utils/socketIO";
import SponsorNr1 from '../SponsorNr1/SponsorNr1';

export default function SmartDynamic() {
    const [firstSponsor, setFirstSponsor] = useState(null);

    useEffect(() => {
        subscribeToSponsorNr1(data => {
            setFirstSponsor(data)
        })
    }, [])

    if (firstSponsor !== null)
        return (
            <SponsorNr1 data={firstSponsor} action={'show'} />
        )
    return (
        <SponsorNr1 data={null} action={'hide'} />
    )
}
