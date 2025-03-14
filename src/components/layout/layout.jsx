import React from 'react'
import AppHeader from '../header'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'
import Home from '../pages/home'

function Layout() {
  return (
    <>
      <AppHeader />
      {/* <Home /> */}
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
