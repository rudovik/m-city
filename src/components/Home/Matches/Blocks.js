import React, { useState, useEffect } from 'react'
import { firebaseMatches } from '../../../firebase'
import { firebaseLooper, reverseArray } from '../../UI/Misc'

import MatchesBlock from '../../UI/MatchesBlock'

import Slide from 'react-reveal/Slide'

const showMatches = (matches) =>
  matches
    ? matches.map((match, i) => (
        <Slide bottom key={match.id}>
          <div className='item'>
            <div className='wrapper'>
              <MatchesBlock match={match} />
            </div>
          </div>
        </Slide>
      ))
    : null

const fetchMatches = async (setMatches) => {
  const snapshot = await firebaseMatches.limitToLast(6).once('value')
  const matchesArray = firebaseLooper(snapshot)
  const reversedMatchesArray = reverseArray(matchesArray)

  setMatches(reversedMatchesArray)
}

const Blocks = () => {
  const [matches, setMatches] = useState(null)

  useEffect(() => {
    if (matches === null) {
      fetchMatches(setMatches)
    }
  }, [matches])

  return <div className='home_matches'>{showMatches(matches)}</div>
}

export default Blocks
