import React, { useContext, useEffect, useState } from 'react'
import ContentHeader from '../../../../Components/Layout/ContentHeader'
import Box from '../../../Global/Box'
import { useMutation, useQuery } from '@apollo/client'
import {
  REGISTER_USER,
  GET_USERS,
  UPDATE_USER,
  GET_USER_BY_ID,
} from '../../../../graphql/Catalog/Users/user'
import { ToastSweetAlert } from '../../../Helpers/ToastSweetAlert'
import { useHistory, useParams } from 'react-router'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SEPOMEX_MUTATION } from '../../../../graphql/Global/sepomex'
import {
  setUserValues,
  setZipNullValues,
  setZipValues,
} from '../../../Helpers/setInputValues'
import { GET_ROLES } from '../../../../graphql/Catalog/Roles/roles'
import { GET_STORES } from '../../../../graphql/Catalog/Stores/stores'
import {
  validationSchemaUser,
  validationSchemaUserUpdate,
} from '../../../Helpers/validatorCustomerForm'
import InputController from '../../../Global/InputController'
import { AuthContext } from '../../../../Auth/AuthContext'
import DynamicForm from '../../../Global/DynamicForm'

const Register = () => {
  const { id: _id } = useParams()
  const { user: _user } = useContext(AuthContext)
  const [schemaValidator, setSchemaValidator] = useState(validationSchemaUser)
  const [_password, set_Password] = useState('1')
  const [previewPic, setPreviewPic] = useState(null)

  const [registerUser] = useMutation(REGISTER_USER, {
    refetchQueries: [{ query: GET_USERS }],
  })

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [
      { query: GET_USERS },
      {
        query: GET_USER_BY_ID,
        variables: {
          getUserByIdId: parseInt(_id),
        },
      },
    ],
  })
  const [sepomexAdress] = useMutation(SEPOMEX_MUTATION)
  const {
    data: dataOneUser,
    loading: loadingOneUser,
    error: errorOneUser,
  } = useQuery(GET_USER_BY_ID, {
    variables: {
      getUserByIdId: parseInt(_id),
    },
  })

  const {
    data: dataRoles,
    loading: loadingRoles,
    error: errorRoles,
  } = useQuery(GET_ROLES, { fetchPolicy: 'no-cache' })

  const {
    data: dataStores,
    loading: loadingStores,
    error: errorStores,
  } = useQuery(GET_STORES, { fetchPolicy: 'no-cache' })

  const [addressId, setAddressId] = useState('')
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [stores, setStores] = useState([])
  const [colonies, setColonies] = useState([])
  const history = useHistory()

  const initialStateZip = {
    colonia: [],
    city: '',
    municipality: '',
    state: '',
    idCountry: '',
    idState: '',
    idCity: '',
    idMuicipality: '',
  }

  const [zip, setZip] = useState(initialStateZip)

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
    resolver: yupResolver(schemaValidator),
  })

  const getAdress = async (zipCode) => {
    try {
      const { data } = await sepomexAdress({
        variables: {
          zipCode: parseInt(zipCode),
        },
      })
      setZipValues(setValue, setColonies, data.getFullAddressByZipcode, setZip)
    } catch (error) {
      setZipNullValues(setValue)
      ToastSweetAlert({
        mode: 'errorModal',
        message: 'Por favor ingrese un código postal válido',
      })

      setZip(initialStateZip)
    }
  }

  useEffect(() => {
    if (!loadingRoles) {
      const list = dataRoles?.getAllRoles.rows.map((role) => {
        return { label: role.role_name, value: role.id }
      })
      setRoles(list)
    }
  }, [loadingRoles, dataRoles, errorRoles])

  useEffect(() => {
    if (!loadingStores) {
      const list = dataStores?.getAllStores.rows.map((store) => {
        return { label: store.name, value: store.id }
      })
      setStores(list)
    }
  }, [loadingStores, dataStores, errorStores])

  const watchPassword = watch('password')

  useEffect(() => {
    if (watchPassword === undefined || watchPassword === '') {
      setSchemaValidator(validationSchemaUserUpdate)
      set_Password('1')
    } else {
      setSchemaValidator(validationSchemaUser)
      set_Password(getValues('password'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchPassword])

  useEffect(() => {
    if (_id) {
      setSchemaValidator(validationSchemaUserUpdate)
      if (!loadingOneUser) {
        if (errorOneUser)
          return ToastSweetAlert({
            mode: 'errorModal',
            message: errorOneUser.message,
          })
        setPreviewPic(dataOneUser?.GetUserById?.avatar?.url)
        setUserValues(reset, dataOneUser.GetUserById, setAddressId, getAdress)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id, dataOneUser, errorOneUser])

  const handleSave = async (Data) => {
    if (Data.contacts.length < 1) {
      return ToastSweetAlert({
        mode: 'error',
        message: 'Debe agregar al menos 1 contacto',
      })
    }
    setLoading(true)
    const contacts = Data.contacts.map((contact) => {
      return {
        name: contact.contactName,
        lastname: contact.paternalSurname,
        second_lastname: contact.maternalSurname,
        phone: contact.phone,
        ext: contact.ext,
        mobile: contact.cell,
        email: contact.email,
        id_user_register: parseInt(_user.idUser),
      }
    })
    try {
      if (_id) {
        await updateUser({
          variables: {
            userId: parseInt(_id),
            addressId: parseInt(addressId),
            inputAvatar: Data?.avatar?.name ? getValues('avatar') : null,
            input: {
              name: Data.name,
              first_name: Data.firstName,
              last_name: Data.lastName,
              user_name: Data.userName,
              email: Data.userEmail,
              password: _password,
              id_role: parseInt(Data.userRole),
              id_store: parseInt(Data.userStore),
              id_user_update: parseInt(_user.idUser),
              active: true,
            },
            inputAddress: {
              street: Data.direction,
              external_number: Data.outdoorNumber,
              internal_number: Data.interiorNumber,
              id_country: parseInt(zip.idCountry),
              id_state: parseInt(zip.idState),
              id_city: parseInt(zip.idCity),
              id_municipality: parseInt(zip.idMunicipality),
              id_colony: parseInt(Data.colonia),
              zip_code: parseInt(Data.postalCode),
              id_user_update: parseInt(_user.idUser),
            },
            inputContact: contacts,
          },
        })
        return (
          ToastSweetAlert({
            mode: 'ok',
            message: 'Usuario actualizado correctamente',
          }),
          history.push(`/catalog/users`)
        )
      } else {
        const user = await registerUser({
          variables: {
            inputAvatar: getValues('avatar'),
            input: {
              name: Data.name,
              first_name: Data.firstName,
              last_name: Data.lastName,
              user_name: Data.userName,
              email: Data.userEmail,
              password: Data.password,
              id_role: parseInt(Data.userRole),
              id_store: parseInt(Data.userStore),
              id_user_register: parseInt(_user.idUser),
              active: true,
            },
            inputAddress: {
              street: Data.direction,
              external_number: Data.outdoorNumber,
              internal_number: Data.interiorNumber,
              id_country: parseInt(zip.idCountry),
              id_state: parseInt(zip.idState),
              id_city: parseInt(zip.idCity),
              id_municipality: parseInt(zip.idMunicipality),
              id_colony: parseInt(Data.colonia),
              zip_code: parseInt(Data.postalCode),
              id_user_register: parseInt(_user.idUser),
            },
            inputContact: contacts,
          },
        })
        return ToastSweetAlert(
          {
            mode: 'ok',
            message: 'Usuario registrado correctamente',
          },
          history.push(
            user.data.registerUser.id_role === 1
              ? `/catalog/users`
              : `/catalog/users/permissions/edit/${user.data.registerUser.id}`
          )
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

  useEffect(() => {
    if (zip.colonia?.length > 0) {
      if (dataOneUser !== undefined && dataOneUser !== null) {
        setValue('colonia', dataOneUser.GetUserById.address.id_colony)
      } else {
        setValue('colonia', zip.colonia[0].id_colony)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zip, dataOneUser])

  return (
    <>
      <ContentHeader
        title="Control de usuarios"
        breadcrumb="Usuarios"
        windowTitle={`${_id ? 'Editar' : 'Agregar'} usuario `}
      />
      <FormProvider {...methods}>
        <form className="p-5" onSubmit={handleSubmit(handleSave)}>
          <Box
            title={`${_id ? 'Editar' : 'Agregar'} nuevo usuario`}
            btnRedPath="/catalog/users"
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
                  <div className="mb-3 col-lg-12 col-md-12 col-sm-12">
                    <InputController
                      label="Avatar"
                      inputType="image"
                      name="avatar"
                      previewPic={previewPic}
                      validateFormat="imageAvatar"
                      validateFormatMsg="Solo se admite JPG, JPGE y PNG"
                      // formatAccept=".jpg .png .jpge"
                      control={control}
                    />
                  </div>
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
                      label="Rol"
                      type="text"
                      name="userRole"
                      inputType="choosen"
                      options={roles}
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Tienda"
                      type="text"
                      name="userStore"
                      inputType="choosen"
                      options={stores}
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

                  <div className="mb-3 col-4"></div>
                  <div className="mb-3 mt-3 col-12">
                    <h2>Direccion</h2>
                  </div>
                  <div className="mb-3 col-12">
                    <hr />
                  </div>

                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Calle"
                      type="text"
                      name="direction"
                      placeholder="Ingrese una calle"
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Numero exterior"
                      type="text"
                      name="outdoorNumber"
                      placeholder="# ext."
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Numero interior"
                      type="text"
                      name="interiorNumber"
                      placeholder="# int."
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="C. P."
                      type="text"
                      name="postalCode"
                      placeholder="Ingrese un C. P."
                      control={control}
                      blurAction={(e) => {
                        getAdress(e.target.value)
                      }}
                    />
                  </div>

                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Colonia"
                      type="text"
                      name="colonia"
                      inputType="choosen"
                      options={colonies}
                      control={control}
                    />
                  </div>

                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Ciudad"
                      readOnly
                      type="text"
                      name="city"
                      placeholder="Ciudad"
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Municipio"
                      readOnly
                      type="text"
                      name="municipality"
                      placeholder="Municipio"
                      control={control}
                    />
                  </div>
                  <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                    <InputController
                      label="Estado"
                      readOnly
                      type="text"
                      name="state"
                      placeholder="Estado"
                      control={control}
                    />
                  </div>

                  <div className="mb-3 col-4"></div>
                  <div className="mb-3 mt-3 col-12">
                    <h2>Contactos</h2>
                  </div>
                  <div className="mb-3 col-12">
                    <hr />
                  </div>
                </div>

                <div className="mb-3 col-12 row">
                  <DynamicForm
                    control={control}
                    btnAppendTxt={'Agregar Contacto'}
                    emptyText="No ha agregado ningún contacto"
                    prefix="contacts"
                    inputs={[
                      {
                        name: 'contactName',
                        label: 'Nombre',
                        type: 'text',
                        placeholder: 'Ingresa un nombre',
                        colSize: 4,
                      },
                      {
                        name: 'paternalSurname',
                        label: 'Apellido paterno',
                        type: 'text',
                        placeholder: 'Ingresa un apellido',
                        colSize: 4,
                      },
                      {
                        name: 'maternalSurname',
                        label: 'Apellido materno',
                        type: 'text',
                        placeholder: 'Ingresa un apellido',
                        colSize: 4,
                      },
                      {
                        name: 'phone',
                        label: 'Teléfono',
                        type: 'text',
                        placeholder: 'Ingresa un número de teléfono',
                        colSize: 3,
                      },
                      {
                        name: 'ext',
                        label: 'Extensión',
                        type: 'text',
                        placeholder: 'Ext',
                        colSize: 1,
                      },
                      {
                        name: 'cell',
                        label: 'Celular',
                        type: 'text',
                        placeholder: 'Ingresa un número de celular',
                        colSize: 4,
                      },
                      {
                        name: 'email',
                        label: 'Correo',
                        type: 'text',
                        placeholder: 'Ingresa un correo electrónico',
                        colSize: 4,
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

export default Register
