import React, { useState, useEffect } from 'react'
import AdminLayout from '../../../HOC/AdminLayout'

import FormField from '../../UI/FormField'
import { validate } from '../../UI/Misc'

import { firebaseTeams, firebaseDB, firebaseMatches } from '../../../firebase'
import { firebaseLooper } from '../../UI/Misc'

const updateFields = ({
  match,
  teamOptions,
  teams,
  type,
  matchId,
  state,
  setState,
}) => {
  const newFormData = {
    ...state.formData,
  }

  for (let key in newFormData) {
    if (match) {
      newFormData[key].value = match[key]
      newFormData[key].valid = true
    }
    if (key === 'local' || key === 'away') {
      newFormData[key].config.options = teamOptions
    }
  }
  setState({
    ...state,
    teams,
    matchId,
    formType: type,
    formData: newFormData,
  })
}

const getTeams = ({ match, type, matchId, state, setState }) => {
  firebaseTeams.once('value').then((snapshot) => {
    const teams = firebaseLooper(snapshot)
    const teamOptions = []

    snapshot.forEach((childSnapshot) => {
      teamOptions.push({
        key: childSnapshot.val().shortName,
        value: childSnapshot.val().shortName,
      })
    })
    updateFields({ match, teamOptions, teams, type, matchId, state, setState })
  })
}

const updateForm = ({ event, id }, { setState, state }) => {
  const newFormData = { ...state.formData }
  const newElement = { ...newFormData[id] }
  newElement.value = event.target.value

  let valiData = validate(newElement)
  newElement.valid = valiData[0]
  newElement.validationMessage = valiData[1]

  newFormData[id] = newElement

  setState({ ...state, formData: newFormData, formError: false })
}

const successForm = ({ state, setState, message }) => {
  setState({ ...state, formSuccess: message })

  setTimeout(() => {
    setState({ ...state, formSuccess: '' })
  }, 2000)
}

const submitForm = ({ event, state: { formData }, setState, state }) => {
  event.preventDefault()

  let dataToSubmit = {}
  let formIsValid = true

  for (let key in formData) {
    dataToSubmit[key] = formData[key].value
    formIsValid = formData[key].valid && formIsValid
  }

  state.teams.forEach((team) => {
    if (team.shortName === dataToSubmit.local) {
      dataToSubmit['localThmb'] = team.thmb
    }
    if (team.shortName === dataToSubmit.away) {
      dataToSubmit['awayThmb'] = team.thmb
    }
  })

  console.log(dataToSubmit)

  if (formIsValid) {
    if (state.formType === 'Edit Match') {
      firebaseDB
        .ref(`matches/${state.matchId}`)
        .update(dataToSubmit)
        .then(() => {
          successForm({ state, setState, message: 'Updated correctly' })
        })
        .catch((e) => {
          setState({ ...state, formError: true })
        })
    } else {
      firebaseMatches
        .push(dataToSubmit)
        .then(() => {
          successForm({ state, setState, message: 'Created correctly' })
        })
        .catch((e) => {
          setState({ ...state, formError: true })
        })
    }
  } else {
    setState({ ...state, formError: true })
  }
}

const AddEditMatch = ({
  match: {
    params: { id: matchId },
  },
}) => {
  const [state, setState] = useState({
    matchId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    teams: [],
    formData: {
      date: {
        element: 'input',
        value: '',
        config: {
          label: 'Event date',
          name: 'date_input',
          type: 'date',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      local: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a local team',
          name: 'select_local',
          options: [
            { key: 'Yes', value: 'Yes' },
            { key: 'No', value: 'No' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      resultLocal: {
        element: 'input',
        value: '',
        config: {
          label: 'Result Local',
          name: 'result_local_input',
          type: 'number',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      away: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a local team',
          name: 'select_local',
          options: [
            { key: 'Yes', value: 'Yes' },
            { key: 'No', value: 'No' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      resultAway: {
        element: 'input',
        value: '',
        config: {
          label: 'Result Local',
          name: 'result_local_input',
          type: 'number',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      referee: {
        element: 'input',
        value: '',
        config: {
          label: 'Referee',
          name: 'raferee_input',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      stadium: {
        element: 'input',
        value: '',
        config: {
          label: 'Stadium',
          name: 'stadium_input',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      result: {
        element: 'select',
        value: '',
        config: {
          label: 'Team result',
          name: 'select_result',
          options: [
            { key: 'W', value: 'W' },
            { key: 'L', value: 'L' },
            { key: 'D', value: 'D' },
            { key: 'n/a', value: 'n/a' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      final: {
        element: 'select',
        value: '',
        config: {
          label: 'Game played?',
          name: 'select_result',
          options: [
            { key: 'Yes', value: 'Yes' },
            { key: 'No', value: 'No' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
    },
  })

  useEffect(() => {
    if (!matchId) {
      getTeams({ type: 'Add Match', matchId, state, setState })
    } else {
      firebaseDB
        .ref(`matches/${matchId}`)
        .once('value')
        .then((snapshot) => {
          const match = snapshot.val()
          getTeams({ match, type: 'Edit Match', matchId, state, setState })
        })
    }
    // eslint-disable-next-line
  }, [matchId])

  return (
    <AdminLayout>
      <div className='editmatch_dialog_wrapper'>
        <h2>{state.formType}</h2>
        <div>
          <form onSubmit={(event) => submitForm({ event, state, setState })}>
            <FormField
              id={'date'}
              formData={state.formData.date}
              change={(element) => updateForm(element, { setState, state })}
            />

            <div className='select_team_layout'>
              <div className='label_input'>Local</div>
              <div className='wrapper'>
                <div className='left'>
                  <FormField
                    id={'local'}
                    formData={state.formData.local}
                    change={(element) =>
                      updateForm(element, { setState, state })
                    }
                  />
                </div>
                <div>
                  <FormField
                    id={'resultLocal'}
                    formData={state.formData.resultLocal}
                    change={(element) =>
                      updateForm(element, { setState, state })
                    }
                  />
                </div>
              </div>
            </div>

            <div className='select_team_layout'>
              <div className='label_input'>Away</div>
              <div className='wrapper'>
                <div className='left'>
                  <FormField
                    id={'away'}
                    formData={state.formData.away}
                    change={(element) =>
                      updateForm(element, { setState, state })
                    }
                  />
                </div>
                <div>
                  <FormField
                    id={'resultAway'}
                    formData={state.formData.resultAway}
                    change={(element) =>
                      updateForm(element, { setState, state })
                    }
                  />
                </div>
              </div>
            </div>

            <div className='split_fields'>
              <FormField
                id={'referee'}
                formData={state.formData.referee}
                change={(element) => updateForm(element, { setState, state })}
              />

              <FormField
                id={'stadium'}
                formData={state.formData.stadium}
                change={(element) => updateForm(element, { setState, state })}
              />
            </div>

            <div className='split_fields last'>
              <FormField
                id={'result'}
                formData={state.formData.result}
                change={(element) => updateForm(element, { setState, state })}
              />

              <FormField
                id={'final'}
                formData={state.formData.final}
                change={(element) => updateForm(element, { setState, state })}
              />
            </div>

            <div className='success_label'>{state.formSuccess}</div>
            {state.formError && (
              <div className='error_label'>Something is wrong</div>
            )}
            <div className='admin_submit'>
              <button
                onClick={(event) => submitForm({ event, state, setState })}
              >
                {state.formType}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AddEditMatch
