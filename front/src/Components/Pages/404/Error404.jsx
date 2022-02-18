import React from 'react'
import { Link } from 'react-router-dom'

export const Error404 = () => {
  return (
    <div className="container-notfound">
      <div className="error-page">
        <h2 className="headline text-warning"> 404</h2>

        <div className="error-content">
          <h1 className="title-notfound">
            <i className="fas fa-exclamation-triangle text-warning"></i>
            &nbsp;&nbsp;Algo ha salido mal!
          </h1>

          <span className="subtitle-notfound">
            La página que estabas buscando no existe o no tienes permiso para
            verla. Intenta
            <Link to="/dashboard"> regresar a la página principal</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Error404
