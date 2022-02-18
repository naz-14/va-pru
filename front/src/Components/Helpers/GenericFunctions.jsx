import { ToastSweetAlert } from './ToastSweetAlert'

//MORE SIGNATURES
//en.wikipedia.org/wiki/List_of_file_signatures

export async function FileValidator(image, validateFormat) {
  try {
    var blob = image
    var fr = new FileReader()
    const format = validateFormat.toLowerCase()
    return new Promise((resolve) => {
      fr.onload = function (e) {
        var arr = new Uint8Array(e.target.result).subarray(0, 4)
        var header = ''
        for (var i = 0; i < arr.length; i++) {
          header += arr[i].toString(16)
        }
        switch (format) {
          case 'all':
            return resolve(true)
          case 'png': //"PNG"
            if (header === '89504e47') return resolve(true)
            else return resolve(false)
          case 'jpg':
          case 'jpge': //"JPG JPGE"
            switch (header) {
              case 'ffd8ffe0':
              case 'ffd8ffe1':
              case 'ffd8ffe2':
              case 'ffd8ffe3':
              case 'ffd8ffe8':
              case 'ffd8ffdb':
                return resolve(true)
              default:
                return resolve(false)
            }
          case 'icon': //"JPG"
            if (header === '00000100') return resolve(true)
            else return resolve(false)
          case 'imageavatar': //JPG, JPGE, PNG,
            switch (header) {
              case 'ffd8ffe0':
              case 'ffd8ffe1':
              case 'ffd8ffe2':
              case 'ffd8ffe3':
              case 'ffd8ffe8':
              case 'ffd8ffdb':
              case '89504e47':
                return resolve(true)
              default:
                return resolve(false)
            }
          case 'pdf': //PDF
            if (header === '255044462D') return resolve(true)
            else return resolve(false)
          default:
            return resolve(false)
        }
      }
      fr.readAsArrayBuffer(blob)
    })
  } catch (e) {
    return ToastSweetAlert({
      mode: 'errorModal',
      message: 'Algo salio mal, vuelve a intentar en unos minutos',
    })
  }
}
