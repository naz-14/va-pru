import * as Yup from 'yup'
import moment from 'moment'

const dateNow = Date();
const dateLimit = new Date();
export const validationSchemaQuote = Yup.object().shape({
    cardCode: Yup.string().required('Este campo es obligatorio'),
    cardName: Yup.string().required('Este campo es obligatorio'),
    docDate: Yup.date().required('Este campo es obligatorio')
        .typeError('Este campo es obligatorio')
        .min(moment(dateNow).format(),'Debe hacer una cita apartir de la fecha actual')
        .max(moment(dateLimit.setDate(dateLimit.getDate() + 60)).format(),'La cita no debe ser mayor a 60 días'),
    docTime: Yup.string().required('Este campo es obligatorio'),
    docStatus: Yup.string().required('Este campo es obligatorio'),
    comments: Yup.string()    
        .max(200, 'El comentario debe ser mayor a 4 y menor a 200 dígitos'),
    whsCode: Yup.string().required('Este campo es obligatorio'),
});

export const validationSchemaQuoteOnlyCodes = Yup.object().shape({
    cardCode: Yup.string(),
    cardName: Yup.string(),
});