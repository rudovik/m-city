import Layout from './HOC/Layout'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'

function Routes() {
  return (
    <Layout>
      <Switch>
        <SignIn exact component={SignIn} path='/sign_in' />
        <Route exact component={Home} path='/' />
      </Switch>
    </Layout>
  )
}

export default Routes
