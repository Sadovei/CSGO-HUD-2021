import './CheckStream.scss'

export default function CheckStream({ data, show, text }) {
    if (data)
        return (
            <div className={`checkStream-wrapper  ${data[0].mapName.split('_')[1]} ${show ? 'show' : 'hide'}`}>
                <div className="text-wrapper font-mont">
                    <p className="title">{text}</p>

                    <div className="info-wrapper">
                        <p className="team-1">{data[0].teamName}</p>
                        <p className="score">{data[0].score}-{data[1].score}</p>
                        <p className="team-2">{data[1].teamName}</p>
                    </div>

                    <span className='mapName-text'>{data[0].phase === 'live' ? 'MAP PLAYING: ' : 'MAP PLAYED: '}<p className="map-name">{data[0].mapName.split('_')[1].toUpperCase()}</p></span>
                </div>
                <div className={`image-stream ${text === 'Stream A' ? 'A' : 'B'}`}></div>
            </div>
        )
    else return null
}
