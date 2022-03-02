import sequelize from '../../../../db/connection'
import { Resolvers, TypeFile } from '../../../generated'
import { Op, where } from 'sequelize'
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
import FileModel from '../../../../models/Files/FileModel'
import { getFile } from '../../../../helpers/UploadFile'

const orderNotFound = 'No se encontro esta orden o ha cambiado de estatus'

const woocommerceResolver: Resolvers = {
  Query: {
    getPendingOrders: async (
      _,
      { limit, offset, searchQuery, platform },
      context
    ) => {
      try {
        const clause: any = {
          where: {
            status_id: 1,
          },
        }

        if (context.storeId) {
          clause.where.store_id = context.storeId
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
    getOrderById: async (_, { id }) => {
      return await Order.findOne({ where: { id } })
    },
    getOrderByIdAndStatus: async (_, { id, status_id, type_id }) => {
      const clause: any = {
        where: {
          id,
          is_active: true,
        },
      }
      if (status_id) {
        const ids = status_id.map((id) => {
          return { status_id: id }
        })
        clause.where[Op.or] = ids
      }

      if (type_id) {
        clause.where.type_id = type_id
      }

      const order = await Order.findOne(clause)
      if (!order) return Promise.reject(Error(orderNotFound))
      return order
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
    getAllProcessExport: async (_, {}) => {
      try {
        return Promise.resolve(
          await Order.findAll({
            where: {
              status_id: 2,
            },
          })
        )
      } catch (error) {
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
    getAllBillingExport: async (_, {}) => {
      try {
        return Promise.resolve(
          await Order.findAll({
            where: {
              status_id: 3,
            },
          })
        )
      } catch (error) {
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
    getAllToStockExport: async (_, {}) => {
      try {
        return Promise.resolve(
          await Order.findAll({
            where: {
              status_id: 6,
            },
          })
        )
      } catch (error) {
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
    getAllLocalExport: async (_, {}) => {
      try {
        return Promise.resolve(
          await Order.findAll({
            where: {
              status_id: 2 || 6 || 7 || 8,
            },
          })
        )
      } catch (error) {
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
    getAllNationalExport: async (_, {}) => {
      try {
        return Promise.resolve(
          await Order.findAll({
            where: {
              status_id: 7 || 3 || 9 || 10 || 8,
            },
          })
        )
      } catch (error) {
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
    getAllShippedExport: async (_, {}) => {
      try {
        return Promise.resolve(
          await Order.findAll({
            where: {
              status_id: 11,
            },
          })
        )
      } catch (error) {
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
    getAllRejectedExport: async (_, {}) => {
      try {
        return Promise.resolve(
          await Order.findAll({
            where: {
              status_id: 12 || 13,
            },
          })
        )
      } catch (error) {
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
    getAllInRouteExport: async (_, {}) => {
      try {
        return Promise.resolve(
          await Order.findAll({
            where: {
              status_id: 7,
            },
          })
        )
      } catch (error) {
        return Promise.reject(Error('Algo salio mal, vuelve a intentar'))
      }
    },
    getAllCollectExport: async (_, {}) => {
      try {
        return Promise.resolve(
          await Order.findAll({
            where: {
              status_id: 8,
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
    shippingCompany: async ({ shipping_company_id }) => {
      return await ShippingCompanies.findOne({
        where: { id: shipping_company_id },
      })
    },
  },
  Shipping: {
    receipt: async ({ id_file_receipt }) => {
      const file = await FileModel.findOne({
        where: { id: id_file_receipt },
      })
      if (file) {
        const url = await getFile(file.url)
        return { id: file.id, url: url } as TypeFile
      } else {
        return null
      }
    },
  },
  OrderExport: {
    platform_name: async ({ platform_id }) => {
      const query = await Platform.findOne({ where: { id: platform_id } })
      if (query) return query.name
      else return null
    },
    type_name: async ({ type_id }) => {
      const query = await OrderTypes.findOne({ where: { id: type_id } })
      if (query) return query.name
      else return null
    },
    platform: async ({ payment_id }) => {
      const query = await OrderPayment.findOne({ where: { id: payment_id } })
      if (query) return query.platform
      else return null
    },
    id_payment: async ({ payment_id }) => {
      const query = await OrderPayment.findOne({ where: { id: payment_id } })
      if (query) return query.payment_id
      else return null
    },
    shipping_first_name: async ({ shipping_id }) => {
      const query = await OrderShipping.findOne({ where: { id: shipping_id } })
      if (query) return query.first_name
      else return null
    },
    shipping_last_name: async ({ shipping_id }) => {
      const query = await OrderShipping.findOne({ where: { id: shipping_id } })
      if (query) return query.last_name
      else return null
    },
    store_name: async ({ store_id }) => {
      const query = await Store.findOne({ where: { id: store_id } })
      if (query) return query.name
      else return null
    },
    warehouse_name: async ({ warehouse_id }) => {
      const query = await Warehouse.findOne({ where: { id: warehouse_id } })
      if (query) return query.name
      else return null
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
