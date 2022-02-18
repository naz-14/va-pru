import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../Auth/AuthContext'
import { ToastSweetAlert } from '../Helpers/ToastSweetAlert'
import { types } from '../../Types/types'
import Swal from 'sweetalert2'

export const Header = () => {
  const { dispatch } = useContext(AuthContext)

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estas seguro de querer finalizar la sesión?',
      icon: 'question',
      allowOutsideClick: false,
      buttonsStyling: false,
      showDenyButton: true,
      denyButtonText: '<i class="fas fa-times"> Cancelar</i>',
      confirmButtonText: '<i class="fas fa-minus-circle"> Salir</i>',
      customClass: {
        confirmButton: 'btn btn-sm btn-accept',
        denyButton: 'btn btn-sm btn-danger',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          sessionStorage.removeItem('user')
          sessionStorage.removeItem('requestPath')
          localStorage.removeItem('token')
          localStorage.removeItem('configSys')
          localStorage.removeItem('platform')
          ToastSweetAlert({
            mode: 'ok',
            message: 'Sesión finalizada',
          })
          setTimeout(() => {
            dispatch({
              type: types.logout,
            })
          }, 400)
        } catch (error) {
          ToastSweetAlert({
            mode: 'errorModal',
            message: error.message,
          })
        }
      }
    })
  }

  const resizeHanlder = () => {
    const width = window.innerWidth
    if (width <= 991) {
      document.getElementById('sidebarMain').className =
        'sidebar-mini layout-fixed sidebar-closed sidebar-collapse'
    }
  }

  useEffect(() => {
    window.onresize = resizeHanlder
  }, [])

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* <!-- Left navbar links --> */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link menuBurguer"
            data-widget="pushmenu"
            href="/#"
            role="button"
          >
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      {/* <!-- Right navbar links --> */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item" onClick={() => handleLogout()}>
          <a
            className="nav-link"
            data-widget="control-sidebar"
            data-slide="true"
            href="/#"
            role="button"
          >
            <i className="fas fa-power-off"></i>
          </a>
        </li>
      </ul>
    </nav>
  )
}
export default Header
