import React, { useState, useEffect, useRef } from 'react'
import PlayerCard from '../UI/PlayerCard'
import Fade from 'react-reveal/Fade'

import Stripes from '../../Resources/images/stripes.png'
import { firebasePlayers, firebase } from '../../firebase'
import { firebaseLooper } from '../UI/Misc'

const fetchPlayers = async ({ setLoading, setPlayers, isMounted }) => {
  let playersSnapshot
  let url
  if (isMounted.current) setLoading(true)
  if (isMounted.current) {
    playersSnapshot = await firebasePlayers.once('value')
  }
  const players = firebaseLooper(playersSnapshot)
  if (isMounted.current) setLoading(false)
  if (isMounted.current) setPlayers(players)
  for (let key in players) {
    if (isMounted.current)
      url = await firebase
        .storage()
        .ref('player')
        .child(players[key].image)
        .getDownloadURL()
    players[key].url = url
    if (isMounted.current) setPlayers([...players])
  }
}

const showPlayersByCategory = ({ category, players }) => {
  return players.map((player, i) => {
    return (
      player.position === category && (
        <Fade delay={20 * i} left key={i}>
          <div className='item'>
            <PlayerCard
              number={player.number}
              name={player.name}
              lastname={player.lastname}
              bck={player.url}
            />
          </div>
        </Fade>
      )
    )
  })
}

const TheTeam = () => {
  const [players, setPlayers] = useState(null)
  const [loading, setLoading] = useState(null)
  let isMounted = useRef(true)

  useEffect(() => {
    if (players === null && loading === null) {
      fetchPlayers({ setLoading, setPlayers, isMounted })
    }
  }, [players, loading])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <div
      className='the_team_container'
      style={{ background: `url(${Stripes}) repeat` }}
    >
      {loading === false && players && (
        <div>
          <div className='team_category_wrapper'>
            <div className='title'>Keepers</div>
            <div className='team_cards'>
              {showPlayersByCategory({ category: 'Keeper', players })}
            </div>
          </div>

          <div className='team_category_wrapper'>
            <div className='title'>Defence</div>
            <div className='team_cards'>
              {showPlayersByCategory({ category: 'Defence', players })}
            </div>
          </div>

          <div className='team_category_wrapper'>
            <div className='title'>Midfield</div>
            <div className='team_cards'>
              {showPlayersByCategory({ category: 'Midfield', players })}
            </div>
          </div>

          <div className='team_category_wrapper'>
            <div className='title'>Strikers</div>
            <div className='team_cards'>
              {showPlayersByCategory({ category: 'Striker', players })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TheTeam
