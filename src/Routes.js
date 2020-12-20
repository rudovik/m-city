import Layout from './HOC/Layout'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home/Home'

function Routes() {
  return (
    <Layout>
      <Switch>
        <Route exact component={Home} path='/' />
      </Switch>
    </Layout>
  )
}

export default Routes
