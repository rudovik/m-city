import React from 'react'
import Header from '../components/Header_Footer/Header'
import Footer from '../components/Header_Footer/Footer'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
