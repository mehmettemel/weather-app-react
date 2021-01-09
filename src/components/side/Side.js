import React, { useEffect, useState } from 'react'
import './Side.scss'
import { HiLocationMarker } from 'react-icons/hi'
import kelvinToCelcius from '../../functions/kelvinToCelcius'
function Side() {
  const newDate = new Date()
  const weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const [location, setLocation] = useState({
    Lat: -0.1257,
    Long: 51.5085,
  })
  const [data, setData] = useState({
    name: undefined,
    temp: '...',
    icon: undefined,
    description: undefined,
  })
  const [date, setDate] = useState({
    currentDate: newDate.toLocaleDateString(),
    currentDayName: weekday[newDate.getDay()],
    currentMonth: months[newDate.getMonth()],
    currentMonthNumber: newDate.getMonth(),
  })
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position)
        setLocation({
          Lat: position.coords.latitude,
          Long: position.coords.longitude,
        })
      })

      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${location.Lat}&lon=${location.Long}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
        .then((resp) => resp.json())
        .then((weather) =>
          setData({
            name: weather.name,
            temp: weather.main.temp,
            icon: weather.weather[0].icon,
            description: weather.weather[0].description,
          })
        )
    }
  }, [location.Long, location.Lat])

  const iconUrl = `http://openweathermap.org/img/wn/${data.icon}@2x.png`

  return (
    <>
      <div className='side'>
        <img className='weatherIcon' src={iconUrl} alt='' />
        <div className='clouds'></div>
        <div className='side__temperature'>
          <h2>{kelvinToCelcius(data.temp)}</h2>
          <span>°C</span>
        </div>

        <div className='side__description'>
          <h3>{data.description}</h3>
        </div>
        <div className='side__date'>
          <span>Today</span>
          <span>-</span>
          <span>{date.currentDayName},</span>
          <span>
            {date.currentMonthNumber === 0 ? '1' : date.currentMonthNumber}
          </span>
          <span>{date.currentMonth}</span>
        </div>
        <div className='side__destination'>
          <span>
            <HiLocationMarker color='#808180' />
          </span>
          <h3>{data.name}</h3>
        </div>
      </div>
    </>
  )
}

export default Side
