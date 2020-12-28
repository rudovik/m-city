import React, { useState } from 'react'
import FormField from '../UI/FormField'
import { validate } from '../UI/Misc'
import { firebase } from '../../firebase'
import { useHistory } from 'react-router-dom'

const submitForm = ({
  event,
  state: { formData },
  setState,
  state,
  history,
}) => {
  event.preventDefault()

  const resetFormSuccess = (type) => {
    const newFormData = { ...formData }

    for (let key in newFormData) {
      newFormData[key].value = ''
      newFormData[key].valid = false
      newFormData[key].validationMessage = ''
    }

    // setState({
    //   ...state,
    //   formData: newFormData,
    //   formSuccess: type ? 'Congratulations' : 'Already on the database',
    // })

    // setTimeout(() => {
    //   setState({ ...state, formSuccess: '' })
    // }, 2000)
  }

  let dataToSubmit = {}
  let formIsValid = true

  for (let key in formData) {
    dataToSubmit[key] = formData[key].value
    formIsValid = formData[key].valid
  }

  if (formIsValid) {
    firebase
      .auth()
      .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
      .then(() => {
        resetFormSuccess()
        history.push('/dashboard')
      })
      .catch((error) => {
        setState({ ...state, formError: true })
      })

    // resetFormSuccess()
  } else {
    setState({ ...state, formError: true })
  }
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

const LogIn = () => {
  const [state, setState] = useState({
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationMessage: '',
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
      },
    },
  })

  const history = useHistory()

  return (
    <div className='container'>
      <div className='signin_wrapper' style={{ margin: '100px' }}>
        <form
          onSubmit={(event) => submitForm({ event, state, setState, history })}
        >
          <h2>Please Login</h2>
          <FormField
            id={'email'}
            formData={state.formData.email}
            change={(element) => updateForm(element, { setState, state })}
          />
          <FormField
            id={'password'}
            formData={state.formData.password}
            change={(element) => updateForm(element, { setState, state })}
          />
          {state.formError && (
            <div className='error_label'>Something is wrong, try again.</div>
          )}
          <button
            onClick={(event) => {
              submitForm({ event, state, setState, history })
            }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}

export default LogIn
