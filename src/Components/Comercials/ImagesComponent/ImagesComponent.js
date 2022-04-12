import './ImagesComponent.scss'

import React from 'react'

const SponsorsPNG = require.context('./icons', true)
const sponsorsIMG = SponsorsPNG.keys().map((key) =>
    key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
)
let counter = 0

const SVGMap = SponsorsPNG.keys().reduce((images, path) => {
    const key = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
    images[key] = SponsorsPNG(path).default
    return images
}, {})


export default function ImagesComponent() {
    useEffect(() => {
        if (counter === sponsorsIMG.length)
            counter = 0
        else
            setInterval(() => {
                counter++
            }, 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter])

    return (
        <div className='sponsor-image' style={{ backgroundImage: `url(${SVGMap[sponsorsIMG[counter]]})` }}></div>
    )
}
