import React from 'react'
import { Link } from 'react-router-dom'

import mcitylogo from '../../Resources/images/logos/manchester_city_logo.png'

export const CityLogo = ({ isLink, linkTo, width, height }) => {
  const template = (
    <div
      className='img_cover'
      style={{
        width: width,
        height: height,
        background: `url(${mcitylogo}) no-repeat`,
      }}
    ></div>
  )

  if (isLink) {
    return (
      <Link to={linkTo} className='link_logo'>
        {template}
      </Link>
    )
  } else {
    return template
  }
}
