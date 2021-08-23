import React from 'react'
import TopBar from './TopBar/TopBar';
import VetoLegends from './VetoLegends/VetoLegends';

export default function SmartTopBar({ topBarData }) {
    return (
        <>
            <TopBar topBar={topBarData} />
            <VetoLegends vetoInfo={topBarData.mapInfo.vetoLegend} phase={topBarData.round.phase} topBar={topBarData} />
        </>
    )
}
