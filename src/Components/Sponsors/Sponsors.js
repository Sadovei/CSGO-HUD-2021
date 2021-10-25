import React, { useEffect, useState } from 'react'
import './Sponsors.scss'

const SponsorsPNG = require.context("./icons", true);
const sponsorsIMG = SponsorsPNG.keys().map(key => key.substring(key.lastIndexOf("/") + 1, key.lastIndexOf(".")))

const SVGMap = SponsorsPNG.keys().reduce((images, path) => {
    const key = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
    images[key] = SponsorsPNG(path).default;
    return images;
}, {});

export default function Sponsors() {
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        if (counter === sponsorsIMG.length)
            setCounter(0)
        const interval = setInterval(() => {
            setCounter(prev => prev + 1)
        }, 15000);
        return () => clearInterval(interval);
    }, [counter]);

    return (
        <div className="sponsors-wrapper-primary">
            <div className="sponsor-image" style={{ backgroundImage: `url(${SVGMap[sponsorsIMG[counter]]})` }}></div>
        </div>
    )
}
