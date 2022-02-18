import Swal from 'sweetalert2'
import { useQuery } from '@apollo/client'

export const CancelSweetAlert = async({ message }) => {

    const { data, loading, error } = useQuery(GET_ISSUES, {
        variables: {
          id: parseInt(_id),
        },
      })
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
    })

    switch (mode) {
        case 'ok':
        return Toast.fire({
            icon: 'success',
            title: `${message}`,
        })
        case 'error':
        return Toast.fire({
            icon: 'error',
            title: `${message}`,
        })
        case 'okModal':
        Swal.fire({
            title: 'Bien',
            text: message,
            icon: 'success',
            customClass: {
            confirmButton: 'btn btn-sm btn-accept',
            },
            buttonsStyling: false,
            allowOutsideClick: false,
        })
        break
        case 'errorModal':
        Swal.fire({
            title: 'Error',
            text: message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: '<i class="fas fa-check"> Aceptar</i>',
            buttonsStyling: false,
            customClass: {
            confirmButton: 'btn btn-sm btn-accept',
            },
        })
        break
        default:
    }
}
