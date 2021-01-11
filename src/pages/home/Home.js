import React, { useEffect, useState } from 'react'
import Main from '../../components/main/Main'
import Side from '../../components/side/Side'
import './Home.scss'

function Home() {
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
    temp: 273,
    icon: undefined,
    description: undefined,
  })
  const [date, setDate] = useState({
    currentDate: newDate.toLocaleDateString(),
    currentDayName: weekday[newDate.getDay()],
    currentMonth: months[newDate.getMonth()],
    currentMonthNumber: newDate.getDate(),
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
        `http://api.openweathermap.org/data/2.5/weather?lat=${location.Lat}&lon=${location.Long}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
        .then((resp) => resp.json())
        .then((weather) =>
          setData({
            name: weather.name,
            temp: weather.main.temp,
            icon: weather.weather[0].icon,
            description: weather.weather[0].description,
            windSpeed: weather.wind.speed,
            windDegree: weather.wind.deg,
            humidity: weather.main.humidity,
            airPressure: weather.main.pressure,
          })
        )
    }
  }, [location.Long, location.Lat])
  console.log('wind', data)
  return (
    <div className='home'>
      <Side data={data} date={date} />
      <Main location={location} data={data} />
    </div>
  )
}

export default Home
