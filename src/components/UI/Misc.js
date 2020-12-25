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

export const validate = ({ validation, value }) => {
  let error = [true, '']

  if (validation.email) {
    const isValid = /\S+@\S+\.\S+/.test(value)
    const message = `${!isValid ? 'Must be a valid email' : ''}`
    error = !isValid ? [isValid, message] : error
  }

  if (validation.required) {
    const isValid = value.trim() !== ''
    const message = `${!isValid ? 'This field is required' : ''}`
    error = !isValid ? [isValid, message] : error
  }

  return error
}
