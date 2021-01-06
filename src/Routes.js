import Layout from './HOC/Layout'
import { Switch } from 'react-router-dom'

import PrivateRoute from './components/authRoutes/PrivateRoute'
import PublicRoute from './components/authRoutes/PublicRoute'

import Home from './components/Home/Home'
import LogIn from './components/LogIn/LogIn'
import TheTeam from './components/TheTeam/TheTeam'
import TheMatches from './components/TheMatches/TheMatches'
import NotFound from './components/UI/NotFound'

import Dashboard from './components/admin/Dashboard'
import Matches from './components/admin/Matches/Matches'
import AddEditMatch from './components/admin/Matches/AddEditMatch'
import AdminPlayers from './components/admin/players/AdminPlayers'
import AddEditPlayer from './components/admin/players/AddEditPlayer'

function Routes(props) {
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          {...props}
          path='/admin_players/add_player/:id'
          exact
          component={AddEditPlayer}
        />
        <PrivateRoute
          {...props}
          path='/admin_players/add_player'
          exact
          component={AddEditPlayer}
        />
        <PrivateRoute
          {...props}
          path='/admin_players'
          exact
          component={AdminPlayers}
        />
        <PrivateRoute
          {...props}
          path='/admin_matches/edit_match/:id'
          exact
          component={AddEditMatch}
        />
        <PrivateRoute
          {...props}
          path='/admin_matches/edit_match'
          exact
          component={AddEditMatch}
        />
        <PrivateRoute
          {...props}
          path='/admin_matches'
          exact
          component={Matches}
        />
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
          exact
          component={TheMatches}
          path='/the_matches'
          restricted={false}
        />
        <PublicRoute
          {...props}
          exact
          component={TheTeam}
          path='/the_team'
          restricted={false}
        />
        <PublicRoute
          {...props}
          path='/'
          exact
          component={Home}
          restricted={false}
        />
        <PublicRoute {...props} exact component={NotFound} restricted={false} />
      </Switch>
    </Layout>
  )
}

export default Routes
