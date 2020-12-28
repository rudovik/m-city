// import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Routes'

import './Resources/css/app.css'
import { BrowserRouter } from 'react-router-dom'
import { firebase } from './firebase'

const App = ({ user }) => {
  return (
    <BrowserRouter>
      <Routes user={user} />
    </BrowserRouter>
  )
}

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(
    // <React.StrictMode>
    <App user={user} />,
    // </React.StrictMode>,
    document.getElementById('root')
  )
})
