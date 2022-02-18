import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './../Styles/Global.scss'
import LoadingLayer from './../Components/Global/LoadingLayer'

import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { AuthContext } from '../Auth/AuthContext'

//PUBLIC COMPONENTS
import { Login } from '../Components/Auth/Login'

//ADMIN COMPONENTS
import Home from '../Components/Admin/Home/Example'

//PUBLIC COMPONENTS
import Verification from '../Components/Auth/Verification'
import Error404 from './../Components/Pages/404/Error404'
import PasswordRecovery from '../Components/Auth/Recovery'

//GRAPHQL COMPONENTS
import { useMutation } from '@apollo/client'
import { DECRYPT_TOKEN } from '../graphql/Auth/auth'
import { GET_ALL_USER_PERMISSIONS } from './../graphql/Catalog/Users/user'

import { types } from '../Types/types'
import moduleRoutesGenerator from '../helpers/moduleRoutesGenerator'
import submoduleRoutesGenerator from '../helpers/submoduleRoutesGenerator'

export const AppRouter = () => {
  const { user, dispatch } = useContext(AuthContext)
  const [decryptToken] = useMutation(DECRYPT_TOKEN)
  const [getAllUserPermissions] = useMutation(GET_ALL_USER_PERMISSIONS)
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const validateToken = async () => {
      try {
        setLoading(true)
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
        const userPermissions = await userPermissionsData.getAllUserPermissions
        setLoading(false)
        dispatch({
          type: types.login,
          payload: {
            logged: true,
            idUser: decoded.id,
            role: decoded.role,
            email: decoded.email,
            avatar: decoded.avatar,
            userPermissions,
            name: decoded.name,
          },
        })
      } catch (e) {
        setLoading(false)
        sessionStorage.removeItem('user')
        dispatch({
          type: types.logout,
        })
      }
    }
    if (token) {
      validateToken()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Permissions, token])

  return (
    <>
      {!loading ? (
        <Router>
          <Switch>
            <PublicRoute
              exact
              path="/login"
              component={Login}
              isAuth={user.logged}
            />
            <PublicRoute
              exact
              path="/recuperar-contraseña"
              component={PasswordRecovery}
              isAuth={user.logged}
            />
            <PublicRoute
              exact
              path="/verificar/usuario/:token?"
              component={Verification}
              isAuth={user.logged}
            />
            <PrivateRoute
              exact
              path="/dashboard"
              component={Home}
              isAuth={user.logged}
            />
            <PrivateRoute
              exact
              path="/"
              component={Home}
              isAuth={user.logged}
            />
            {user.userPermissions
              ? user.userPermissions.map((module) => {
                  const { access_read, access_retrieve, access_edit } = module
                  if (!module.id_submodule) {
                    return moduleRoutesGenerator(
                      access_read,
                      access_retrieve,
                      access_edit,
                      module,
                      user.logged
                    )
                  }
                  return submoduleRoutesGenerator(
                    access_read,
                    access_retrieve,
                    access_edit,
                    module,
                    user.logged
                  )
                })
              : null}
            )
            {localStorage.getItem('token') && (
              <Route component={Error404} isAuth={false} />
            )}
            {!localStorage.getItem('token') && (
              <PublicRoute path="*" exact component={Error404} isAuth={true} />
            )}
          </Switch>
        </Router>
      ) : (
        <LoadingLayer />
      )}
    </>
  )
}
