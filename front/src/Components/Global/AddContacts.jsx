import React from 'react'

export const AddContacts = ({
  title,
  dataAdd = false,
  onEdit = false,
  onDelete = false,
  editState = false,
  onAdd = false,
}) => {
  return (
    <div className=" container-fluid row p-3">
      <div className="text-center container-fluid ">
        <h2 className="text-center  ">{title}</h2>
        <button
          type="submit"
          className="btn btn-secondary btn-sm float-rigth m-2 "
          data-toggle="tooltip"
          data-placement="top"
          title="Agregar"
          onClick={() => onAdd}
        >
          <i className={`${editState ? 'fas fa-edit' : 'fas fa-plus'}`}></i>
          &nbsp;{editState ? `Actualizar contacto` : `Agregar contacto`}
        </button>
      </div>
      <div className="col-12 container-fluid">
        <div className="col-sx-12 col-md-12 mb-3">
          {dataAdd.length > 0 ? (
            <div id="" className=" text-center w-responsive mx-auto mb-5">
              {Object.values(dataAdd).map((item, index) => (
                <div className="row mt-3 mb-2" key={index}>
                  <div className="align-self-center">
                    {
                      <div className="float-left">
                        {onDelete && (
                          <>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Eliminar"
                              onClick={() => onDelete(index)}
                            >
                              <i className="fas fas fa-trash"></i>
                            </button>
                          </>
                        )}
                      </div>
                    }
                    <div className="float-right">
                      {onEdit && (
                        <>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Editar"
                            onClick={() => onEdit(index)}
                          >
                            <i className="fas fas fa-edit"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h5 className="txt-blue">Nombre</h5>
                    <h6>
                      {item.name} {item.lastname} {item.second_lastname}
                    </h6>
                  </div>
                  <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h5 className="txt-blue">Teléfono</h5>
                    <h6>{item.phone}</h6>
                  </div>
                  <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h5 className="txt-blue">Celular</h5>
                    <h6>{item.mobile}</h6>
                  </div>
                  <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h5 className="txt-blue">Email</h5>
                    <h6>{item.email}</h6>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <h4 className="text-center mt-3">
                Agregue contactos de referencia
              </h4>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
