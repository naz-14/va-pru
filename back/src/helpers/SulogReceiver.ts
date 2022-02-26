const axios = require('axios')
require('dotenv').config()
//Data must be an array:
//EXAMPLE
//[
// {
//    key: '49844',
//    name: 'createOrder',
//    values: { order_id: 49844 },
// },
// {
//    key: '49829',
//    name: 'createOrder',
//    values: { order_id: 49829 },
// },
//]
const documentWasNotCreated = 'No se puedo crear el documento'

export const SulogReceiver = async (data: any) => {
  try {
    const request = await axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      url: process.env.VA_RECEIVER,
      data: data,
    })
    return request.data
  } catch (error: any) {
    return Promise.reject(Error(documentWasNotCreated))
  }
}

export default SulogReceiver
