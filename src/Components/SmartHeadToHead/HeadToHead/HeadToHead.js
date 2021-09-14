import './HeadToHead.scss'
import classNames from 'classnames';
import { useSpring, animated } from 'react-spring'

export default function HeadToHead({ data, action }) {
    let leftPicturePlayer = `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${data.leftPlayer.teamKey}/${data.leftPlayer.playerKey}-h2h.webp`
    let rightPicturePlayer = `http://redis-birou.pgl.ro/pgl/resources/csgo/team/${data.rightPlayer.teamKey}/${data.rightPlayer.playerKey}-h2h.webp`
    let flagLeft = data.leftPlayer.flag !== '' ? `http://redis-birou.pgl.ro/pgl/resources/flags/${data.leftPlayer.flag}.png` : ''
    let flagRight = data.leftPlayer.flag !== '' ? `http://redis-birou.pgl.ro/pgl/resources/flags/${data.leftPlayer.flag}.png` : ''

    let leftSide = classNames({
        'CT': data.leftPlayer.side === 'CT' && true,
        'T': data.leftPlayer.side === 'T' && true
    })
    let rightSide = classNames({
        'CT': data.rightPlayer.side === 'CT' && true,
        'T': data.rightPlayer.side === 'T' && true
    })
    const showEl = useSpring({
        from: { bottom: '-25vw' },
        to: { bottom: '1.1vw' },
        config: { duration: 500 }
    })

    const hideEl = useSpring({
        from: { bottom: '-1.1vw' },
        to: { bottom: '-25vw' },
        config: { duration: 500 }
    })

    return (
        <animated.div className="headTohead-wrapper font-tablet row"
            style={action === 'show' ? showEl : hideEl}
        >

            <div className="leftSide-wrapper player">
                <div className="image-player" style={{ backgroundImage: `url(${leftPicturePlayer})` }}></div>

                <div className="info-wrapper col">
                    <p className="nickName">{data.leftPlayer.playerNickName}</p>
                    <div className="name-wrapper row">
                        <p className="name">{data.leftPlayer.playerName}</p>
                        <div className="flag" style={{ backgroundImage: `url(${flagLeft})` }}></div>
                    </div>
                    <p className="teamName">{data.leftPlayer.teamName}</p>
                </div>
            </div>

            <div className="h2h-info-wrapper col">
                <div className="duels-wrapper info col">
                    <p className="title">DUELS</p>

                    <div className="bar-info row">
                        <div className={`bar-wrapper left ${leftSide}`}>
                            <p className="number number-left">{data.leftPlayer.duels}%</p>
                            <div className="bar" style={{ width: `${data.leftPlayer.duels * 92 / 100}%` }}></div>
                        </div>

                        <div className={`bar-wrapper right ${rightSide}`}>
                            <p className="number number-right">{data.rightPlayer.duels}%</p>
                            <div className="bar" style={{ width: `${data.rightPlayer.duels * 92 / 100}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="adr-wrapper info col">
                    <p className="title">ADR</p>

                    <div className="bar-info row">
                        <div className={`bar-wrapper left ${leftSide}`}>
                            <p className="number number-left">{data.leftPlayer.adr}</p>
                            <div className="bar" style={{ width: `${data.leftPlayer.adr * 92 / data.adr}%` }}></div>
                        </div>

                        <div className={`bar-wrapper right ${rightSide}`}>
                            <p className="number number-right">{data.rightPlayer.adr}</p>
                            <div className="bar" style={{ width: `${data.rightPlayer.adr * 92 / data.adr}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="kast-wrapper info col">
                    <p className="title">KAST</p>

                    <div className="bar-info row">
                        <div className={`bar-wrapper left ${leftSide}`}>
                            <p className="number number-left">{data.leftPlayer.kast}</p>
                            <div className="bar" style={{ width: `${data.leftPlayer.kast * 92 / data.kast}%` }}></div>
                        </div>

                        <div className={`bar-wrapper right ${rightSide}`}>
                            <p className="number number-right">{data.rightPlayer.kast}</p>
                            <div className="bar" style={{ width: `${data.rightPlayer.kast * 92 / data.kast}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="hs-wrapper info col">
                    <p className="title">HS%</p>

                    <div className="bar-info row">
                        <div className={`bar-wrapper left ${leftSide}`}>
                            <p className="number number-left">{data.leftPlayer.hs}%</p>
                            <div className="bar" style={{ width: `${data.leftPlayer.hs * 92 / 100}%` }}></div>
                        </div>

                        <div className={`bar-wrapper right ${rightSide}`}>
                            <p className="number number-right">{data.rightPlayer.hs}%</p>
                            <div className="bar" style={{ width: `${data.rightPlayer.hs * 92 / 100}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="accuracy-wrapper info col">
                    <p className="title">ACCURACY</p>

                    <div className="bar-info row">
                        <div className={`bar-wrapper left ${leftSide}`}>
                            <p className="number number-left">{data.leftPlayer.accuracy}%</p>
                            <div className="bar" style={{ width: `${data.leftPlayer.accuracy * 92 / 100}%` }}></div>
                        </div>

                        <div className={`bar-wrapper right ${rightSide}`}>
                            <p className="number number-right">{data.rightPlayer.accuracy}%</p>
                            <div className="bar" style={{ width: `${data.rightPlayer.accuracy * 92 / 100}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="utility-wrapper info col">
                    <p className="title">UTILITY DAMAGE</p>

                    <div className="bar-info row">
                        <div className={`bar-wrapper left ${leftSide}`}>
                            <p className="number number-left">{data.leftPlayer.utility}</p>
                            <div className="bar" style={{ width: `${data.leftPlayer.utility * 92 / data.utility_dmg}%` }}></div>
                        </div>

                        <div className={`bar-wrapper right ${rightSide}`}>
                            <p className="number number-right">{data.rightPlayer.utility}</p>
                            <div className="bar" style={{ width: `${data.rightPlayer.utility * 92 / data.utility_dmg}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rightSide-wrapper player">
                <div className="image-player" style={{ backgroundImage: `url(${rightPicturePlayer})` }}></div>

                <div className="info-wrapper col">
                    <p className="nickName">{data.rightPlayer.playerNickName}</p>
                    <div className="name-wrapper row">
                        <div className="flag" style={{ backgroundImage: `url(${flagRight})` }}></div>
                        <p className="name">{data.rightPlayer.playerName}</p>
                    </div>
                    <p className="teamName">{data.rightPlayer.teamName}</p>
                </div>
            </div>
        </animated.div>
    )
}
