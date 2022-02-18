import Swal from 'sweetalert2'
import { ToastSweetAlert } from './ToastSweetAlert'

export const RejectOrder = async (
  dataIssuses,
  idUser,
  createReason,
  idOrder,
  history
) => {
  
    let clientsReason = null;

    const { value: reason } = await Swal.fire({
        title: 'Seleccione la razon',
        input: 'radio',
        inputOptions: dataIssuses,
        inputValidator: (value) => {
            if (!value) {
            return 'Debe elegir una razon'
            }
        }
    })
  
      
    if (reason) {
        let flag = false;
        let error = true;
        /* User selected others... */
        if(dataIssuses[reason].toUpperCase() === "OTRO" ){
            flag = true;
            const { value: reasonText } = await Swal.fire({
            title: 'Escribe el motivo',
            input: 'text',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) return 'Debe escribir el motivo de la cancelacion'
            }
            })
            
            if (reasonText){
                clientsReason = reasonText;
                error = false;
            } 
            
        }

    if (flag && error)
      return ToastSweetAlert({
        mode: 'error',
        message: 'Debe escribir el motivo de la cancelacion',
      })

    /* INSERT AND UPDATE DATA */
    try {
      await createReason({
        variables: {
          inputReason: {
            order_id: parseInt(idOrder),
            issusse_id: parseInt(reason),
            user_id: parseInt(idUser),
            reason: clientsReason,
          },
        },
      })
      return (
        ToastSweetAlert({
          mode: 'ok',
          message: 'Orden rechazada',
        }),
        history.goBack()
      )
    } catch (e) {
      return ToastSweetAlert({
        mode: 'error',
        message: e.message,
      })
    }
  }
}
