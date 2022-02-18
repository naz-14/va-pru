import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import {
  UPDATE_PASSWORD,
  CHECK_TOKEN_RECOVERY,
} from '../../graphql/Catalog/Users/user'
import { ToastSweetAlert } from '../Helpers/ToastSweetAlert'
import Logo from './../../Assets/Images/vinos-america-logo-01.svg'

export const Verification = () => {
  const [form, setForm] = useState({
    password: '',
    passwordConfirm: '',
  })
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { token: _token } = useParams()

  const [updatePassword] = useMutation(UPDATE_PASSWORD)
  const [dataToken] = useMutation(CHECK_TOKEN_RECOVERY)

  useEffect(() => {
    if (_token) {
      async function validateToken() {
        try {
          await dataToken({
            variables: {
              token: _token,
            },
          })
        } catch (error) {
          ToastSweetAlert(
            {
              mode: 'errorModal',
              message: error.message,
            },
            history.push('/recuperar-contraseña')
          )
        }
      }
      validateToken()
    } else {
      ToastSweetAlert(
        {
          mode: 'errorModal',
          message: 'Acción no permitida',
        },
        history.push('/recuperar-contraseña')
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.passwordConfirm) {
      return ToastSweetAlert({
        mode: 'error',
        message: 'Las contraseñas no coinciden',
      })
    }
    if (form.password === '' || form.passwordConfirm === '') {
      return ToastSweetAlert({
        mode: 'error',
        message: 'Debe ingresar una contraseña',
      })
    }
    setLoading(true)

    try {
      await updatePassword({
        variables: {
          inputRecovery: {
            token: _token,
            password: form.password,
          },
        },
      })

      setLoading(false)
      return ToastSweetAlert(
        {
          mode: 'okModal',
          message:
            'Se actualizo correctamente tu contraseña. Ahora puedes iniciar sesión con tu nueva contraseña',
        },
        history.push('/login')
      )
    } catch (error) {
      setLoading(false)
      return ToastSweetAlert({
        mode: 'error',
        message: error.message,
      })
    }
  }

  return (
    <div className="full-container">
      <Link to="/" className="h1">
        <img src={Logo} className="img-logo-full m-4" alt="logo" />
      </Link>
      <span className="mb-2">Ingresa una nueva contraseña</span>
      <div className="full-box" id="boxLogin">
        <form onSubmit={handleSubmit} method="post" className="row">
          <div className="input-icons-login col-12">
            <input
              id="pass"
              type="password"
              className="form-control"
              placeholder="Nueva contraseña"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="input-icons-login col-12">
            <input
              id="pass"
              type="password"
              className="form-control"
              placeholder="Confirme la contraseña"
              onChange={(e) =>
                setForm({ ...form, passwordConfirm: e.target.value })
              }
            />
          </div>
          <div className="login-btn col-12">
            {loading ? (
              <button className="btn btn-accept" type="button" disabled>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Procesando...</span>
              </button>
            ) : (
              <button type="submit" className="btn btn-accept">
                Actualizar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Verification
