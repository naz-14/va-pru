import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ToastSweetAlert } from '../Helpers/ToastSweetAlert'
import Logo from './../../Assets/Images/vinos-america-logo-01.svg'
import { CREATE_TOKEN_RECOVERY } from '../../graphql/Catalog/Users/user'

export const RecoveryPassword = () => {
  const [form, setForm] = useState({
    userName: '',
  })
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [createTokenRecovery] = useMutation(CREATE_TOKEN_RECOVERY)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.userName === '') {
      return ToastSweetAlert({
        mode: 'error',
        message:
          'Ingresa el nombre de usuario de la cuenta que quieres recuperar',
      })
    }
    setLoading(true)
    try {
      await createTokenRecovery({
        variables: {
          userName: form.userName,
        },
      })
      setLoading(false)
      return ToastSweetAlert(
        {
          mode: 'okModal',
          message:
            'Se te ha enviado un correo con las indicaciones para restablecer tu contraseña',
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
      <span className="mb-2">Recuperar contraseña</span>
      <div className="full-box">
        <form onSubmit={handleSubmit} method="post" className="row">
          <div className="input-icons-login col-12">
            <input
              id="user"
              type="text"
              className="form-control"
              placeholder="Ingresa tu nombre de usuario"
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
            />
          </div>
          <caption className="col-12">
            Ingresa tu usuario para enviar un código para que restablezcas tu
            contraseña{' '}
          </caption>
          <div className="login-btn col-12">
            {loading ? (
              <button className="btn btn-accept btn-sm" type="button" disabled>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Procesando...</span>
              </button>
            ) : (
              <button type="submit" className="btn btn-accept btn-sm">
                Solicitar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default RecoveryPassword
