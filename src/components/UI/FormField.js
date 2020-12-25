import React from 'react'

const renderTemplate = ({ formData, id, change }) => {
  let formTemplate = null

  const showError = () => {
    let errorMessage =
      formData.validation && !formData.valid ? (
        <div className='error_label'>{formData.validationMessage}</div>
      ) : null

    return errorMessage
  }

  switch (formData.element) {
    case 'input':
      formTemplate = (
        <div>
          <input
            {...formData.config}
            value={formData.value}
            onChange={(event) => change({ event, id })}
          />
          {showError()}
        </div>
      )
      break
    default:
      formTemplate = null
  }

  return formTemplate
}

const FormField = ({ formData, id, change }) => {
  return <div>{renderTemplate({ formData, id, change })}</div>
}

export default FormField
