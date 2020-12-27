import Layout from './HOC/Layout'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home/Home'
import LogIn from './components/LogIn/LogIn'

import Dashboard from './components/admin/Dashboard'

function Routes() {
  return (
    <Layout>
      <Switch>
        <Route exact component={Dashboard} path='/dashboard' />
        <Route exact component={LogIn} path='/log_in' />
        <Route exact component={Home} path='/' />
      </Switch>
    </Layout>
  )
}

export default Routes
