import { Request, Response } from 'express'
import wooapiTest from '../../services/woocommerceConnection'
import Order from '../../models/Catalogs/Orders/OrderModel'
import dataTratament, { productsQuantity } from '../woocommerce/dataTratament'
import OrderShipping from '../../models/Catalogs/Orders/OrderShippingModel'
import OrderPayment from '../../models/Catalogs/Orders/OrderPaymentModel'
import OrderProduct from '../../models/Catalogs/Orders/OrderProductModel'
import Store from '../../models/Catalogs/Stores/StoreModel'
import Warehouse from '../../models/Catalogs/Warehouses/WarehouseModel'

export const syncController = async (req: Request, res: Response) => {
  console.log('=== req ===')
  console.log(req.body)
  if (req.body.status === 'processing') {
    await WoocommerceWebHookSync(req.body)
  }
  // await WoocommerceSync()
  // Store.findAll({})
  // Warehouse.findAll({})
  // await WooTestSync()
  // await MercadoLibreSync()
  return res.status(200).json('Sync data sucessfull')
}

export const syncBatchController = async (req: Request, res: Response) => {
  await WoocommerceSync()
  // await WooTestSync()
  // await MercadoLibreSync()
  return res.status(200).json('Sync data sucessfull')
}
export const syncGet = (req: Request, res: Response) => {
  res.send('Sync data sucessfull')
}

interface OrderRelations {
  shipping_id: number
  payment_id: number
  innvoice_id: number
  product_quantity: number
  store_id: number | null
  warehouse_id: number | null
}

interface IOrderProduct {
  id: number
  name: string
  product_id: number
  variation_id: number
  quantity: number
  tax_class: string
  subtotal: string
  subtotal_tax: string
  total: string
  total_tax: string
  taxes: []
  meta_data: []
  sku: string
  price: number
  parent_name: null | string
}

const WoocommerceSync = async () => {
  try {
    const lastOrders = await wooapiTest.get(
      `orders?status=${'processing'}&per_page=${20}&page=${1}`
    )
    if (lastOrders.status === 200) {
      if (lastOrders.data.length == 0) {
        return {
          status: false,
          message: 'no result',
        }
      }
      const ordersFromWoocommerce = lastOrders.data
      console.log(ordersFromWoocommerce)
      ordersFromWoocommerce.forEach((order: any) =>
        console.log(order.shipping_lines)
      )
      for (const order of ordersFromWoocommerce) {
        const orderExist = await Order.findOne({
          where: { order_id: order.id },
        })
        if (orderExist === null) {
          const {
            order_id,
            order_date,
            status_id,
            type_id,
            method_id,
            total_price,
            store,
            shipping_price,
            shippingData,
            paymentData,
            productsData,
            uber_id,
          } = dataTratament(order)
          let orderRelations: OrderRelations = {
            shipping_id: 0,
            payment_id: 0,
            innvoice_id: 0,
            product_quantity: 0,
            store_id: null,
            warehouse_id: null,
          }
          const orderCreated = await Order.create({
            platform_id: 1, // 1 Woocommerce 2 MercadoLibre 3 Amazon
            order_id,
            order_date,
            status_id,
            type_id,
            method_id,
            uber_id,
            total_price,
            shipping_price,
            is_active: true,
          })
          const orderCreatedId = orderCreated.id

          //create shipping details
          const shippingCreated = await OrderShipping.create({
            ...shippingData,
            order_id: orderCreatedId,
          })

          orderRelations.shipping_id = shippingCreated.id

          //create payment details
          const paymentCreated = await OrderPayment.create({
            ...paymentData,
            order_id: orderCreatedId,
            is_active: true,
          })
          orderRelations.payment_id = paymentCreated.id

          //create innvoice details

          //create products by order and count quantity
          let productQuantity = 0
          for (let product of productsData) {
            delete product.id
            productQuantity += product.quantity
            await OrderProduct.create({ ...product, order_id: orderCreatedId })
          }
          orderRelations.product_quantity = productQuantity

          //find and update store for pickup
          if (type_id === 2 && method_id === 1 && store) {
            const foundedStore = await Store.findOne({ where: { name: store } })
            if (foundedStore) {
              orderRelations.store_id = foundedStore.id
            }
          } else if (type_id === 2 && method_id === 3 && store) {
            const foundedStore = await Store.findOne({
              where: { uber_id: store },
            })
            if (foundedStore) {
              orderRelations.store_id = foundedStore.id
            }
          } else if (type_id === 1 && method_id === 1 && store) {
            const foundedWarehouse = await Warehouse.findOne({
              where: { name: store },
            })
            if (foundedWarehouse) {
              orderRelations.warehouse_id = foundedWarehouse.id
            }
          }
          const orderUpdated = Order.update(
            { ...orderRelations },
            { where: { id: orderCreatedId } }
          )
        }
      }
    }
  } catch (error) {
    console.log(error)
    return {
      status: false,
      error: error,
    }
  }
}
const WoocommerceWebHookSync = async (order: any) => {
  try {
    const orderExist = await Order.findOne({
      where: { order_id: order.id },
    })
    if (orderExist) {
      throw new Error('Order already exist')
    }
    const {
      order_id,
      order_date,
      status_id,
      type_id,
      method_id,
      total_price,
      store,
      shipping_price,
      shippingData,
      paymentData,
      productsData,
      uber_id,
    } = dataTratament(order)
    let orderRelations: OrderRelations = {
      shipping_id: 0,
      payment_id: 0,
      innvoice_id: 0,
      product_quantity: 0,
      store_id: null,
      warehouse_id: null,
    }
    const orderCreated = await Order.create({
      platform_id: 1, // 1 Woocommerce 2 MercadoLibre 3 Amazon
      order_id,
      order_date,
      status_id,
      type_id,
      method_id,
      uber_id,
      total_price,
      shipping_price,
      is_active: true,
    })
    const orderCreatedId = orderCreated.id

    //create shipping details
    const shippingCreated = await OrderShipping.create({
      ...shippingData,
      order_id: orderCreatedId,
    })

    orderRelations.shipping_id = shippingCreated.id

    //create payment details
    const paymentCreated = await OrderPayment.create({
      ...paymentData,
      order_id: orderCreatedId,
      is_active: true,
    })
    orderRelations.payment_id = paymentCreated.id

    //create products by order and count quantity
    let productQuantity = 0
    for (let product of productsData) {
      delete product.id
      productQuantity += product.quantity
      await OrderProduct.create({ ...product, order_id: orderCreatedId })
    }
    orderRelations.product_quantity = productQuantity

    //find and update store for pickup
    if (type_id === 2 && method_id === 1 && store) {
      const foundedStore = await Store.findOne({ where: { name: store } })
      if (foundedStore) {
        orderRelations.store_id = foundedStore.id
      }
    } else if (type_id === 2 && method_id === 3 && store) {
      const foundedStore = await Store.findOne({
        where: { uber_id: store },
      })
      if (foundedStore) {
        orderRelations.store_id = foundedStore.id
      }
    } else if (type_id === 1 && method_id === 1 && store) {
      const foundedWarehouse = await Warehouse.findOne({
        where: { name: store },
      })
      if (foundedWarehouse) {
        orderRelations.warehouse_id = foundedWarehouse.id
      }
    }
    const orderUpdated = Order.update(
      { ...orderRelations },
      { where: { id: orderCreatedId } }
    )
  } catch (error) {
    console.log(error)
    return {
      status: false,
      error: error,
    }
  }
}
