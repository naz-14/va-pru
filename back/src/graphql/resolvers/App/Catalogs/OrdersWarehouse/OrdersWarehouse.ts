import { ProductsOrderWarehouse, Resolvers } from '../../../../generated'
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

const OrdersWarehouseResolver: Resolvers = {
  Query: {
    getAllAppOrderWarehouses: async (_, {}, context) => {
      return await OrdersWarehouse.findAll()
    },
    getAllAppOrderWarehousesPacking: async (_, {}, context) => {
      return await OrdersWarehouse.findAll({
        where: {
          picking_user_id: {
            [Op.ne]: null,
          },
          rack_id: {
            [Op.ne]: null,
          },
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
        return true
      } else {
        return false
      }
    },
    changeMultipleOrdersToClose: async (_, { ids }, context) => {
      const orders = await OrdersWarehouse.findAll({ where: { id: ids } })
      if (orders.length === ids.length) {
        for (const order of orders) {
          order.open = false
          order.picking_user_id = context.userId
          await order.save()
        }
        return true
      } else {
        return false
      }
    },
    validateProduct: async (
      _,
      { productSku, productBarcode, orderProductId },
      context
    ) => {
      console.log(productSku, productBarcode, orderProductId)
      try {
        const orderProduct = await OrderProduct.findOne({
          where: { id: orderProductId },
        })
        if (orderProduct) {
          orderProduct.picked = true
          await orderProduct.save()
          return true
        }
        return false
      } catch (e) {
        return false
      }
    },
    validateRack: async (_, { warehouseOrderId, rackCode }, context) => {
      console.log(warehouseOrderId, rackCode)
      return true
    },
    validateProductPacking: async (
      _,
      { productSku, productBarcode, orderProductId },
      context
    ) => {
      console.log(productSku, productBarcode, orderProductId)
      try {
        const orderProduct = await OrderProduct.findOne({
          where: { id: orderProductId },
        })
        if (orderProduct) {
          orderProduct.packed = true
          await orderProduct.save()
          return true
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
  },
}

export default OrdersWarehouseResolver
