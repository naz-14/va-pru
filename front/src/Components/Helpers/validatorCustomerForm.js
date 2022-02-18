import * as Yup from 'yup'

const RfcValidator =
  /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z\d]{3}))?$/

const userNameValidator = /^[a-zA-Z0-9]*$/

const contactsValidator = Yup.array().of(
  Yup.object().shape({
    contactName: Yup.string().required('Este campo es obligatorio'),
    paternalSurname: Yup.string().required('Este campo es obligatorio'),
    maternalSurname: Yup.string(),
    phone: Yup.string()
      .min(10, 'El número de teléfono debe ser a 10 digitos')
      .max(10, 'El número de teléfono debe ser a 10 digitos')
      .required('Este campo es obligatorio'),
    cell: Yup.string()
      .min(10, 'El número de teléfono debe ser a 10 digitos')
      .max(10, 'El número de teléfono debe ser a 10 digitos')
      .required('Este campo es obligatorio'),
    email: Yup.string()
      .email('Email inválido')
      .required('Este campo es obligatorio'),
  })
)

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Este campo es obligatorio'),
  RFC: Yup.string()
    .matches(RfcValidator, 'RFC inválido')
    .required('Este campo es obligatorio'),
  socialReason: Yup.string().required('Este campo es obligatorio'),
  direction: Yup.string().required('Este campo es obligatorio'),
  outdoorNumber: Yup.string().required('Este campo es obligatorio'),
  postalCode: Yup.string()
    .min(4, 'El CP debe ser mayor a 4 y menor a 6 dígitos')
    .max(6, 'El CP debe ser mayor a 4 y menor a 6 dígitos')
    .required('Este campo es obligatorio'),
  colonia: Yup.string().required('Este campo es obligatorio'),
  city: Yup.string().required('Este campo es obligatorio'),
  municipality: Yup.string().required('Este campo es obligatorio'),
  state: Yup.string().required('Este campo es obligatorio'),
  contacts: contactsValidator,
})

export const validationSchemaUser = Yup.object().shape({
  name: Yup.string().required('Este campo es obligatorio'),
  firstName: Yup.string().required('Este campo es obligatorio'),
  lastName: Yup.string(),
  userEmail: Yup.string()
    .email('Email inválido')
    .required('Este campo es obligatorio'),
  userName: Yup.string()
    .matches(
      userNameValidator,
      'El nombre de usuario sólo puede contener letras y números, sin espacios'
    )
    .required('Este campo es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('Este campo es obligatorio'),
  passwordConfirm: Yup.string()
    .required('Necesita confirmar la contraseña')
    .oneOf([Yup.ref('password'), null], 'La contraseña no coincide'),
  direction: Yup.string().required('Este campo es obligatorio'),
  outdoorNumber: Yup.string().required('Este campo es obligatorio'),
  postalCode: Yup.string()
    .min(4, 'El CP debe ser mayor a 4 y menor a 6 dígitos')
    .max(6, 'El CP debe ser mayor a 4 y menor a 6 dígitos')
    .required('Este campo es obligatorio'),
  colonia: Yup.string().required('Este campo es obligatorio'),
  city: Yup.string().required('Este campo es obligatorio'),
  municipality: Yup.string().required('Este campo es obligatorio'),
  state: Yup.string().required('Este campo es obligatorio'),
  userRole: Yup.string().required('Este campo es obligatorio'),
  userStore: Yup.string(),
  contacts: contactsValidator,
  // avatar: Yup.string().required('Este campo es obligatorio'),
})

export const validationSchemaUserUpdate = Yup.object().shape({
  name: Yup.string().required('Este campo es obligatorio'),
  firstName: Yup.string().required('Este campo es obligatorio'),
  lastName: Yup.string(),
  userEmail: Yup.string()
    .email('Email inválido')
    .required('Este campo es obligatorio'),
  userName: Yup.string()
    .matches(
      userNameValidator,
      'El nombre de usuario sólo puede contener letras y números, sin espacios'
    )
    .required('Este campo es obligatorio'),
  direction: Yup.string().required('Este campo es obligatorio'),
  outdoorNumber: Yup.string().required('Este campo es obligatorio'),
  postalCode: Yup.string()
    .min(4, 'El CP debe ser mayor a 4 y menor a 6 dígitos')
    .max(6, 'El CP debe ser mayor a 4 y menor a 6 dígitos')
    .required('Este campo es obligatorio'),
  colonia: Yup.string().required('Este campo es obligatorio'),
  city: Yup.string().required('Este campo es obligatorio'),
  municipality: Yup.string().required('Este campo es obligatorio'),
  state: Yup.string().required('Este campo es obligatorio'),
  userRole: Yup.string().required('Este campo es obligatorio'),
  userStore: Yup.string(),
  contacts: contactsValidator,
  // avatar: Yup.string().required('Este campo es obligatorio'),
})

export const passwordValidator = Yup.object().shape({
  currentPassword: Yup.string().required('Este campo es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('Este campo es obligatorio'),
  passwordConfirm: Yup.string()
    .required('Necesita confirmar la contraseña')
    .oneOf([Yup.ref('password'), null], 'La contraseña no coincide'),
})
