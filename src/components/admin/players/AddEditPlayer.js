import React, { useState, useEffect } from 'react'
import AdminLayout from '../../../HOC/AdminLayout'

import FormField from '../../UI/FormField'
import { validate } from '../../UI/Misc'

import { useHistory } from 'react-router-dom'

import { firebasePlayers, firebaseDB, firebase } from '../../../firebase'
import FileUploader from '../../UI/FileUploader'

const updateForm = ({ event, id }, { setForm, form }, content = undefined) => {
  const newFormData = { ...form.formData }
  const newElement = { ...newFormData[id] }

  if (!content) {
    newElement.value = event.target.value
  } else {
    newElement.value = content
  }

  let valiData = validate(newElement)
  newElement.valid = valiData[0]
  newElement.validationMessage = valiData[1]

  newFormData[id] = newElement

  setForm({ ...form, formData: newFormData, formError: false })
}

const successForm = ({ form, setForm, message }) => {
  setForm({ ...form, formSuccess: message })

  setTimeout(() => {
    setForm({ ...form, formSuccess: '' })
  }, 2000)
}

const submitForm = ({ event, form: { formData }, setForm, form, history }) => {
  event.preventDefault()

  let dataToSubmit = {}
  let formIsValid = true

  for (let key in formData) {
    dataToSubmit[key] = formData[key].value
    formIsValid = formData[key].valid && formIsValid
  }

  if (formIsValid) {
    if (form.formType === 'Edit Player') {
      firebaseDB
        .ref(`players/${form.playerId}`)
        .update(dataToSubmit)
        .then(() => {
          successForm({ form, setForm, message: 'Update correctly' })
        })
        .catch((e) => {
          setForm({ ...form, formError: true })
        })
    } else {
      firebasePlayers
        .push(dataToSubmit)
        .then(() => {
          history.push('/admin_players')
        })
        .catch((e) => {
          setForm({ ...form, formError: true })
        })
    }
  } else {
    setForm({ ...form, formError: true })
  }
}

const storeFilename = ({ filename, form, setForm }) => {
  updateForm({ id: 'image' }, { form, setForm }, filename)
}

const resetImage = ({ form, setForm }) => {
  const newFormData = { ...form.formData }
  newFormData['image'].value = ''
  newFormData['image'].valid = false
  setForm({ ...form, defaultImg: '', formData: newFormData })
}

const updateFields = ({
  playerData,
  playerId,
  formType,
  url,
  form,
  setForm,
}) => {
  const newFormData = { ...form.formData }

  for (let key in newFormData) {
    newFormData[key].value = playerData[key]
    newFormData[key].valid = true
  }

  setForm({
    ...form,
    formData: newFormData,
    playerId,
    defaultImg: url,
    formType,
  })
}

const AddEditPlayer = ({
  match: {
    params: { id: playerId },
  },
}) => {
  const [form, setForm] = useState({
    matchId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    teams: [],
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Name',
          name: 'name_input',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Last Name',
          name: 'lastname_input',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      number: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Number',
          name: 'number_input',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a Position',
          name: 'select_position',
          options: [
            { key: 'Keeper', value: 'Keeper' },
            { key: 'Defence', value: 'Defence' },
            { key: 'Midfield', value: 'Midfield' },
            { key: 'Striker', value: 'Striker' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true,
        },
        valid: true,
      },
    },
  })

  const history = useHistory()

  useEffect(() => {
    if (!playerId) {
      setForm((form) => ({ ...form, formType: 'Add Player' }))
    } else {
      setForm((form) => ({ ...form, formType: 'Edit Player' }))
      firebaseDB
        .ref(`players/${playerId}`)
        .once('value')
        .then((snapshot) => {
          const playerData = snapshot.val()
          firebase
            .storage()
            .ref('player')
            .child(playerData.image)
            .getDownloadURL()
            .then((url) => {
              updateFields({
                form,
                setForm,
                playerData,
                playerId,
                formType: 'Edit Player',
                url,
              })
            })
            .catch((e) => {
              playerData.image = ''
              updateFields({
                form,
                setForm,
                playerData,
                playerId,
                formType: 'Edit Player',
                url: '',
              })
            })
        })
    }
    // eslint-disable-next-line
  }, [playerId])

  return (
    <AdminLayout>
      <div className='editplayers_dialog_wrapper'>
        <h2>{form.formType}</h2>
        <div>
          <form onSubmit={(event) => submitForm(event, history)}>
            <FileUploader
              dir='player'
              tag='Player image'
              defaultImg={form.defaultImg}
              defaultImgName={form.formData.image.value}
              resetImage={() => resetImage({ form, setForm })}
              storeFilename={(filename) =>
                storeFilename({ filename, form, setForm })
              }
            />
            <FormField
              id={'name'}
              formData={form.formData.name}
              change={(element) => updateForm(element, { setForm, form })}
            />
            <FormField
              id={'lastname'}
              formData={form.formData.lastname}
              change={(element) => updateForm(element, { setForm, form })}
            />
            <FormField
              id={'number'}
              formData={form.formData.number}
              change={(element) => updateForm(element, { setForm, form })}
            />
            <FormField
              id={'position'}
              formData={form.formData.position}
              change={(element) => updateForm(element, { setForm, form })}
            />

            <div className='success_label'>{form.formSuccess}</div>
            {form.formError && (
              <div className='error_label'>Something is wrong</div>
            )}
            <div className='admin_submit'>
              <button
                onClick={(event) =>
                  submitForm({ event, form, setForm, history })
                }
              >
                {form.formType}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AddEditPlayer
