import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'
import FormField from '../../UI/FormField'
import { validate } from '../../UI/Misc'
import { firebasePromotions } from '../../../firebase'

const submitForm = ({ event, state: { formData }, setState, state }) => {
  event.preventDefault()

  const resetFormSuccess = (type) => {
    const newFormData = { ...formData }

    for (let key in newFormData) {
      newFormData[key].value = ''
      newFormData[key].valid = false
      newFormData[key].validationMessage = ''
    }

    setState({
      ...state,
      formData: newFormData,
      formSuccess: type ? 'Congratulations' : 'Already on the database',
    })

    setTimeout(() => {
      setState({ ...state, formSuccess: '' })
    }, 2000)
  }

  let dataToSubmit = {}
  let formIsValid = true

  for (let key in formData) {
    dataToSubmit[key] = formData[key].value
    formIsValid = formData[key].valid
  }

  if (formIsValid) {
    firebasePromotions
      .orderByChild('email')
      .equalTo(dataToSubmit.email)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val() === null) {
          firebasePromotions.push(dataToSubmit)
          resetFormSuccess(true)
        } else {
          resetFormSuccess(false)
        }
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

const Enroll = () => {
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
    },
  })

  return (
    <Fade>
      <div className='enroll_wrapper'>
        <form onSubmit={(event) => submitForm(event)}>
          <div className='enroll_title'>Enter your email</div>
          <div className='enroll_input'>
            <FormField
              id={'email'}
              formData={state.formData.email}
              change={(element) => updateForm(element, { setState, state })}
            />
            {state.formError && (
              <div className='error_label'>Something is wrong, try again.</div>
            )}
            <div className='success_label'>{state.formSuccess}</div>
            <button
              onClick={(event) => {
                submitForm({ event, state, setState })
              }}
            >
              Enroll
            </button>
            <div className='enroll_disclaimer'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
        </form>
      </div>
    </Fade>
  )
}

export default Enroll
