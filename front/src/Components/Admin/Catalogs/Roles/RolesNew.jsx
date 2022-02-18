import React, { useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Box from '../../../Global/Box'
import ContentHeader from '../../../Layout/ContentHeader'
import { useMutation, useQuery } from '@apollo/client'
import {
  CREATE_ROLE,
  GET_ROLES,
  GET_ROLE_BY_ID,
  UPDATE_ROLE,
} from '../../../../graphql/Catalog/Roles/roles'
import { ToastSweetAlert } from '../../../Helpers/ToastSweetAlert'
import { useHistory, useParams } from 'react-router-dom'
import InputController from '../../../Global/InputController'
import { AuthContext } from '../../../../Auth/AuthContext'

export const RolesNew = () => {
  const { id: _id } = useParams()
  const { user } = useContext(AuthContext)

  const [createRole] = useMutation(CREATE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
  })

  const [updateRole] = useMutation(UPDATE_ROLE, {
    refetchQueries: [
      { query: GET_ROLES },
      { query: GET_ROLE_BY_ID, variables: { getOneRoleId: parseInt(_id) } },
    ],
  })

  const {
    data: dataRoleId,
    loading: loadingRoleId,
    error: errorRoleId,
  } = useQuery(GET_ROLE_BY_ID, {
    variables: {
      getOneRoleId: parseInt(_id),
    },
  })

  const [loadingBtn, setLoadingBtn] = useState(false)
  const history = useHistory()

  const validationSchema = Yup.object().shape({
    role_name: Yup.string().required('El nombre del rol es requerido'),
    description: Yup.string(),
  })

  const {
    methods,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  useEffect(() => {
    if (!loadingRoleId) {
      if (_id) {
        if (errorRoleId) {
          setLoadingBtn(false)
          return ToastSweetAlert({
            mode: 'errorModal',
            message: errorRoleId.message,
          })
        }

        reset(dataRoleId?.getOneRole)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id, dataRoleId, errorRoleId])

  const onSubmit = async (Data) => {
    setLoadingBtn(true)
    try {
      if (_id) {
        await updateRole({
          variables: {
            roleId: parseInt(_id),
            input: {
              role_name: Data.role_name,
              description: Data.description,
              id_user_update: user.idUser,
            },
          },
        })
        return (
          ToastSweetAlert({
            mode: 'ok',
            message: 'Rol actualizado correctamente',
          }),
          history.push(`/catalog/roles`)
        )
      } else {
        await createRole({
          variables: {
            input: {
              role_name: Data.role_name,
              description: Data.description,
              id_user_register: user.idUser,
            },
          },
        })
        return ToastSweetAlert(
          {
            mode: 'ok',
            message: 'Rol registrado correctamente',
          },
          history.push(`/catalog/roles`)
        )
      }
    } catch (error) {
      setLoadingBtn(false)
      return ToastSweetAlert({
        mode: 'error',
        message: error.message,
      })
    }
  }
  return (
    <>
      <ContentHeader
        title="Roles de usuario"
        breadcrumb="Roles"
        windowTitle={`${_id ? 'Editar' : 'Agregar'} role `}
      />
      <FormProvider {...methods}>
        <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
          <Box
            title={`${_id ? 'Editar' : 'Agregar'} nuevo rol`}
            btnRedPath="/catalog/roles"
            btnRedTxt="Cancelar"
            errors={errors}
            btnSubmit={true}
            btnLoading={loadingBtn}
            content={
              <>
                <div className="row">
                  <div className="mb-3 col-lg-12 col-md-12 col-sm-12">
                    <InputController
                      label="Nombre del rol"
                      name="role_name"
                      type="text"
                      placeholder="Nombre del rol"
                      control={control}
                    />
                  </div>

                  <div className="mb-3 col-lg-12 col-md-12 col-sm-12">
                    <InputController
                      label="Descripción"
                      name="description"
                      inputType="textarea"
                      rows={3}
                      placeholder="Descripción"
                      control={control}
                    />
                  </div>
                </div>
              </>
            }
          />
        </form>
      </FormProvider>
    </>
  )
}
export default RolesNew
