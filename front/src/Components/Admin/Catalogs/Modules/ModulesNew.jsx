import React, { useEffect, useState } from 'react'
import ContentHeader from '../../../Layout/ContentHeader'
import Box from '../../../Global/Box'
import { useMutation, useQuery } from '@apollo/client'
import { ToastSweetAlert } from '../../../Helpers/ToastSweetAlert'
import { useHistory, useParams } from 'react-router'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputController from '../../../Global/InputController'
import DynamicForm from '../../../Global/DynamicForm'
import {
  GET_ONE_MODULE,
  CREATE_MODULE,
  UPDATE_MODULE,
  ALL_MODULES,
} from '../../../../graphql/Catalog/Modules/modules'
import * as Yup from 'yup'

export const ModulesNew = () => {
  const { id: _id } = useParams()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [icon, setIcon] = useState('')
  const [idsToDelete, setIdsToDelete] = useState([])
  const [iconSubmodule, setIconSubmodule] = useState('')

  const { data: dataModule } = useQuery(GET_ONE_MODULE, {
    variables: {
      getOneModuleId: parseInt(_id),
    },
  })

  const [createModule] = useMutation(CREATE_MODULE, {
    refetchQueries: [{ query: ALL_MODULES }],
  })

  const [updateModule] = useMutation(UPDATE_MODULE, {
    refetchQueries: [
      { query: ALL_MODULES },
      {
        query: GET_ONE_MODULE,
        variables: { getOneModuleId: parseInt(_id) },
      },
    ],
  })

  const validationSchema = Yup.object().shape({
    frontLabel: Yup.string().required('Este campo es obligatorio'),
    moduleName: Yup.string().required('Este campo es obligatorio'),
    relativeLink: Yup.string().required('Este campo es obligatorio'),
    icon: Yup.string().required('Este campo es obligatorio'),
    submodules: Yup.array().of(
      Yup.object().shape({
        submoduleName: Yup.string().required('Este campo es obligatorio'),
        frontLabelSubmodule: Yup.string().required('Este campo es obligatorio'),
        relativeLinkSubmodule: Yup.string().required(
          'Este campo es obligatorio'
        ),
        iconSubmodule: Yup.string().required('Este campo es obligatorio'),
      })
    ),
  })

  const defaultValues = {
    submodules: [
      {
        id: '',
        frontLabelSubmodule: '',
        submoduleName: '',
        relativeLinkSubmodule: '',
        iconSubmodule: '',
      },
    ],
  }

  const {
    methods,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) })

  useEffect(() => {
    if (_id) {
      if (dataModule !== undefined && dataModule !== null) {
        const data = dataModule.getOneModule
        setIcon(`fas fa-${data.icon}`)
        const submodules = data.submodules.map((submodule, idx) => {
          setIconSubmodule({
            ...iconSubmodule,
            [`submodules[${idx}].iconSubmodule`]: `fas fa-${submodule.icon}`,
          })
          return {
            id: submodule.id,
            submoduleName: submodule.name,
            relativeLinkSubmodule: submodule.relative_link,
            frontLabelSubmodule: submodule.front_label,
            iconSubmodule: submodule.icon,
          }
        })
        const dataFormated = {
          moduleName: data.name,
          frontLabel: data.front_label,
          relativeLink: data.relative_link,
          icon: data.icon,
          submodules: submodules,
        }
        reset(dataFormated)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataModule, reset, _id])

  const onSubmit = async (data) => {
    // setLoading(true)
    const submodules = data.submodules.map((submodule) => {
      return {
        id: typeof submodule.id === 'number' ? parseInt(submodule.id) : 0,
        name: submodule.submoduleName,
        relative_link: submodule.relativeLinkSubmodule,
        front_label: submodule.frontLabelSubmodule,
        icon: submodule.iconSubmodule,
      }
    })

    try {
      if (_id) {
        await updateModule({
          variables: {
            moduleId: parseInt(_id),
            moduleInput: {
              name: data.moduleName,
              relative_link: data.relativeLink,
              front_label: data.frontLabel,
              icon: data.icon,
            },
            submodulesIdsTodelete: idsToDelete,
            submoduleInput: submodules,
          },
        })
        return ToastSweetAlert(
          {
            mode: 'ok',
            message: 'Módulo actualizado correctamente',
          },
          history.push(`/modules`)
        )
      } else {
        await createModule({
          variables: {
            moduleInput: {
              name: data.moduleName,
              relative_link: data.relativeLink,
              front_label: data.frontLabel,
              icon: data.icon,
            },
            submoduleInput: submodules,
          },
        })
        return ToastSweetAlert(
          {
            mode: 'ok',
            message: 'Módulo registrado correctamente',
          },
          history.push(`/modules`)
        )
      }
    } catch (error) {
      setLoading(false)
      return ToastSweetAlert({
        mode: 'error',
        message: error.message,
      })
    }
  }

  return (
    <>
      <ContentHeader
        title="Control de módulos"
        breadcrumb="Módulos"
        windowTitle={`${_id ? 'Editar' : 'Agregar'} módulo `}
      />
      <FormProvider {...methods}>
        <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
          <Box
            title={`${_id ? 'Editar' : 'Agregar'} módulo`}
            btnRedPath="/modules"
            btnRedTxt="Cancelar"
            btnSubmit={true}
            btnState={loading}
            errors={errors}
            content={
              <>
                <div className="row">
                  <div className="mb-3 col-12">
                    <h2>Módulo principal</h2>
                  </div>
                  <div className="mb-3 col-12">
                    <hr />
                  </div>
                  <div className="mb-3 col-md-12 col-lg-3">
                    <InputController
                      label="Etiqueta frontal"
                      type="text"
                      name="frontLabel"
                      placeholder="Ingrese el nombre del módulo en el menu"
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-md-12 col-lg-3">
                    <InputController
                      label="Nombre módulo"
                      type="text"
                      name="moduleName"
                      placeholder="Ingrese el nombre del módulo"
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-md-12 col-lg-3">
                    <InputController
                      label="Link/Enlace"
                      type="text"
                      name="relativeLink"
                      placeholder="Ingrese el link para el módulo"
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-md-12 col-lg-3">
                    <label>Icono</label>
                    <div className="input-group">
                      <div className="input-group-append">
                        <span
                          className="input-group-text"
                          id="inputGroupAppend"
                        >
                          <i className={icon}></i>
                        </span>
                      </div>
                      <InputController
                        type="text"
                        name="icon"
                        placeholder="Icono de FontAwesome u otra librería activa"
                        aria-describedby="inputGroupAppend"
                        control={control}
                        changeAction={(e) =>
                          setIcon(`fas fa-${e.target.value}`)
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 mt-3 col-12">
                    <h2>Submódulos</h2>
                  </div>
                  <div className="mb-3 col-12">
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <DynamicForm
                    control={control}
                    btnAppendTxt={'Agregar submódulo'}
                    emptyText="No hay submódulos"
                    iconSubmodule={iconSubmodule} //PARA MI MÓDULO CUSTOM, NO ES NECESARIO
                    prefix="submodules"
                    idsToDelete={idsToDelete}
                    setIdsToDelete={setIdsToDelete}
                    inputs={[
                      {
                        name: 'id',
                        type: 'hidden',
                      },
                      {
                        name: 'frontLabelSubmodule',
                        label: 'Etiqueta frontal',
                        type: 'text',
                        placeholder: 'Ingrese el nombre del módulo en el menu',
                        colSize: 3,
                      },
                      {
                        name: 'submoduleName',
                        label: 'Nombre submódulo',
                        type: 'text',
                        placeholder: 'Ingrese el nombre del submódulo',
                        colSize: 3,
                      },
                      {
                        name: 'relativeLinkSubmodule',
                        label: 'Link/Enlace',
                        type: 'text',
                        placeholder: 'Ingrese el link para el submódulo',
                        colSize: 3,
                      },
                      {
                        name: 'iconSubmodule',
                        label: 'Icono submódulo',
                        type: 'text',
                        placeholder:
                          'Icono de FontAwesome u otra librería activa',
                        iconState: setIconSubmodule, //PARA MI MÓDULO CUSTOM
                        specialSubmodule: true, //PARA MI MÓDULO CUSTOM
                        colSize: 3,
                      },
                    ]}
                  />
                </div>
              </>
            }
          />
        </form>
      </FormProvider>
    </>
  )
}

export default ModulesNew
