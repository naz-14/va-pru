import Platform from '../../../models/Platforms/PlatformsModel'
import { Resolvers } from '../../generated'

const platfromsResolver: Resolvers = {
  Mutation: {
    createPlatform: async (_, { name }) => {
      return await Platform.create({ name, is_active: true })
    },
  },
}

export default platfromsResolver
