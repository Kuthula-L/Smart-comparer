import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthenticationPage from './pages/AuthenticationPage.tsx'
import Basket from './pages/Basket.tsx'
import DashboardHome from './pages/DashboardHome.tsx'
import Favourites from './pages/Favourites.tsx'
import LandingPage from './pages/LandingPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
      <App />
       <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<DashboardHome/>}/>
        <Route path='/register' element={<AuthenticationPage/>}/>
        <Route path='/Dashboard/home' element={<DashboardHome/>}/>
        <Route path='/Dashboard/Basket' element={<Basket/>}/>
        <Route path='/Dashboard/Favorites' element={<Favourites/>}/>
      </Routes>
   </BrowserRouter>

  </StrictMode>,
)
