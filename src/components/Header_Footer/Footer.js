import React from 'react'
import { CityLogo } from '../UI/Icons'

const Footer = () => {
  return (
    <footer className='bck_blue'>
      <div className='footer_logo'>
        <CityLogo width='70px' height='70px' isLink linkTo='/' />
      </div>
      <div className='footer_dist'>
        Manchester city 2018. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
