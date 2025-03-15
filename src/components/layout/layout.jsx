import React from 'react'
import AppHeader from '../header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/footer'

function Layout() {
  return (
    <>
      <AppHeader />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
