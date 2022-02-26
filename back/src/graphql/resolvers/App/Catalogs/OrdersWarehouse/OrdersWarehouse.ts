import {
  AppOrderWarehouse,
  ProductsOrderWarehouse,
  Resolvers,
} from '../../../../generated'
import OrdersWarehouse from '../../../../../models/App/Catalogs/Orders/OrdersWarehouse/OrdersWarehouseModel'
import Order from '../../../../../models/Catalogs/Orders/OrderModel'
import { Op } from 'sequelize'
import OrderProduct from '../../../../../models/Catalogs/Orders/OrderProductModel'
import WarehouseOrderBoxes from '../../../../../models/Catalogs/Warehouses/WarehouseOrderBoxes'
import sequelize from '../../../../../db/connection'

interface WarehouseProduct {
  id: number
  product_id: number
  sku: string
  name: string
  quantity: number
  price: number
  total: number
  variation_id: number
  rack: string
}

import { PubSub } from 'graphql-subscriptions'
import SapItems from '../../../../../models/Catalogs/SAP/Items/SapItemsModel'
import Timeline from '../../../../../models/Catalogs/Timeline/TimelineModel'
import moment from 'moment'

const pubsub = new PubSub()

const OrdersWarehouseResolver: Resolvers = {
  Subscription: {
    pickingOrderChanged: {
      subscribe: (_, __) => {
        return pubsub.asyncIterator('pickingOrderChanged')
      },
    },
    pickingOrderCompleted: {
      subscribe: (_, __) => {
        return pubsub.asyncIterator('pickingOrderCompleted')
      },
    },
    packingOrderChanged: {
      subscribe: (_, __) => {
        return pubsub.asyncIterator('packingOrderChanged')
      },
    },
    packingOrderCompleted: {
      subscribe: (_, __) => {
        return pubsub.asyncIterator('packingOrderCompleted')
      },
    },
  },
  Query: {
    getAllAppOrderWarehouses: async (_, {}, context) => {
      return await OrdersWarehouse.findAll({
        where: {
          open: true,
          picking_user_id: {
            [Op.eq]: null,
          },
        },
      })
    },
    getAllAppOrderWarehousesPacking: async (_, {}, context) => {
      return await OrdersWarehouse.findAll({
        where: {
          picking_user_id: {
            [Op.ne]: null,
          },
          packing_user_id: {
            [Op.eq]: null,
          },
          rack_id: {
            [Op.ne]: null,
          },
          open: true,
        },
      })
    },

    getAppOrderWarehouseById: async (_, { id }, context) => {
      try {
        const order = await OrdersWarehouse.findOne({ where: { id } })
        if (!order) {
          throw new Error('Order not found')
        }
        const products = await OrderProduct.findAll({
          where: { order_id: order.id },
          raw: true,
        })
        const productArray: ProductsOrderWarehouse[] = []
        // forEach product shuild get the rack and append it to the product
        products.forEach((product) => {
          const rack = 'A220'
          // await Order.findOne({
          //   where: { id: product.order_id },
          // })
          productArray.push({
            ...product,
            rack,
          })
        })
        return {
          details: order,
          products: productArray,
        }
      } catch (error) {
        console.log(error)
        throw new Error("Can't get order")
      }
    },
    getAppOderWarehouseByMultiIds: async (_, { ids }, context) => {
      try {
        const orders = await OrdersWarehouse.findAll({ where: { id: ids } })
        if (!orders) {
          throw new Error('Order not found')
        }
        const productArray: ProductsOrderWarehouse[] = []
        for (const order of orders) {
          const products = await OrderProduct.findAll({
            where: { order_id: order.id },
            raw: true,
          })
          // forEach product shuild get the rack and append it to the product
          products.forEach((product) => {
            const rack = 'A220'
            // await Order.findOne({
            //   where: { id: product.order_id },
            // })
            productArray.push({
              ...product,
              rack,
            })
          })
        }
        return {
          details: orders,
          products: productArray,
        }
      } catch (error) {
        console.log(error)
        throw new Error("Can't get order")
      }
    },
    getAppWarehouseOrderBoxes: async (_, { id }, context) => {
      return await WarehouseOrderBoxes.findAll({
        where: { warehouse_order_id: id },
      })
    },
    getAppUserWarehouseOrders(_, { id }, context) {
      return OrdersWarehouse.findAll({
        where: {
          picking_user_id: id,
          open: false,
          packing_user_id: {
            [Op.eq]: null,
          },
        },
      })
    },
    getAppUserWarehouseOrdersPacking(_, {}, context) {
      return OrdersWarehouse.findAll({
        where: {
          packing_user_id: context.userId,
          open: false,
        },
      })
    },
  },
  AppOrderWarehouse: {
    order: async ({ order_id }) => {
      return await Order.findOne({ where: { id: order_id } })
    },
  },
  Mutation: {
    isOrderOpen: async (_, { id }, context) => {
      const order = await OrdersWarehouse.findOne({ where: { id } })
      if (order) {
        return order.open
      } else {
        return false
      }
    },
    changeOrderToClose: async (_, { id }, context) => {
      const order = await OrdersWarehouse.findOne({ where: { id } })
      if (order) {
        order.open = false
        order.picking_user_id = context.userId
        await order.save()
        pubsub.publish('pickingOrderChanged', {
          pickingOrderChanged: order,
        })
        return true
      } else {
        return false
      }
    },
    changeOrderPackingToClose: async (_, { id }, context) => {
      const order = await OrdersWarehouse.findOne({ where: { id } })
      if (order) {
        order.open = false
        order.packing_user_id = context.userId
        await order.save()
        pubsub.publish('packingOrderChanged', {
          packingOrderChanged: order,
        })
        return true
      } else {
        return false
      }
    },
    changeMultipleOrdersToClose: async (_, { ids }, context) => {
      const transaction = await sequelize.transaction()
      const orders = await OrdersWarehouse.findAll({
        where: { id: ids },
      })
      if (orders.length === ids.length) {
        for (const order of orders) {
          await order.update(
            {
              open: false,
              picking_user_id: context.userId,
            },
            {
              where: {
                id: order.id,
              },
              transaction,
            }
          )
        }
        await transaction.commit()
        orders.forEach((order) => {
          pubsub.publish('pickingOrderChanged', {
            pickingOrderChanged: order.toJSON(),
          })
        })
        return true
      } else {
        await transaction.rollback()
        return false
      }
    },
    validateProduct: async (
      _,
      { productSku, productBarcode, orderProductId },
      context
    ) => {
      try {
        const orderProduct = await OrderProduct.findOne({
          where: { id: orderProductId },
        })
        if (orderProduct) {
          const productValid = await SapItems.findOne({
            where: {
              item_code: productSku,
              item_code_bar: productBarcode,
            },
          })
          if (productValid) {
            orderProduct.picked = true
            await orderProduct.save()
            return true
          }
          return false
        }
        return false
      } catch (e) {
        return false
      }
    },
    validateRack: async (_, { warehouseOrderId, rackCode }, context) => {
      const transaction = await sequelize.transaction()
      try {
        let order = await OrdersWarehouse.findOne({
          where: { id: warehouseOrderId },
          raw: true,
        })
        if (order) {
          await OrdersWarehouse.update(
            {
              open: true,
              rack_id: rackCode,
            },
            { where: { id: warehouseOrderId }, transaction }
          )
          const principalOrder = await Order.findOne({
            where: { id: order.order_id },
          })
          await Order.update(
            {
              status_id: 10,
              user_id: context.user_id,
            },
            {
              where: {
                id: order.order_id,
              },
              transaction,
            }
          )
          await Timeline.create(
            {
              user_id: context.userId,
              order_id: principalOrder!.order_id,
              status_id: 10,
              dateStatus: moment().format('YYYY-MM-DD HH:mm:ss'),
              is_active: true,
            },
            { transaction }
          )
          await transaction.commit()
          const orderUpdated = await OrdersWarehouse.findOne({
            where: { id: warehouseOrderId },
          })
          await pubsub.publish('pickingOrderCompleted', {
            pickingOrderCompleted: orderUpdated,
          })
          return true
        }
        return false
      } catch (e) {
        return false
      }
    },
    validateRackMultiOrder: async (
      _,
      { warehouseOrderId, rackCode },
      context
    ) => {
      const transaction = await sequelize.transaction()
      try {
        let orders = await OrdersWarehouse.findAll({
          where: { id: warehouseOrderId },
        })
        for (const order of warehouseOrderId) {
          await OrdersWarehouse.update(
            {
              open: true,
              rack_id: rackCode,
            },
            {
              where: { id: order },
              transaction,
            }
          )
        }
        await transaction.commit()
        orders.forEach((order) => {
          pubsub.publish('pickingOrderCompleted', {
            pickingOrderCompleted: order.toJSON(),
          })
        })
        return true
      } catch (e) {
        await transaction.rollback()
        return false
      }
    },
    validateProductPacking: async (
      _,
      { productSku, productBarcode, orderProductId },
      context
    ) => {
      try {
        const orderProduct = await OrderProduct.findOne({
          where: { id: orderProductId },
        })
        if (orderProduct) {
          const productValid = await SapItems.findOne({
            where: {
              item_code: productSku,
              item_code_bar: productBarcode,
            },
          })
          if (productValid) {
            orderProduct.packed = true
            await orderProduct.save()
            return true
          }
          return false
        }
        return false
      } catch (e) {
        return false
      }
    },
    createOrderWarehouseBoxes: async (_, { orderId, boxes }) => {
      const transaction = await sequelize.transaction()
      try {
        for (const box of boxes) {
          await WarehouseOrderBoxes.create(
            {
              warehouse_order_id: orderId,
              box_id: box.box_id,
              quantity: box.quantity,
              is_active: true,
            },
            { transaction }
          )
        }
        await transaction.commit()
        return true
      } catch (e) {
        await transaction.rollback()
        return false
      }
    },
    changeOrderPackingToCompleted: async (_, { id }, context) => {
      const transaction = await sequelize.transaction()
      try {
        const orderWarehouse = await OrdersWarehouse.findOne({
          where: { id },
        })
        if (orderWarehouse) {
          await OrdersWarehouse.update(
            {
              open: true,
              packing_user_id: context.userId,
            },
            { where: { id }, transaction }
          )
          await Order.update(
            {
              status_id: 8,
              user_id: context.userId,
            },
            {
              where: { id: orderWarehouse.order_id },
              transaction,
            }
          )
          const principalOrder = await Order.findOne({
            where: { id: orderWarehouse.order_id },
          })
          // timeline
          await Timeline.create(
            {
              user_id: context.userId,
              order_id: principalOrder!.order_id,
              status_id: 8,
              dateStatus: moment().format('YYYY-MM-DD HH:mm:ss'),
              is_active: true,
            },
            { transaction }
          )

          await transaction.commit()
          pubsub.publish('packingOrderCompleted', {
            packingOrderCompleted: orderWarehouse.toJSON(),
          })
          return true
        }
        await transaction.rollback()
        return false
      } catch (e) {
        await transaction.rollback()
        return false
      }
    },
  },
}

export default OrdersWarehouseResolver
