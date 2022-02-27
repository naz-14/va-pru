import sequelize from '../../../../db/connection'
import { Op } from 'sequelize'
import { Resolvers } from '../../../generated'
import StoreModel from './../../../../models/Catalogs/Stores/StoreModel'

const StoreResolver: Resolvers = {
    Query: {
        getAllStores: async (_, { limit, offset, searchQuery }, context) => {

            const clause: any = {
                where: {},
            }

            if (limit !== null && offset !== null) {
                clause.offset = offset
                clause.limit = limit
            }

            if (searchQuery) {
                clause.where[Op.or] = [
                // { status_id: { [Op.like]: `%${searchQuery}%` } },
                // { method_id: { [Op.like]: `%${searchQuery}%` } },
                ]
            }

            return Promise.resolve(await StoreModel.findAndCountAll(clause))
        },
        getOneStore: async (_, { id }, context) => {
            const clause: any = {
                where: {
                    id,
                    is_active: true
                },
            }

            return Promise.resolve(await StoreModel.findOne(clause))
        },
    }
}
  
  export default StoreResolver
  