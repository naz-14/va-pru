/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState, useEffect } from 'react'
import Avatar from '../../Assets/Images/avatar-default.svg'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useController } from 'react-hook-form'
import { debounce } from 'lodash'
import CropperImage from './CropperImage'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { FileValidator } from '../Helpers/GenericFunctions'
import { ToastSweetAlert } from '../Helpers/ToastSweetAlert'
import { UPDATE_AVATAR } from '../../graphql/Global/uploadFiles'
import { useMutation } from '@apollo/client'
import { GET_USER_BY_ID } from '../../graphql/Catalog/Users/user'

export const InputController = ({
  label,
  name,
  control,
  rows = 3,
  options = '',
  inputType = 'text',
  userId = null,
  isMulti = false,
  closeOnSelect = true,
  validateFormat = 'image',
  validateFormatMsg = 'Elija uno de los formatos sugeridos',
  formatAccept = 'image/*',
  previewPic = Avatar,
  changeAction = () => {},
  blurAction = () => {},
  ...props
}) => {
  const [cropper, setCropper] = useState(null)
  const [image, setImage] = useState(Avatar)
  const [result, setResult] = useState(false)
  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    refetchQueries: [
      GET_USER_BY_ID,
      {
        variables: {
          getUserByIdId: parseInt(userId),
        },
      },
    ],
  })
  const MySwal = withReactContent(Swal)
  const {
    field: { onChange, value },
    fieldState: { invalid, error },
  } = useController({ control, name, defaultValue: '' })

  const animatedComponents = makeAnimated()

  const handleChange = (e) => {
    onChange(e.target.value)
    doAction(e)
  }

  const handleChangeChoosen = (e) => {
    onChange(e.value)
    doAction(e)
  }

  const doAction = useRef(
    debounce((e) => {
      changeAction(e)
    }, 500)
  ).current

  const handleClickInput = (name) => {
    const element = document.getElementById(name)
    element.click()
  }

  const handleChangeImage = async (e, validateFormat, autoUpdate = false) => {
    if (!e.target.files[0]) {
      return
    }
    const validate = await FileValidator(e.target.files[0], validateFormat)
    if (validate) {
      changeAction(e)
      const isComplete = await handleCropImage(e.target.files[0])
      if (isComplete) {
        setTimeout(async function () {
          let res, img

          img = localStorage.getItem('usersImage')
          if (img) res = await getFileFromUrl(img, '.jpg')
          else res = e.target.files[0]

          onChange(res)
          if (autoUpdate) {
            await updateAvatar({
              variables: {
                idUser: parseInt(userId),
                avatar: res,
              },
            })
          }
        }, 350)
      }
    } else
      ToastSweetAlert({
        mode: 'errorModal',
        message: validateFormatMsg,
      })
  }

  const handleChangeFile = (e, validateFormat) => {
    const file = e.target.files[0]
    if (!file) return
    onChange(e.target.files[0])
    changeAction(e)
  }

  const handleCropImage = async (file) => {
    if (file) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = async () => {
          await MySwal.fire({
            title: 'Selecciona la fracción que deseas utilizar',
            allowOutsideClick: false,
            html: (
              <CropperImage _image={reader.result} setCropper={setCropper} />
            ),
            showDenyButton: true,
            focusConfirm: false,
            denyButtonText: '<i class="fas fa-times"> Cancelar</i>',
            confirmButtonText: '<i class="fas fa-check"> Finalizar</i>',
            customClass: {
              confirmButton: 'btn btn-sm btn-accept',
              denyButton: 'btn btn-sm btn-danger',
              icon: 'no-border',
            },
          }).then((result) => {
            setResult(result.isConfirmed)
            return resolve(result.isConfirmed)
          })
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const getFileFromUrl = async (url, defaultType) => {
    const response = await fetch(url)
    const data = await response.blob()
    return new File([data], 'file', {
      type: response.headers.get('content-type') || defaultType,
    })
  }

  //CONTROl THE SET OF THE CROPPED IMAGE
  useEffect(() => {
    if (result) {
      localStorage.setItem('usersImage', cropper?.toDataURL())
      setImage(cropper?.toDataURL())
      setResult(false)
    }
  }, [result, cropper, image])

  //SETIMAGE PREVIEW WHEN EXISTS
  useEffect(() => {
    if (!cropper) {
      setImage(previewPic)
    }
  }, [image, previewPic, cropper])

  return (
    <>
      {inputType === 'text' && (
        <>
          <label>
            <b>{label}</b>
          </label>
          <input
            {...props}
            onChange={(e) => handleChange(e)}
            value={value ? value : ''}
            onBlur={blurAction}
            className={`form-control rounded-2 ${invalid && 'is-invalid'}`}
          />
          <span className="error invalid-feedback">{error?.message}</span>
        </>
      )}
      {inputType === 'textarea' && (
        <>
          <label>
            <b>{label}</b>
          </label>
          <textarea
            {...props}
            onChange={(e) => handleChange(e)}
            value={value ? value : ''}
            rows={rows}
            onBlur={blurAction}
            className={`form-control rounded-2 ${invalid && 'is-invalid'}`}
          />
          <span className="error invalid-feedback">{error?.message}</span>
        </>
      )}

      {inputType === 'select' && (
        <>
          <label>
            <b>{label}</b>
          </label>
          <select
            {...props}
            onChange={(e) => handleChange(e)}
            value={value ? value : ''}
            rows={rows}
            onBlur={blurAction}
            className={`form-control rounded-2 ${invalid && 'is-invalid'}`}
          >
            <option disabled hidden value="">
              Seleccione una opción
            </option>
            <>
              {options.length > 0 ? (
                <> {options}</>
              ) : (
                <option value="" disabled>
                  No hay datos registrados
                </option>
              )}
            </>
          </select>
          <span className="error invalid-feedback">{error?.message}</span>
        </>
      )}
      {inputType === 'choosen' && (
        <>
          <label>
            <b>{label}</b>
          </label>
          <Select
            {...props}
            closeMenuOnSelect={closeOnSelect}
            components={animatedComponents}
            name={name}
            placeholder="Selecciona una opción"
            NoOptionsMessage="No hay datos registrados"
            isMulti={isMulti}
            control={control}
            options={options}
            onBlur={blurAction}
            onChange={(e) => handleChangeChoosen(e)}
            className={`${invalid && 'is-invalid'}`}
            value={options?.find((option) => {
              if (parseInt(option.value) === parseInt(value)) {
                return option
              }
              return null
            })}
            styles={{
              control: (base) => ({
                ...base,
                borderColor: invalid ? '#dc3545' : '#ced4da',
                ':hover': { borderColor: invalid ? '#dc3545' : '#ced4da' },
              }),
            }}
          />
          <span className="error invalid-feedback">{error?.message}</span>
        </>
      )}

      {inputType === 'image' && (
        <div className="container-upload">
          <div className="avatar-upload">
            <input
              {...props}
              id={name}
              type="file"
              hidden
              defaultValue={value}
              onChange={(e) => handleChangeImage(e, validateFormat)}
              onBlur={blurAction}
              accept={formatAccept}
              control={control}
            />
            <label
              className="btn btn-danger circle-btn"
              htmlFor="imageUpload"
              onClick={() => handleClickInput(name)}
            >
              <i
                className={`fas fa-${
                  cropper || image ? 'pencil-alt' : 'plus'
                } `}
              ></i>
            </label>
          </div>
          <div className="avatar-preview">
            <img src={cropper || image ? image : Avatar} alt="avatar-upload" />
          </div>
          <span className="error">{error?.message}</span>
        </div>
      )}

      {inputType === 'imageAutoSend' && (
        <div className="container-upload">
          <div className="avatar-upload">
            <input
              {...props}
              id={name}
              type="file"
              hidden
              defaultValue={value}
              onChange={(e) => handleChangeImage(e, validateFormat, true)}
              onBlur={blurAction}
              accept={formatAccept}
              control={control}
            />
            <label
              className="btn btn-danger circle-btn"
              htmlFor="imageUpload"
              onClick={() => handleClickInput(name)}
            >
              <i
                className={`fas fa-${
                  cropper || image ? 'pencil-alt' : 'plus'
                } `}
              ></i>
            </label>
          </div>
          <div className="avatar-preview">
            <img src={cropper || image ? image : Avatar} alt="avatar-upload" />
          </div>
          <span className="error">{error?.message}</span>
        </div>
      )}

      {inputType === 'file' && (
        <>
          <label>
            <b>{label}</b>
          </label>
          <input
            {...props}
            type="file"
            defaultValue={value}
            onChange={(e) => handleChangeFile(e, validateFormat)}
            accept={formatAccept}
            onBlur={blurAction}
            className={`form-control rounded-2 ${invalid && 'is-invalid'}`}
          />
          <span className="error invalid-feedback">{error?.message}</span>
        </>
      )}
    </>
  )
}
export default InputController
