import React from 'react'
import SmartDynamic from './Components/SmartDynamic/SmartDynamic'
import SmartLeftSide from './Components/SmartLeftSide/SmartLeftSide'
import SmartRightSide from './Components/SmartRightSide/SmartRightSide'
import SmartTopBar from './Components/SmartTopBar/SmartTopBar'

export default function EconomyHud({ parserData }) {
    return (
        <>
            <SmartTopBar parserData={parserData} />
            <SmartLeftSide parserData={parserData} />
            <SmartRightSide parserData={parserData} />
            <SmartDynamic parserData={parserData} />
        </>
    )
}
