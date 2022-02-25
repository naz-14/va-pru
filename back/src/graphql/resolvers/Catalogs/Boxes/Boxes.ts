import { Resolvers } from '../../../generated'
import BoxesModel from '../../../../models/Catalogs/Boxes/BoxesModel'

const BoxesResolver: Resolvers = {
  Query: {
    getAllBoxes: async (_, {}) => {
      const clause: any = {
        where: {
          is_active: 1,
        },
      }
      return await BoxesModel.findAll(clause)
    },
  },
}

export default BoxesResolver
