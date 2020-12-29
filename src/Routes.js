import Layout from './HOC/Layout'
import { Switch } from 'react-router-dom'

import PrivateRoute from './components/authRoutes/PrivateRoute'
import PublicRoute from './components/authRoutes/PublicRoute'

import Home from './components/Home/Home'
import LogIn from './components/LogIn/LogIn'

import Dashboard from './components/admin/Dashboard'

function Routes(props) {
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          {...props}
          path='/dashboard'
          exact
          component={Dashboard}
        />
        <PublicRoute
          {...props}
          exact
          component={LogIn}
          path='/log_in'
          restricted={true}
        />
        <PublicRoute
          {...props}
          path='/'
          exact
          component={Home}
          restricted={false}
        />
      </Switch>
    </Layout>
  )
}

export default Routes
