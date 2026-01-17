import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Component/Home'
import About from './Component/About'
import Destination from './Component/Destination'
import Contact from './Component/Contact'
import Login from './Component/login'
import Signup from './Component/Signup'
import RoutingPage from './Component/RoutingPage'
import Tours from './Component/Tours'
import TourDetails from './Component/TourDetails'
import ForgotPassword from './Component/ForgotPassword'
import VerifyInfo from './Component/VerifyInfo'
import VerifyGmail from './Component/VerifyGmail'
import VerifyOtp from './Component/VerifyOtp'
import { ContextApi } from './Context/ContextApi'
import ResetPassword from './Component/ResetPassword'
import Profile from './Component/Profile'
import Booking from './Component/Booking'
import ProtectedRoute from './utils/ProtectedRoute'





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ContextApi>

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/tours' element={<Tours/>} />
      <Route path='/destination' element={<Destination/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/verify-info' element={<VerifyInfo/>} />
      <Route path='/verify-gmail/:userId/:token' element={<VerifyGmail/>} />
      <Route path='/verify-otp/:userId' element={<VerifyOtp/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/reset-password/:id/:token' element={<ResetPassword/>} />
      <Route path='/tour-destination/:package' element={<RoutingPage/>} />
      <Route path='/tour-details/:id/:slug' element={<TourDetails/>} />
      <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
      <Route path='/booking' element={<ProtectedRoute><Booking/></ProtectedRoute>} />
    </Routes>
    </ContextApi>

    </BrowserRouter>
  </StrictMode>,
)
