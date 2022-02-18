import sequelize from '../../../../db/connection'
import { Resolvers } from '../../../generated'
import { Op } from 'sequelize'
import Order from '../../../../models/Catalogs/Orders/OrderModel'
import Platform from '../../../../models/Platforms/PlatformsModel'
import Store from '../../../../models/Catalogs/Stores/StoreModel'
import Warehouse from '../../../../models/Catalogs/Warehouses/WarehouseModel'
import OrderShipping from '../../../../models/Catalogs/Orders/OrderShippingModel'
import OrderPayment from '../../../../models/Catalogs/Orders/OrderPaymentModel'
import OrderStatus from '../../../../models/Catalogs/Orders/OrderStatusModel'
import OrderTypes from '../../../../models/Catalogs/Orders/OrderTypesModel'
import NationalShipping from '../../../../models/Catalogs/ShippingMethods/NationalShippingMethodsModel'
import LocalShipping from '../../../../models/Catalogs/ShippingMethods/LocalShippingMethodsModel'
import OrderProduct from '../../../../models/Catalogs/Orders/OrderProductModel'
import Issusses from '../../../../models/Catalogs/Issusses/IssussesModel'
import Reasons from '../../../../models/Catalogs/Reason/ReasonModel'
import User from '../../../../models/Users/UserModel'
import ShippingCompanies from '../../../../models/Catalogs/ShippingCompanies/ShippingCompanies'
import { TimeLineAdd } from '../../../../helpers/TimeLineAdd'

const woocommerceResolver: Resolvers = {
  Query: {
    getPendingOrders: async (
      _,
      { limit, offset, searchQuery, platform },
      context
    ) => {
      console.log('getPendingOrders')
      try {
        const clause: any = {
          where: {
            status_id: 1,
          },
        }

        if (limit !== null && offset !== null) {
          clause.offset = offset
          clause.limit = limit
        }

        if (platform !== null) {
          clause.where.platform_id = platform
        }

        if (searchQuery) {
          clause.where[Op.or] = [
            // { status_id: { [Op.like]: `%${searchQuery}%` } },
            // { method_id: { [Op.like]: `%${searchQuery}%` } },
          ]
        }

        return Promise.resolve(await Order.findAndCountAll(clause))
      } catch (error) {
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
    getOrderById: async (_, { id }, context) => {
      return await Order.findOne({ where: { id } })
    },
    getAllStatusesOrders: async (_, {}) => {
      const clause: any = {
        where: {
          is_active: 1,
        },
      }
      return await OrderStatus.findAll(clause)
    },
  },
  Mutation: {
    getAllPendingExport: async (_, {}) => {
      try {
        return Promise.resolve(
          await Order.findAll({
            where: {
              status_id: 1,
            },
          })
        )
      } catch (error) {
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
  },
  Order: {
    platform: async ({ platform_id }) => {
      return await Platform.findOne({ where: { id: platform_id } })
    },
    status: async ({ status_id }) => {
      return await OrderStatus.findOne({ where: { id: status_id } })
    },
    reason: async ({ order_id }) => {
      return await Reasons.findOne({ where: { order_id } })
    },
    user: async ({ user_id }) => {
      return await User.findOne({ where: { id: user_id } })
    },
    type: async ({ type_id }) => {
      return await OrderTypes.findOne({ where: { id: type_id } })
    },
    store: async ({ store_id }) => {
      return await Store.findOne({ where: { id: store_id } })
    },
    warehouse: async ({ warehouse_id }) => {
      return await Warehouse.findOne({ where: { id: warehouse_id } })
    },
    method: async ({ method_id, type_id }) => {
      if (type_id === 1) {
        return await NationalShipping.findOne({ where: { id: method_id } })
      }
      return await LocalShipping.findOne({ where: { id: method_id } })
    },
    shipping: async ({ shipping_id }) => {
      return await OrderShipping.findOne({ where: { id: shipping_id } })
    },
    payment: async ({ payment_id }) => {
      return await OrderPayment.findOne({ where: { id: payment_id } })
    },
    products: async ({ id }) => {
      return await OrderProduct.findAll({ where: { order_id: id } })
    },
  },
  Reason: {
    userDetails: async ({ user_id }) => {
      return await User.findOne({ where: { id: user_id } })
    },
    issusesDetails: async ({ issusse_id }) => {
      return await Issusses.findOne({ where: { id: issusse_id } })
    },
  },
}

export default woocommerceResolver
