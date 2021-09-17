import React, { useEffect, useState } from 'react'
import { subscribeToHead2Head, subscribeToScoreBoard } from "../../utils/socketIO";
import HeadToHead from './HeadToHead/HeadToHead';
import ScoreBoard from './ScoreBoard/ScoreBoard';
import SmartPovSide from '../SmartPovSide/SmartPovSide';

export default function SmartDynamic() {
    const [head2Head, setHead2Head] = useState();
    const [scoreBoard, setScoreBoard] = useState();

    useEffect(() => {
        subscribeToHead2Head(data => {
            setHead2Head(data)
        })
        subscribeToScoreBoard(data => {
            setScoreBoard(data)
        })
    }, [])

    if (head2Head && !scoreBoard) {
        return (
            <>
                <HeadToHead data={head2Head} action={'show'} />
                <ScoreBoard data={null} action={'hide'} />
                <SmartPovSide action={'hide'} />
            </>

        )
    }
    else if (scoreBoard && !head2Head) {
        return (
            <>
                <ScoreBoard data={scoreBoard} action={'show'} />
                <HeadToHead data={null} action={'hide'} />
                <SmartPovSide action={'hide'} />
            </>
        )
    }
    else {
        return (
            <>
                <ScoreBoard data={scoreBoard} action={'hide'} />
                <HeadToHead data={head2Head} action={'hide'} />
                <SmartPovSide action={'show'} />
            </>
        )
    }
}
