import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../../HOC/AdminLayout'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'

import { firebasePlayers } from '../../../firebase'
import { firebaseLooper, reverseArray } from '../../UI/Misc'

const fetchPlayers = async () => {
  const snapshot = await firebasePlayers.once('value')
  const players = reverseArray(firebaseLooper(snapshot))
  return players
}

const AdminPlayers = () => {
  const [loading, setLoading] = useState(false)
  const [players, setPlayers] = useState(null)

  useEffect(() => {
    if (!loading && players === null) {
      ;(async () => {
        setLoading(true)
        const players = await fetchPlayers()
        setPlayers(players)
        setLoading(false)
      })()
    }
  }, [loading, players])

  return (
    <AdminLayout>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players &&
                players.map((player, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Link to={`/admin_players/add_player/${player.id}`}>
                        {player.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin_players/add_player/${player.id}`}>
                        {player.lastname}
                      </Link>
                    </TableCell>
                    <TableCell>{player.number}</TableCell>
                    <TableCell>{player.position}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='admin_progress'>
          {(loading || players === null) && (
            <CircularProgress thickiness={7} style={{ color: '#98c5e9' }} />
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminPlayers
