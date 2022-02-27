import ConfigSys from '../../models/ConfigSysModel'
import { Resolvers } from '../generated'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'
const configNotExists = 'No existe configuración de sistema'

const configSysResolver: Resolvers = {
  Query: {
    getConfigSys: async (_) => {
      try {
        const config = await ConfigSys.findOne()
        if (!config) {
          return Promise.reject(Error(configNotExists))
        }
        return config
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
  },
}

export default configSysResolver
