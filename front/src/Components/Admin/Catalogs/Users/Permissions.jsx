import React, { useState, useEffect } from 'react'
import ContentHeader from '../../../Layout/ContentHeader'
import Box from '../../../Global/Box'
import BoxCollapsible from '../../../Global/BoxCollapsible'
import {
  ALL_MODULES,
  All_USER_PERMISSIONS,
  UPDATE_PERMISSIONS,
} from '../../../../graphql/Catalog/Modules/modules'
import { ToastSweetAlert } from '../../../Helpers/ToastSweetAlert'
import { useQuery, useMutation } from '@apollo/client'
import { useHistory, useParams } from 'react-router'
import { useForm, Controller } from 'react-hook-form'

const Permissions = () => {
  const {
    loading: loadingModules,
    error: errorModules,
    data: dataModules,
  } = useQuery(ALL_MODULES, {
    variables: {
      limit: null,
      offset: null,
    },
  })

  const [userPermissions] = useMutation(All_USER_PERMISSIONS)
  const [updatePermissions] = useMutation(UPDATE_PERMISSIONS)

  const [modules, setModules] = useState([])
  const [permissions, setPermissions] = useState([])
  const { id: _id } = useParams()
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  //LOAD MODULES AND SUBMODULES
  useEffect(() => {
    if (!loadingModules) {
      if (dataModules !== undefined || dataModules == null) {
        if (errorModules)
          return ToastSweetAlert({
            mode: 'error',
            message: errorModules.message,
          })
        setModules(dataModules.getAllModules.rows)
      }
    }
  }, [loadingModules, errorModules, dataModules, permissions])

  //SET USER PERMISSIONS IF ID IN ROUTE
  useEffect(() => {
    if (_id) {
      async function fetchPermissions() {
        try {
          const { data: userPermissionsData } = await userPermissions({
            variables: {
              userID: parseInt(_id),
            },
          })
          setPermissions(userPermissionsData.getAllUserPermissions)
        } catch (error) {
          ToastSweetAlert({
            mode: 'errorModal',
            message: error.message,
          })
        }
      }
      fetchPermissions()
    }
  }, [_id, userPermissions, modules])

  const { handleSubmit, control, setValue } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    const dataGenerated = await prepareData(data)

    try {
      await updatePermissions({
        variables: {
          userId: parseInt(_id),
          modules: dataGenerated,
        },
      })
      return (
        ToastSweetAlert({
          mode: 'ok',
          message: 'Permisos actualizados correctamente',
        }),
        history.push(`/catalog/users`)
      )
    } catch (error) {
      setLoading(false)
      return ToastSweetAlert({
        mode: 'error',
        message: error.message,
      })
    }
  }

  const prepareData = async (data) => {
    let list = []
    const ids = Object.entries(data)
    list = Object.values(data).map((item, idx) => {
      const idsSplited = ids[idx][0].split('-')
      const idModule = parseInt(idsSplited[0])
      const idSubModule = idsSplited[1] ? parseInt(idsSplited[1]) : null
      return {
        id_user: parseInt(_id),
        id_module: idModule,
        id_submodule: idSubModule,
        access_delete: item.delete ? true : false,
        access_edit: item.edit ? true : false,
        access_read: item.read ? true : false,
        access_retrieve: item.create ? true : false,
        access_export: item.export ? true : false,
      }
    })
    return list
  }

  const setData = (nameModule, typePermission) => {
    for (let i = 0; i < permissions.length; i++) {
      if (permissions[i]?.id_submodule !== null) {
        if (nameModule === permissions[i]?.submodule_info?.name) {
          return permissions[i][typePermission]
        }
      } else {
        if (nameModule === permissions[i]?.module_info?.name) {
          return permissions[i][typePermission]
        }
      }
    }
  }

  const Checkbox = (props) => (
    <Controller
      {...props}
      render={({ field }) => {
        return (
          <div className="custom-control custom-switch ml-auto mb-0">
            <input
              {...field}
              type="checkbox"
              value={props.value}
              checked={field.value}
              className="custom-control-input ml-2 mr-n2"
              id={`${props.labelInput}`}
              onChange={(event) => {
                let moduleName = event.target.name
                moduleName = moduleName.split('[')
                let newName = moduleName[0] + '[read]'
                if (
                  props.labelInput.includes('delete') ||
                  props.labelInput.includes('edit') ||
                  props.labelInput.includes('create') ||
                  props.labelInput.includes('export')
                ) {
                  setValue(newName, true)
                } else if (
                  document.getElementsByName(newName)[0].checked === false
                ) {
                  let moduleName = event.target.name
                  moduleName = moduleName.split('[')
                  let dName = moduleName[0] + '[delete]'
                  setValue(dName, false)
                  let eName = moduleName[0] + '[edit]'
                  setValue(eName, false)
                  let cName = moduleName[0] + '[create]'
                  setValue(cName, false)
                  let exportName = moduleName[0] + '[export]'
                  setValue(exportName, false)
                }
                field.onChange(event.target.checked ? true : false)
              }}
            />
            <label
              htmlFor={`${props.labelInput}`}
              className="custom-control-label mr-2 ml-2"
            >
              {props.label}
            </label>
          </div>
        )
      }}
    />
  )

  return (
    <>
      <ContentHeader
        title="Asignación de permisos"
        breadcrumb="Permisos"
        windowTitle="Permisos usuario"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          key="boxkey"
          title="Seleccione los permisos para el usuario"
          btnRedTxt="Cancelar"
          btnRedPath="/catalog/users"
          btnSubmit={true}
          btnState={loading}
          content={modules.map((itemModule) => {
            if (itemModule.submodules.length <= 0) {
              return (
                <BoxCollapsible
                  key={itemModule.id}
                  title={itemModule.front_label}
                  icon="fas fa-box"
                  content={
                    <div className="card-wrapper">
                      <Checkbox
                        labelInput={`read${itemModule.name}`}
                        label="Lectura"
                        control={control}
                        name={`${itemModule.id}-null-${itemModule.name}[read]`}
                        defaultValue={setData(itemModule.name, 'access_read')}
                      />
                      <Checkbox
                        labelInput={`create${itemModule.name}`}
                        label="Crear"
                        control={control}
                        name={`${itemModule.id}-null-${itemModule.name}[create]`}
                        defaultValue={setData(
                          itemModule.name,
                          'access_retrieve'
                        )}
                      />
                      <Checkbox
                        labelInput={`edit${itemModule.name}`}
                        label="Editar"
                        control={control}
                        name={`${itemModule.id}-null-${itemModule.name}[edit]`}
                        defaultValue={setData(itemModule.name, 'access_edit')}
                      />
                      <Checkbox
                        labelInput={`delete${itemModule.name}`}
                        label="Eliminar"
                        control={control}
                        name={`${itemModule.id}-null-${itemModule.name}[delete]`}
                        defaultValue={setData(itemModule.name, 'access_delete')}
                      />
                      <Checkbox
                        labelInput={`export${itemModule.name}`}
                        label="Exportar"
                        control={control}
                        name={`${itemModule.id}-null-${itemModule.name}[export]`}
                        defaultValue={setData(itemModule.name, 'access_export')}
                      />
                    </div>
                  }
                />
              )
            } else {
              return (
                <BoxCollapsible
                  key={itemModule.id}
                  title={itemModule.front_label}
                  icon="fas fa-box"
                  nestedContent={true}
                  content={itemModule.submodules.map((itemSubmodule) => {
                    return (
                      <div key={itemSubmodule.id} className="card">
                        <div className="card-header border-0 permissions-cardH">
                          <h3 className="card-title">
                            {itemSubmodule.front_label}
                          </h3>
                          <div className="card-tools">
                            <div className="card-wrapper">
                              <Checkbox
                                labelInput={`read${itemSubmodule.name}`}
                                label="Lectura"
                                control={control}
                                name={`${itemModule.id}-${itemSubmodule.id}-${itemSubmodule.name}[read]`}
                                defaultValue={setData(
                                  itemSubmodule.name,
                                  'access_read'
                                )}
                              />
                              <Checkbox
                                labelInput={`create${itemSubmodule.name}`}
                                label="Crear"
                                control={control}
                                name={`${itemModule.id}-${itemSubmodule.id}-${itemSubmodule.name}[create]`}
                                defaultValue={setData(
                                  itemSubmodule.name,
                                  'access_retrieve'
                                )}
                              />
                              <Checkbox
                                labelInput={`edit${itemSubmodule.name}`}
                                label="Editar"
                                control={control}
                                name={`${itemModule.id}-${itemSubmodule.id}-${itemSubmodule.name}[edit]`}
                                defaultValue={setData(
                                  itemSubmodule.name,
                                  'access_edit'
                                )}
                              />
                              <Checkbox
                                labelInput={`delete${itemSubmodule.name}`}
                                label="Eliminar"
                                control={control}
                                name={`${itemModule.id}-${itemSubmodule.id}-${itemSubmodule.name}[delete]`}
                                defaultValue={setData(
                                  itemSubmodule.name,
                                  'access_delete'
                                )}
                              />
                              <Checkbox
                                labelInput={`export${itemSubmodule.name}`}
                                label="Exportar"
                                control={control}
                                name={`${itemModule.id}-${itemSubmodule.id}-${itemSubmodule.name}[export]`}
                                defaultValue={setData(
                                  itemSubmodule.name,
                                  'access_export'
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                />
              )
            }
          })}
        />
      </form>
    </>
  )
}

export default Permissions
