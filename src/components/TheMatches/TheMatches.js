import React, { useState, useEffect, useRef } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import { firebaseMatches } from '../../firebase'
import { firebaseLooper, reverseArray } from '../UI/Misc'

import LeagueTable from './LeagueTable'
import MatchesList from './MatchesList'

const fetchMatches = async () => {
  let matches = await firebaseMatches.once('value')
  matches = firebaseLooper(matches)
  matches = reverseArray(matches)

  return matches
}

const TheMatches = () => {
  const [loading, setLoading] = useState(null)
  const [matches, setMatches] = useState(null)
  const [filteredMatches, setFilteredMatches] = useState(null)
  const [playedFilter, setPlayedFilter] = useState('All')
  const [resultFilter, setResultFilter] = useState('All')

  const isMounted = useRef(true)

  const getMatches = async () => {
    setLoading(true)
    if (!isMounted.current) return
    const matches = await fetchMatches()
    if (!isMounted.current) return
    setMatches(matches)
    setFilteredMatches(matches)
    setLoading(false)
  }

  const filterMatches = ({ isPlayed, result }) => {
    if (isPlayed === 'All') {
      setPlayedFilter('All')
    } else {
      setPlayedFilter(isPlayed)
    }
    if (result === 'All') {
      setResultFilter('All')
    } else {
      setResultFilter(result)
    }
    if (isPlayed === 'All' && result === 'All') {
      setFilteredMatches(matches)
      return
    }

    const list = matches.filter((match) => {
      return (
        (isPlayed === 'All' || match.final === isPlayed) &&
        (result === 'All' || match.result === result)
      )
    })
    setFilteredMatches(list)
  }

  useEffect(() => {
    getMatches()
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <div className='the_matches_container'>
      <div className='the_matches_wrapper'>
        <div className='left'>
          <div className='match_filters'>
            <div className='match_filters_box'>
              <div className='tag'>Show Match:</div>
              <div className='cont'>
                <div
                  className={`option ${playedFilter === 'All' ? 'active' : ''}`}
                  onClick={() =>
                    filterMatches({ isPlayed: 'All', result: resultFilter })
                  }
                >
                  All
                </div>
                <div
                  className={`option ${playedFilter === 'Yes' ? 'active' : ''}`}
                  onClick={() =>
                    filterMatches({ isPlayed: 'Yes', result: resultFilter })
                  }
                >
                  Played
                </div>
                <div
                  className={`option ${playedFilter === 'No' ? 'active' : ''}`}
                  onClick={() =>
                    filterMatches({ isPlayed: 'No', result: resultFilter })
                  }
                >
                  Not Played
                </div>
              </div>
            </div>
            <div className='match_filters_box'>
              <div className='tag'>Result Game:</div>
              <div className='cont'>
                <div
                  className={`option ${resultFilter === 'All' ? 'active' : ''}`}
                  onClick={() =>
                    filterMatches({ result: 'All', isPlayed: playedFilter })
                  }
                >
                  All
                </div>
                <div
                  className={`option ${resultFilter === 'W' ? 'active' : ''}`}
                  onClick={() =>
                    filterMatches({ result: 'W', isPlayed: playedFilter })
                  }
                >
                  W
                </div>
                <div
                  className={`option ${resultFilter === 'L' ? 'active' : ''}`}
                  onClick={() =>
                    filterMatches({ result: 'L', isPlayed: playedFilter })
                  }
                >
                  L
                </div>
                <div
                  className={`option ${resultFilter === 'D' ? 'active' : ''}`}
                  onClick={() =>
                    filterMatches({ result: 'D', isPlayed: playedFilter })
                  }
                >
                  D
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
          ) : (
            <MatchesList matches={filteredMatches} />
          )}
        </div>
        <div className='right'>
          <LeagueTable />
        </div>
      </div>
    </div>
  )
}

export default TheMatches
