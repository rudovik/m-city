import Layout from './HOC/Layout'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from './components/authRoutes/PrivateRoute'

import Home from './components/Home/Home'
import LogIn from './components/LogIn/LogIn'

import Dashboard from './components/admin/Dashboard'

function Routes({ user }) {
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          user={user}
          path='/dashboard'
          exact
          component={Dashboard}
        />
        <Route exact component={LogIn} path='/log_in' />
        <Route exact component={Home} path='/' />
      </Switch>
    </Layout>
  )
}

export default Routes
