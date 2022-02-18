import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { types } from '../../Types/types'
import { useMutation } from '@apollo/client'
import { AUTH_USER, DECRYPT_TOKEN } from '../../graphql/Auth/auth'
import { GET_ALL_USER_PERMISSIONS } from '../../graphql/Catalog/Users/user'
import { AuthContext } from '../../Auth/AuthContext'
import { ToastSweetAlert } from '../Helpers/ToastSweetAlert'
import Logo from './../../Assets/Images/vinos-america-logo-01.svg'

export const Login = () => {
  const { dispatch } = useContext(AuthContext)
  const [form, setForm] = useState({
    user: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const [authUser] = useMutation(AUTH_USER)
  const [decryptToken] = useMutation(DECRYPT_TOKEN)
  const [getAllUserPermissions] = useMutation(GET_ALL_USER_PERMISSIONS)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data: dataToken } = await authUser({
        variables: {
          input: {
            userName: form.user,
            password: form.password,
          },
        },
      })
      const token = dataToken.authUser.token
      localStorage.setItem('token', token)
      const { data: tokenData } = await decryptToken({
        variables: {
          token,
        },
      })
      const decoded = tokenData.decryptToken
      const { data: userPermissionsData } = await getAllUserPermissions({
        variables: {
          userID: decoded.id,
        },
      })
      const userPermissions = userPermissionsData.getAllUserPermissions

      dispatch({
        type: types.login,
        payload: {
          logged: true,
          idUser: decoded.id,
          role: decoded.role,
          email: decoded.email,
          userPermissions,
          avatar: decoded.avatar,
          name: decoded.name,
        },
      })
      setLoading(false)
      /* return ToastSweetAlert({
        mode: 'ok',
        message: 'Sesión iniciada',
      }) */
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
      <Link to="/" className="h1 d-flex justify-content-center mb-5">
        <img src={Logo} className="img-logo-full" alt="logo" />
      </Link>
      <span>Inicio de sesión</span>
      <div className="full-box" id="boxLogin">
        <form onSubmit={handleLogin} method="post" className="row">
          <div className="input-icons-login col-12">
            <input
              id="user"
              type="text"
              className="form-control"
              placeholder="Usuario"
              onChange={(e) => setForm({ ...form, user: e.target.value })}
            />
          </div>
          <div className="input-icons-login col-12">
            <input
              id="pass"
              type="password"
              className="form-control"
              placeholder="Contraseña"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="actions-login col-12">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="remember"
              />
              <label className="custom-control-label" htmlFor="remember">
                Recordarme
              </label>
            </div>
            <div>
              <Link to="/recuperar-contraseña">Olvidé mi contraseña</Link>
            </div>
          </div>
          <div className="login-btn col-12">
            {loading ? (
              <button
                className="btn btn-accept btn-login"
                type="button"
                disabled
              >
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Iniciando...</span>
              </button>
            ) : (
              <button type="submit" className="btn btn-accept btn-login">
                Iniciar sesión
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
