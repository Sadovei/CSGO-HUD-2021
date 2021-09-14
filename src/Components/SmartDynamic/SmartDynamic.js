import React, { useEffect, useState } from 'react'
import { mockupHeadToHead, mockupScoreBoard } from '../../utils/mockups'
import { subscribeToHead2Head, subscribeToScoreBoard } from "../../utils/socketIO";
import HeadToHead from '../SmartHeadToHead/HeadToHead/HeadToHead';
import ScoreBoard from '../SmartScoreBoard/ScoreBoard/ScoreBoard';
import SmartPovSide from '../SmartPovSide/SmartPovSide';

export default function SmartDynamic() {
    const [head2Head, setHead2Head] = useState();
    const [scoreBoard, setScoreBoard] = useState();

    useEffect(() => {
        subscribeToHead2Head(data => {
            setHead2Head(data)
        })
    }, [head2Head])


    useEffect(() => {
        subscribeToScoreBoard(data => {
            setScoreBoard(data)
        })
    }, [scoreBoard])

    if (head2Head && !scoreBoard) {
        return (
            <>
                <HeadToHead data={mockupHeadToHead} action={'show'} />
                <ScoreBoard data={mockupScoreBoard} action={'hide'} />
                <SmartPovSide action={'hide'} />
            </>

        )
    }
    else if (scoreBoard && !head2Head) {
        return (
            <>
                <ScoreBoard data={mockupScoreBoard} action={'show'} />
                <HeadToHead data={mockupHeadToHead} action={'hide'} />
                <SmartPovSide action={'hide'} />
            </>
        )
    }
    else {
        return (
            <>
                <ScoreBoard data={mockupScoreBoard} action={'hide'} />
                <HeadToHead data={mockupHeadToHead} action={'hide'} />
                <SmartPovSide action={'show'} />
            </>
        )
    }
}
