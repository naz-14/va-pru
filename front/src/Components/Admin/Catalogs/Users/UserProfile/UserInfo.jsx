import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../../../../Auth/AuthContext'
import { useMutation } from '@apollo/client'
import { UPDATE_USER_PASSWORD } from '../../../../../graphql/Catalog/Users/user'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { passwordValidator } from '../../../../Helpers/validatorCustomerForm'
import Swal from 'sweetalert2'
import { ToastSweetAlert } from '../../../../Helpers/ToastSweetAlert'
import InputController from '../../../../Global/InputController'
import { types } from '../../../../../Types/types'

export const UserInfo = ({ info }) => {
  const { dispatch } = useContext(AuthContext)
  const [_data, set_data] = useState(null)
  const [display, setDisplay] = useState(false)
  const history = useHistory()

  const [updatePassword] = useMutation(UPDATE_USER_PASSWORD)
  const data = info
  useEffect(() => {
    if (data) {
      set_data(data.GetUserById)
    }
  }, [data])

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(passwordValidator),
  })

  const handleLogout = () => {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('requestPath')
    localStorage.removeItem('token')
    localStorage.removeItem('configSys')
    dispatch({
      type: types.logout,
    })
  }

  const handleUpdatePassword = async (data) => {
    Swal.fire({
      title: 'Se procederá a actualizar la contraseña',
      text: '¿Seguro que desea continuar?',
      icon: 'warning',
      allowOutsideClick: false,
      showDenyButton: true,
      denyButtonText: '<i class="fas fa-times"> Cancelar</i>',
      confirmButtonText: '<i class="fas fa-wrench"> Actualizar</i>',
      customClass: {
        confirmButton: 'btn btn-sm btn-accept',
        denyButton: 'btn btn-sm btn-danger',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updatePassword({
            variables: {
              idUser: parseInt(_data.id),
              currentPassword: data.currentPassword,
              password: data.password,
            },
          })
          await handleLogout()
          return ToastSweetAlert(
            {
              mode: 'okModal',
              message:
                'Contraseña actualizada correctamente, por favor inicie sesión nuevamente',
            },
            history.push(`/`)
          )
        } catch (errors) {
          ToastSweetAlert({
            mode: 'errorModal',
            message: errors.message,
          })
        }
      }
    })
  }

  return (
    <div className="col-lg-9 col-md-6 col-sm-12">
      <div className="card">
        <div className="card-header p-2">
          <h3 className="card-title">Información General</h3>
        </div>
        <div className="card-body ">
          <div className="card-body d-lg-flex d-md-block row">
            {_data && (
              <>
                <div className="col-lg-4 col-md-12 col-sm-6">
                  <b>Nombre</b>{' '}
                  <p className="mt-2">{_data.name + ' ' + _data.first_name}</p>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-6">
                  <b>Usuario</b> <p className="mt-2">{_data.user_name}</p>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <b>Correo</b> <p className="mt-2">{_data.email}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header p-2">
          <h3 className="card-title">Información de dirección</h3>
        </div>
        <div className="card-body">
          <div className="card-body row">
            {_data && (
              <>
                <div className="col-lg-6 col-md-8 col-sm-6">
                  <b>Calle</b> <p className="mt-2">{_data.address.street}</p>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <b>Ext.</b>{' '}
                  <p className="mt-2">{_data.address.external_number}</p>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <b>Int</b>{' '}
                  <p className="mt-2">{_data.address.internal_number}</p>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <b>C.P.</b> <p className="mt-2">{_data.address.zip_code}</p>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <b>Colonia</b>{' '}
                  <p className="mt-2">{_data.address.colony.name}</p>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <b>Ciudad</b>{' '}
                  <p className="mt-2">{_data.address.city.name}</p>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <b>Municipio</b>{' '}
                  <p className="mt-2">{_data.address.colony.name}</p>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <b>Estado</b>{' '}
                  <p className="mt-2">{_data.address.colony.name}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header p-2">
          <h3 className="card-title">Actualizar Contraseña</h3>
          {display && (
            <button
              className="btn btn-sm btn-danger float-right ml-2"
              onClick={() => setDisplay(false)}
            >
              Cancelar
            </button>
          )}
          <button
            className="btn btn-accept btn-sm float-right"
            onClick={() => setDisplay(true)}
          >
            Actualizar
          </button>
        </div>
        {display && (
          <div className="card-body">
            <form onSubmit={handleSubmit(handleUpdatePassword)}>
              <InputController
                label="Contraseña actual"
                type="password"
                name="currentPassword"
                placeholder="Ingrese la contraseña actual"
                control={control}
              />
              <br />
              <InputController
                label="Nueva Contraseña"
                type="password"
                name="password"
                placeholder="Ingrese la nueva contraseña"
                control={control}
              />
              <br />
              <InputController
                label="Confirmar nueva contraseña"
                type="password"
                name="passwordConfirm"
                placeholder="Confirme la contraseña"
                control={control}
              />
              <button type="submit" className="mt-3 btn btn-danger btn-block">
                <b>Actualizar contraseña</b>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
