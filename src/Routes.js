import Layout from './HOC/Layout'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home/Home'
import LogIn from './components/LogIn/LogIn'

function Routes() {
  return (
    <Layout>
      <Switch>
        <LogIn exact component={LogIn} path='/log_in' />
        <Route exact component={Home} path='/' />
      </Switch>
    </Layout>
  )
}

export default Routes
