import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ user, component: Comp, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        user && restricted ? (
          <Redirect to='/dashboard' />
        ) : (
          <Comp {...props} user={user} />
        )
      }
    ></Route>
  )
}

export default PublicRoute
