import './Side.scss'
import { HiLocationMarker } from 'react-icons/hi'

import iconUrl from '../../functions/iconUrl'

function Side({ date, data, fahrenheit }) {
  const iconUrls = iconUrl(data.icon)

  return (
    <>
      <div className='side'>
        <img className='weatherIcon' src={iconUrls} alt='' />
        <div className='clouds'></div>
        <div className='sideInfo'>
          <div className='sideInfo__temperature'>
            <h2>{parseInt(data.temp)}</h2>
            <span>{fahrenheit ? '°F' : '°C'}</span>
          </div>

          <div className='sideInfo__description'>
            <h3>{data.description}</h3>
          </div>
          <div className='sideInfo__date'>
            <span>Today</span>
            <span>-</span>
            <span>{date.currentDayName},</span>
            <span>{date.currentMonthNumber}</span>
            <span>{date.currentMonth}</span>
          </div>
          <div className='sideInfo__destination'>
            <span>
              <HiLocationMarker color='#808180' />
            </span>
            <h3>{data.name}</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Side
