import React, { useEffect } from 'react'
import './Sponsors.scss'

const SponsorsPNG = require.context("./icons", true);
const sponsorsIMG = SponsorsPNG.keys().map(key => key.substring(key.lastIndexOf("/") + 1, key.lastIndexOf(".")))
let counter = 0

const SVGMap = SponsorsPNG.keys().reduce((images, path) => {
    const key = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
    images[key] = SponsorsPNG(path).default;
    return images;
}, {});

export default function Sponsors() {

    useEffect(() => {
        if (counter === sponsorsIMG.length)
            counter = 0
        const interval = setInterval(() => {
            counter++
        }, 15000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter]);

    return (
        <div className="sponsors-wrapper-primary">
            <div className="sponsor-image" style={{ backgroundImage: `url(${SVGMap[sponsorsIMG[counter]]})` }}></div>
        </div>
    )
}
