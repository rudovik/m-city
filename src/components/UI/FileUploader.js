import React, { useState, useEffect } from 'react'
import { firebase } from '../../firebase'
import FU from 'react-firebase-file-uploader'
import CircularProgress from '@material-ui/core/CircularProgress'

const handleUploadStart = ({ img, setImg }) => {
  setImg({ ...img, isUploading: true })
}

const handleUploadError = ({ img, setImg, error }) => {
  setImg({ ...img, isUploading: false })
}

const handleUploadSuccess = ({ img, setImg, filename, dir, storeFilename }) => {
  firebase
    .storage()
    .ref(dir)
    .child(filename)
    .getDownloadURL()
    .then((url) => {
      setImg({ name: filename, isUploading: false, fileURL: url })
      storeFilename(filename)
    })
}

const uploadAgain = ({ img, setImg, resetImage }) => {
  setImg({
    name: '',
    isUploading: false,
    fileURL: '',
  })
  resetImage()
}

const FileUploader = ({
  defaultImgName,
  defaultImg,
  tag,
  dir,
  storeFilename,
  resetImage,
}) => {
  const [img, setImg] = useState({
    name: defaultImgName || '',
    isUploading: false,
    fileURL: defaultImg || '',
  })

  useEffect(() => {
    if (defaultImg) {
      setImg((img) => ({ ...img, fileURL: defaultImg }))
    }
  }, [defaultImg])

  return (
    <div>
      {!img.fileURL && (
        <div>
          <div className='label_input'>{tag}</div>
          <FU
            accept='image/*'
            name='image'
            randomizeFilename
            storageRef={firebase.storage().ref(dir)}
            onUploadStart={() => handleUploadStart({ img, setImg })}
            onUploadError={(error) => handleUploadError({ img, setImg, error })}
            onUploadSuccess={(filename) =>
              handleUploadSuccess({ img, setImg, dir, filename, storeFilename })
            }
          />
        </div>
      )}
      {img.isUploading && (
        <div
          className='progress'
          style={{ textAlign: 'center', margin: '30px 0' }}
        >
          <CircularProgress style={{ color: '#98c6e9' }} thickness={7} />
        </div>
      )}
      {img.fileURL && (
        <div className='image_upload_container'>
          <img style={{ width: '100%' }} src={img.fileURL} alt={img.name} />
          <div
            className='remove'
            onClick={() => uploadAgain({ img, setImg, resetImage })}
          >
            Remove
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUploader
