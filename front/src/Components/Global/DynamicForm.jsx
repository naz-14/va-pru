import React from 'react'
import InputController from './InputController'
import { useFieldArray } from 'react-hook-form'

export const DynamicForm = ({
  btnAppendTxt = 'Agregar',
  emptyText = 'No hay elementos',
  prefix = 'prefix',
  control = 'control',
  inputs = [],
  iconSubmodule,
  idsToDelete,
  setIdsToDelete = false,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: prefix,
  })

  const handleRemove = (item, idx) => {
    if (setIdsToDelete) {
      remove(idx)
      setIdsToDelete([...idsToDelete, item.id])
    } else {
      remove(idx)
    }
  }

  return (
    <>
      <div className="mb-5 col-12">
        <button
          className="btn btn-sm btn-success"
          type="button"
          style={{ float: 'right' }}
          onClick={() => append({})}
        >
          <i className="fas fa-plus"></i>
          &nbsp;{btnAppendTxt}
        </button>
      </div>
      {fields.length > 0 ? (
        fields.map((_index, idx) => (
          <React.Fragment key={_index + idx}>
            <div className="col-12 btn-add-header">
              <span
                style={{
                  cursor: 'pointer',
                  float: 'right',
                }}
                className="btn btn-sm btn-outline-danger fas fa-trash-alt"
                data-toggle="tooltip"
                data-placement="top"
                title="Eliminar"
                onClick={() => handleRemove(_index, idx)}
              ></span>
            </div>
            {inputs.map((input, index) => (
              <div
                className={`mb-4 col-md-12 col-lg-${input.colSize}`}
                key={index}
              >
                {input.specialSubmodule ? (
                  <>
                    <label>Icono</label>
                    <div className="input-group">
                      <div className="input-group-append">
                        <span
                          className="input-group-text"
                          id="inputGroupAppend"
                        >
                          <i
                            className={`fas fa-${
                              iconSubmodule?.[`${prefix}[${idx}].iconSubmodule`]
                            }`}
                          ></i>
                        </span>
                      </div>
                      <InputController
                        name={`${prefix}[${idx}].iconSubmodule`}
                        placeholder="Icono de FontAwesome u otra librería activa"
                        aria-describedby="inputGroupAppend"
                        control={control}
                        changeAction={(e) =>
                          input?.iconState({
                            ...iconSubmodule,
                            [`${prefix}[${idx}].iconSubmodule`]: e.target.value,
                          })
                        }
                        blurAction={input?.blurAction}
                      />
                    </div>
                  </>
                ) : (
                  <InputController
                    label={input.label}
                    type={input.type}
                    name={`${prefix}[${idx}].${input.name}`}
                    placeholder={input.placeholder}
                    control={control}
                    changeAction={input?.changeAction}
                    blurAction={input?.blurAction}
                  />
                )}
              </div>
            ))}
          </React.Fragment>
        ))
      ) : (
        <div className="col-12">
          <h4 className="text-center">{emptyText}</h4>
        </div>
      )}
    </>
  )
}
export default DynamicForm
