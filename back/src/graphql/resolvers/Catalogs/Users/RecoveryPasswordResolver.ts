import { Resolvers } from '../../../generated'
import sequelize from '../../../../db/connection'
import User from '../../../../models/Users/UserModel'
import UserPasswordReset from '../../../../models/Users/UserPasswordResetModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { transporter } from './../../../../helpers/Mailer'

require('dotenv').config()

const tokenLostOrExpired =
  'El token de recuperación ha expirado o es inválido, vuelve a solicitar otro'
const userNotFound = 'El usuario no existe'
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const UserResolver: Resolvers = {
  Query: {},
  Mutation: {
    createRecoveryToken: async (_, { userName }) => {
      try {
        const user = await User.findOne({
          where: { user_name: userName, is_active: true },
        })
        if (!user) {
          return Promise.reject(Error(userNotFound))
        }

        const userToken = await UserPasswordReset.findOne({
          where: { id_user: user.id },
        })

        if (userToken) {
          try {
            const verify = jwt.verify(
              userToken.token_recovery,
              `${process.env.SECRET_KEY}`
            )
            if (verify) {
              await transporter.sendMail({
                from: '"Vinos América" <administracion@adminva.com>',
                to: user.email,
                subject: 'Recuperación contraseña',
                html: `<div>
            <h2>Recuperación de contraseña</h2><br/>
            <section>
              <p>Se ha recibido una solicitud de restablecimiento de contraseña. Has click en el enlace de abajo para restablecerla.</p>
              <a href="http://localhost:3000/verificar/usuario/${userToken.token_recovery}"><h3>Restablecer contraseña</h3></a>
              <small>Este enlace es válido por 15 min.</small>
              <p>Si tu no solicitaste restablecer contraseña, ignora este correo</p>
            </section>
          </div>`,
              })
              return userToken
            }
          } catch (e) {
            await UserPasswordReset.destroy({ where: { id_user: user.id } })
          }
        }

        const salt = await bcrypt.genSalt(10)
        const token_hash = await bcrypt.hash(user.user_name, salt)
        const token_recovery = jwt.sign(
          { token: token_hash, id: user.id },
          `${process.env.SECRET_KEY}`,
          { expiresIn: '15m' }
        )
        const recoveryToken = await UserPasswordReset.create({
          id_user: user.id,
          token_recovery: token_recovery,
        })
        await transporter.sendMail({
          from: '"Vinos América" <administracion@adminva.com>',
          to: user.email,
          subject: 'Recuperación contraseña',
          html: `<div>
            <h2>Recuperación de contraseña</h2><br/>
            <section>
              <p>Se ha recibido una solicitud de restablecimiento de contraseña. Has click en el enlace de abajo para restablecerla.</p>
              <a href="http://localhost:3000/verificar/usuario/${token_recovery}"><h3>Restablecer contraseña</h3></a>
              <small>Este enlace es válido por 15 min.</small>
              <p>Si tu no solicitaste restablecer contraseña, ignora este correo</p>
            </section>
          </div>`,
        })
        return recoveryToken
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
    checkTokenRecovery: async (_, { token }) => {
      try {
        jwt.verify(token, `${process.env.SECRET_KEY}`) as any
        return true
      } catch (error) {
        return Promise.reject(Error(tokenLostOrExpired))
      }
    },
    recoveryUserPassword: async (_, { inputRecovery }) => {
      const transaction = await sequelize.transaction() //START TRANSACTION
      try {
        let { token, password } = inputRecovery
        const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`) as any
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)
        await UserPasswordReset.destroy({
          where: { id_user: decoded.id },
          transaction,
        })

        await User.update(
          {
            password: password,
          },
          { where: { id: decoded.id }, transaction }
        )
        await transaction.commit()
        return true
      } catch (error) {
        await transaction.rollback()
        return Promise.reject(Error(defaultError))
      }
    },
  },
}

export default UserResolver
