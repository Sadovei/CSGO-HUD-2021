import { redisIP } from '../../../utils/tools'
import './CheckStream.scss'

const { REACT_APP_STREAM } = process.env

export default function CheckStream({ data, show }) {
    if (Object.keys(data).length > 0)
        return (
            <div className={`checkStream-wrapper ${show}`}>
                <div className='info-wrapper'>
                    <p className='streamText'>STREAM</p>
                    <p className='streamType'>{REACT_APP_STREAM === 'A' ? 'B' : 'A'}</p>
                </div>

                <div className='content-wrapper'>
                    <div className='leftTeam-wrapper'>
                        <p className='logo' style={{ backgroundImage: `url(http://${redisIP}/pgl/resources/csgo/team/${data.leftTeam}/logo.webp)` }}></p>
                        <p className='score'>{data.leftScore}</p>
                    </div>

                    <div className='vs-wrapper'>
                        <p className='vs'>:</p>
                    </div>

                    <div className='rightTeam-wrapper'>
                        <p className='score'>{data.rightScore}</p>
                        <p className='logo' style={{ backgroundImage: `url(http://${redisIP}/pgl/resources/csgo/team/${data.rightTeam}/logo.webp)` }}></p>
                    </div>
                </div>
            </div>
        )
    else
        return null
}