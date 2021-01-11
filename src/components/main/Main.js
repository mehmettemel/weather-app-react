import axios from 'axios'
import React, { useEffect, useState } from 'react'
import iconUrl from '../../functions/iconUrl'
import { FaWind } from 'react-icons/fa'
import './Main.scss'
import { Progress } from 'antd'
import { IoMdNavigate } from 'react-icons/io'

function Main({ location, data }) {
  const [weathers, setWeathers] = useState({
    daily: [],
  })
  const date = (value) => {
    return new Date(value * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    })
  }
  useEffect(() => {
    if (navigator.geolocation) {
      axios(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.Lat}&lon=${location.Long}&units=metric&exclude=minutely,hourly,current&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      ).then((res) => {
        const weathers = res.data
        setWeathers({
          daily: weathers.daily,
          visibility: weathers,
        })
        console.log(weathers)
      })
    }
  }, [location.Lat, location.Long])
  console.log('HALLO', weathers)
  iconUrl()
  return (
    <div className='main'>
      <ul className='main__weathersList'>
        {weathers.daily.slice(1, 6).map((weather) => (
          <li className='main__weathersListItem'>
            <span>{date(weather.dt)}</span>
            <img src={iconUrl(weather.weather[0].icon)}></img>
            <div className='main__degrees'>
              <span>{parseInt(weather.temp.day)}°C</span>
              <span>{parseInt(weather.temp.night)}°C</span>
            </div>
          </li>
        ))}
      </ul>
      <h2 className='main__detailsTitle'>Today's Hightlights</h2>
      <div className='main__details'>
        <div className='main__details--wind'>
          <h3>Wind Status</h3>
          <div className='windDegree'>
            <h2>{data.windSpeed}</h2>
            <span>mph</span>
          </div>
          <div className='windIcon'>
            <FaWind size='2em' />
          </div>
        </div>
        <div className='main__details--humidity'>
          <h3>Humidity</h3>
          <div className='humidityDegree'>
            <h2>
              {data.humidity}
              <span>%</span>
            </h2>
          </div>
          <div className='progress'>
            <div className='number'>
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
            <Progress
              showInfo={false}
              strokeColor={{
                from: '#EC6E4C',
                to: '#ffff',
              }}
              status='active'
              percent={data.humidity}
              type='line'
              strokeWidth='.7em'
            />
          </div>
        </div>
        <div className='main__details--windRotation'>
          <h3>Wind Degree</h3>
          <div
            className='windRotate'
            style={{ transform: `rotate(${data.windDegree}deg)` }}
          >
            <IoMdNavigate size='5em' />
          </div>
        </div>
        <div className='main__details--air'>
          <h3>Air Pressure</h3>
          <div className='pressureDegree'>
            {data.airPressure}
            <span>mb</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
