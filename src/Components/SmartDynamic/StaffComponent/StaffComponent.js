import { redisIP } from '../../../utils/tools';
import './StaffComponent.scss'

// const { REACT_APP_STREAM } = process.env

export default function StaffComponent({ data, show, type }) {
    // console.log(data);
    if (Object.keys(data).length > 0)
        return (
            <div className={`staff-wrapper ${show}`}>
                <div className='info-wrapper'>
                    <p className='streamText'>{type}</p>
                    <p className='streamType'>{data.name}</p>
                </div>

                <div className='image' style={{ backgroundImage: `url(http://${redisIP}/pgl/resources/csgo/staff/${data.image}.webp)` }}></div>
            </div>
        )
    else
        return null
}