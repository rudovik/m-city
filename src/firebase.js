import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBdffj1Fryrx8GfU_Q3jejK1Kv-8FI1wg0',
  authDomain: 'm-city-e8fe6.firebaseapp.com',
  databaseURL: 'https://m-city-e8fe6-default-rtdb.firebaseio.com',
  projectId: 'm-city-e8fe6',
  storageBucket: 'm-city-e8fe6.appspot.com',
  messagingSenderId: '1046137068858',
  appId: '1:1046137068858:web:fbf5267ad8bfc639438403',
}

firebase.initializeApp(firebaseConfig)

const firebaseDB = firebase.database()
const firebaseMatches = firebaseDB.ref('matches')
const firebasePromotions = firebaseDB.ref('promotions')
const firebaseTeams = firebaseDB.ref('teams')

export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebaseDB,
}
