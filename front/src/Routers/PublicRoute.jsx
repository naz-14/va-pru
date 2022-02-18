import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { LayoutUnlogged } from '../Components/Layout/LayoutUnlogged'

export const PublicRoute = ({
  isAuth,
  userType,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth ? (
          <>
            <Redirect to="/dashboard" />
          </>
        ) : (
          <LayoutUnlogged>
            <Component {...props} />
          </LayoutUnlogged>
        )
      }
    />
  )
}

PublicRoute.prototype = {
  isAuth: PropTypes.bool.isRequired,
  userType: PropTypes.number.isRequired,
  component: PropTypes.func.isRequired,
}
