import React from 'react'
import { Link } from 'react-router-dom'

export const Tag = ({ isLink, linkTo, bck, size, color, children, add }) => {
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

export const firebaseLooper = (snapshot) => {
  const data = []
  snapshot.forEach((childSnapshot) => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key,
    })
  })

  return data
}

export const reverseArray = (actualArray) => {
  let reversedArray = []

  for (let i = actualArray.length - 1; i >= 0; i--) {
    reversedArray.push(actualArray[i])
  }

  return reversedArray
}
