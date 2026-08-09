import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashPage from './screens/splashpage'
import Welcome from './screens/welcome'
import Login from './screens/login'
import Home from './screens/home'
import GetQueue from './screens/getqueue'
import Booking from './screens/booking'
import Contacts from './screens/contacts'
import Chat from './screens/chat'
import Profile from './screens/profile'
import Sign from './screens/sign'
import Timepage from './screens/timepage'
import Servicespage from './screens/servicespage'









import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/home" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
           <Route path="/getqueue" element={<GetQueue />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/timepage" element={<Timepage />} />
          <Route path="/servicespage" element={<Servicespage />} />





        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
