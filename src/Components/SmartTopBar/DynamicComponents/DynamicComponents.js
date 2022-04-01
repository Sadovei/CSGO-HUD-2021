import './DynamicComponents.scss'

import MvpComponent from './MvpComponent/MvpComponent'
import React from 'react'
import SeriesInfoComponent from './SeriesInfoComponent/SeriesInfoComponent'
import TimeOutComponent from './TimeOutComponent/TimeOutComponent'
import VetoLegends from './VetoLegends/VetoLegends'
import { VideoComponent } from './VideoComponent/VideoComponent'

export default function DynamicComponents({ topBar, showContent }) {
    return (
        <div className={`dynamicTop-wrapper col ${showContent}`}>
            {Object.keys(topBar.mapInfo.vetoLegend).length > 1 &&
                <VetoLegends phase={topBar.round.phase} topBar={topBar} />
            }

            <SeriesInfoComponent mapInfo={topBar.mapInfo} leftSide={topBar.leftSide} rightSide={topBar.rightSide} />

            <MvpComponent mvps={topBar.mapInfo.mvps} />

            <TimeOutComponent topBarData={topBar} />

            <VideoComponent topBarData={topBar} />
        </div>
    )
}
