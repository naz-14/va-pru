import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { ToastSweetAlert } from '../Helpers/ToastSweetAlert'

export const Box = ({
  title = 'title',
  btnGreenTxt = false,
  btnGreenPath = '/',
  btnRedTxt = false,
  btnRedPath = '/',
  content = '',
  btnSubmit = false,
  btnState = false,
  btnOnClick = false,
  errors = false,
}) => {
  const { id: _id } = useParams()
  useEffect(() => {
    if (Object.values(errors).length > 0) {
      ToastSweetAlert({
        mode: 'error',
        message: 'Hay errores, revisa el formulario',
      })
    }
  }, [errors])
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
        </div>
        <div className="card-body">
          {content}
          <div className="control-btn-box">
            {btnGreenTxt && (
              <Link
                to={btnGreenPath}
                className="btn btn-accept btn-sm mt-2 mb-2"
              >
                <i className="fa fa-plus"></i> {btnGreenTxt}
              </Link>
            )}
            {btnRedTxt && (
              <Link to={btnRedPath} className="btn btn-danger btn-sm mt-2 mb-2">
                <i className="fa fa-times"></i> {btnRedTxt}
              </Link>
            )}
            {btnOnClick && (
              <button
                type="button"
                onClick={btnOnClick}
                className="btn btn-accept btn-sm mt-2 mb-2"
                disabled={btnState ? true : false}
              >
                <i className={`${_id ? 'fa fa-edit' : 'fa fa-save'}`}></i>
                {btnState ? ' Procesando...' : _id ? ' Actualizar' : ' Guardar'}
              </button>
            )}
            {btnSubmit && (
              <button
                type="submit"
                className="btn btn-accept btn-sm mt-2 mb-2"
                disabled={btnState ? true : false}
              >
                <i className={`${_id ? 'fa fa-edit' : 'fa fa-save'}`}></i>
                {btnState ? ' Procesando...' : _id ? ' Actualizar' : ' Guardar'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Box
