import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
  GET_USER_BY_ID,
  GET_USERS,
  REGISTER_USER,
  UPDATE_USER,
} from '../../../../graphql/Catalog/Users/user'

import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastSweetAlert } from '../../../Helpers/ToastSweetAlert'
import ContentHeader from '../../../Layout/ContentHeader'
import Box from '../../../Global/Box'
import InputController from '../../../Global/InputController'

import { useHistory, useParams } from 'react-router-dom'
import {
  CREATE_USER_APP,
  GET_ALL_USERS_APP,
  GET_APP_USER,
  UPDATE_USER_APP,
} from '../../../../graphql/Catalog/UsersApp/usersApp'

import * as Yup from 'yup'

const UsersAppNew = () => {
  const { id: _id } = useParams()

  const [createAppUser] = useMutation(CREATE_USER_APP, {
    refetchQueries: [{ query: GET_ALL_USERS_APP }],
  })

  const [updateAppUser] = useMutation(UPDATE_USER_APP, {
    refetchQueries: [
      { query: GET_ALL_USERS_APP },
      {
        query: GET_APP_USER,
        variables: {
          getAppUserId: parseInt(_id),
        },
      },
    ],
  })
  const {
    data: dataOneUser,
    loading: loadingOneUser,
    error: errorOneUser,
  } = useQuery(GET_APP_USER, {
    variables: {
      getAppUserId: parseInt(_id),
    },
  })

  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const createValidationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido'),
    firstName: Yup.string().required('El apellido es requerido'),
    lastName: Yup.string().required('El apellido es requerido'),
    userName: Yup.string().required('El nombre de usuario es requerido'),
    userEmail: Yup.string()
      .email('El email no es valido')
      .required('El email es requerido'),
    userPhone: Yup.string().required('El telefono es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
      .required('La confirmación de la contraseña es requerida'),
    userType: Yup.string().required('El tipo de usuario es requerido'),
  })

  const updateValidationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido'),
    firstName: Yup.string().required('El apellido es requerido'),
    lastName: Yup.string().required('El apellido es requerido'),
    userName: Yup.string().required('El nombre de usuario es requerido'),
    userEmail: Yup.string()
      .email('El email no es valido')
      .required('El email es requerido'),
    userPhone: Yup.string().required('El telefono es requerido'),
    password: Yup.string(),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Las contraseñas no coinciden'
    ),
    userType: Yup.string().required('El tipo de usuario es requerido'),
  })

  const {
    reset,
    watch,
    methods,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    getValues,
  } = useForm({
    resolver: yupResolver(
      _id ? updateValidationSchema : createValidationSchema
    ),
  })

  useEffect(() => {
    if (_id) {
      if (!loadingOneUser) {
        if (errorOneUser)
          return ToastSweetAlert({
            mode: 'errorModal',
            message: errorOneUser.message,
          })
        if (dataOneUser) {
          setValue('name', dataOneUser.getAppUser.name)
          setValue('firstName', dataOneUser.getAppUser.first_name)
          setValue('lastName', dataOneUser.getAppUser.last_name)
          setValue('userName', dataOneUser.getAppUser.username)
          setValue('userEmail', dataOneUser.getAppUser.email)
          setValue('userPhone', dataOneUser.getAppUser.phone)
          setValue('userType', dataOneUser.getAppUser.id_type)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id, dataOneUser, errorOneUser])

  const handleSave = async (Data) => {
    setLoading(true)
    try {
      if (_id) {
        const { data: updateUserData } = await updateAppUser({
          variables: {
            updateAppUserId: parseInt(_id),
            input: {
              name: Data.name,
              first_name: Data.firstName,
              last_name: Data.lastName,
              username: Data.userName,
              email: Data.userEmail,
              password: Data.password || null,
              phone: Data.userPhone,
              id_type: parseInt(Data.userType),
            },
          },
        })
        if (updateUserData.updateAppUser) {
          return (
            ToastSweetAlert({
              mode: 'ok',
              message: 'Usuario actualizado correctamente',
            }),
            history.push(`/catalog/usersApp`)
          )
        }
      } else {
        const { data: createUserData } = await createAppUser({
          variables: {
            input: {
              name: Data.name,
              first_name: Data.firstName,
              last_name: Data.lastName,
              username: Data.userName,
              email: Data.userEmail,
              password: Data.password,
              phone: Data.userPhone,
              id_type: parseInt(Data.userType),
            },
          },
        })
        if (createUserData.createAppUser) {
          return (
            ToastSweetAlert({
              mode: 'ok',
              message: 'Usuario actualizado correctamente',
            }),
            history.push(`/catalog/usersApp`)
          )
        }
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
        title="Control de usuarios"
        breadcrumb="Usuarios de App"
        windowTitle={`${_id ? 'Editar' : 'Agregar'} usuario `}
      />
      <FormProvider {...methods}>
        <form className="p-5" onSubmit={handleSubmit(handleSave)}>
          <Box
            title={`${_id ? 'Editar' : 'Agregar'} nuevo usuario`}
            btnRedPath="/catalog/appUsers"
            btnRedTxt="Cancelar"
            btnSubmit={true}
            btnState={loading}
            errors={errors}
            content={
              <>
                <div className="mb-3 col-12">
                  <h2>Datos Generales</h2>
                </div>
                <div className="mb-3 col-12">
                  <hr />
                </div>
                <div className="row">
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Nombre"
                      type="text"
                      name="name"
                      placeholder="Ingrese un nombre"
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Apellido paterno"
                      type="text"
                      name="firstName"
                      placeholder="Ingrese un apellido paterno"
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Apellido materno"
                      type="text"
                      name="lastName"
                      placeholder="Ingrese un apellido materno"
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Usuario"
                      type="text"
                      name="userName"
                      placeholder="Ingrese un usuario"
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Correo electrónico"
                      type="text"
                      name="userEmail"
                      placeholder="Ingrese un correo electrónico"
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Telefono"
                      type="text"
                      name="userPhone"
                      placeholder="Ingrese un numero de telefono"
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Contraseña"
                      type="password"
                      name="password"
                      placeholder="Ingrese una contraseña"
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Confirmar contraseña"
                      type="password"
                      name="passwordConfirm"
                      placeholder="Confirme la contraseña"
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Tipo de usuario"
                      inputType="select"
                      name="userType"
                      placeholder="Seleccione un tipo de usuario"
                      control={control}
                      options={[
                        <option value="1">Picking</option>,
                        <option value="2">Packing</option>,
                      ]}
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

export default UsersAppNew
