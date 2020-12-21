import React from 'react'
import { Link } from 'react-router-dom'

const Tag = ({ isLink, linkTo, bck, size, color, children, add }) => {
  const template = (
    <div
      style={{
        background: bck,
        fontSize: size,
        color: color,
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous',
        ...add,
      }}
    >
      {children}
    </div>
  )

  if (isLink) {
    return <Link to={linkTo}>{template}</Link>
  } else {
    return template
  }
}

export default Tag
