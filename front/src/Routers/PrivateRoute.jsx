import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { LayoutLogged } from '../Components/Layout/LayoutLogged'

export const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth ? (
          <LayoutLogged>
            <Component {...props} />
          </LayoutLogged>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

PrivateRoute.prototype = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}
