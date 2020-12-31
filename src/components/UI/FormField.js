import React from 'react'

const renderTemplate = ({ formData, id, change }) => {
  let formTemplate = null

  const showError = () => {
    let errorMessage = (
      <div className='error_label'>
        {formData.validation && !formData.valid && formData.validationMessage}
      </div>
    )

    return errorMessage
  }

  switch (formData.element) {
    case 'input':
      formTemplate = (
        <div>
          {formData.showLabel && (
            <div className='label_input'>{formData.config.label}</div>
          )}
          <input
            {...formData.config}
            value={formData.value}
            onChange={(event) => change({ event, id })}
          />
          {showError()}
        </div>
      )
      break

    case 'select':
      formTemplate = (
        <div>
          {formData.showLabel && (
            <div className='label_input'>{formData.config.label}</div>
          )}
          <select
            value={formData.value}
            onChange={(event) => change({ event, id })}
          >
            <option value=''>Select one</option>
            {formData.config.options.map((item) => (
              <option key={item.key} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
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
