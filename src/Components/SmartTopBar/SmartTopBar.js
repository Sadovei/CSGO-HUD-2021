import React, { useEffect, useState } from 'react'
import { mockupTopBar } from '../../utils/mockups';
import { subscribeToTopBar } from '../../utils/socketIO';
import TopBar from './TopBar/TopBar';

export default function SmartTopBar() {
    const [topBarData, setTopBarData] = useState(mockupTopBar);

    useEffect(() => {
        subscribeToTopBar(data => {
            setTopBarData(data)
        })
    }, [])

    return (
        <TopBar topBar={topBarData} />
    )
}
