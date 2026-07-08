import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from'react-router-dom'
import Home from './pages/Home'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import Genrate from './pages/Genrate'
import WebsiteEditor from './pages/Editor'
import LiveSite from './pages/LiveSite'
import Pricing from './pages/Pricing'

export const serverurl="http://localhost:8000"

function App() {
  const{userData}=useSelector(state=>state.user)
    useGetCurrentUser()
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/site/:id" element={<LiveSite/>} />
    <Route path="/pricing" element={<Pricing/>} />
    
     <Route path="/dashboard" element={userData? <Dashboard/>:<Home/> } />
          <Route path="/generate" element={userData? <Genrate/>:<Home/>} />
              <Route path="/editor/:id" element={userData?<WebsiteEditor/> :<Home/>} />
  </Routes>
  </BrowserRouter>
  )
}

export default App
