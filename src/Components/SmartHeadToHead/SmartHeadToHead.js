import React, { useEffect, useState } from 'react'
import { mockupHeadToHead } from '../../utils/mockups'
import HeadToHead from './HeadToHead/HeadToHead'
import { subscribeToHead2Head } from "../../utils/socketIO";

export default function SmartHeadToHead() {
    const [head2Head, setHead2Head] = useState();

    useEffect(() => {
        subscribeToHead2Head(data => {
            setHead2Head(data)
        })
    }, [])

    if (head2Head) {
        console.log('test : ', head2Head)
        return (
            <HeadToHead data={mockupHeadToHead} />
        )
    }
    else
        return null
}
