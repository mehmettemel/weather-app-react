import React, { useState } from 'react'
import Main from '../../components/main/Main'
import Side from '../../components/side/Side'
import './Home.scss'

function Home() {
  const [state, setState] = useState({
    weatherIcon: {
      Sunny: 'hello',
    },
  })
  return (
    <div className='home'>
      <Side />
      <Main />
    </div>
  )
}

export default Home
