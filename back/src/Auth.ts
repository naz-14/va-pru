import jwt from 'jsonwebtoken'

require('dotenv').config()
export default (request: any) => {
  const header = request.req.headers.authorization
  if (!header) {
    return { isAuth: false }
  }
  const token: any = header.split(' ')
  if (!token) {
    return { isAuth: false }
  }
  let decodeToken: any
  try {
    decodeToken = jwt.verify(token[1], `${process.env.SECRET_KEY}`)
  } catch (e) {
    return { isAuth: false }
  }
  if (!!!decodeToken) {
    return { isAuth: false }
  }
  if (decodeToken.id_type) {
    console.log('decodeToken.id_type', decodeToken.id_type)
    return {
      isAuth: true,
      userId: decodeToken.id,
      typeId: decodeToken.id_type,
      name: decodeToken.name,
      email: decodeToken.email,
    }
  }
  console.log('decodeToken.id_type', decodeToken.id_type)

  return {
    isAuth: true,
    userId: decodeToken.id,
    roleId: decodeToken.role,
    storeId: decodeToken.id_store,
  }
}
