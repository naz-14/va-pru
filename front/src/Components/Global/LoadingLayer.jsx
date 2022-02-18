import React from 'react'
import logo from './../../Assets/Images/vinos-america-logo-01.svg'
import loading from './../../Assets/Images/load.svg'

export const LoadingLayer = () => {
  return (
    <div className="container-loading">
      <div className="section-loading">
        <img src={logo} className="img-logo-full" alt="iconapp" />
        <img src={loading} alt="loading" />
      </div>
    </div>
  )
}
export default LoadingLayer
