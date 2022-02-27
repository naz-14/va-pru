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

const dataTratament = (woocommerceOrder: any) => {
  const shippingType = woocommerceOrder.shipping_lines[0].method_id
  const shippingTitle = woocommerceOrder.shipping_lines[0].method_title
  // const shippingStore = shipping store
  let type_id = 0 // 1 National, 2 Local
  let method_id = 0
  let store: string | null = null
  let uberId: string | null = null
  if (shippingType === 'flat_rate') {
    if (shippingTitle.includes('Envío Nacional')) {
      type_id = 1 //National
      method_id = 1 //Standard
      store = 'CEDIS'
    } else if (shippingTitle.includes('Recibe tu pedido')) {
      type_id = 2 //Local
      method_id = 2 // Fast   -> store_select
    }
  } else if (shippingType === 'szbd-shipping-method') {
    type_id = 2 //Local
    method_id = 2 // Fast   -> store_select
  } else if (shippingType === 'wc_pickup_store') {
    type_id = 2 // Local
    method_id = 1 // Picking -> store ready
    const pickupData = woocommerceOrder.meta_data.find(
      (obj: any) => obj.key === '_shipping_pickup_stores'
    )
    if (pickupData) {
      store = pickupData.value
    }
  } else if (shippingType === 'udirect') {
    type_id = 2 // Local
    method_id = 3 // UDirect -> store ready
    const pickupData = woocommerceOrder.meta_data.find(
      (obj: any) => obj.key === '_udirect_store_id'
    )
    if (pickupData) {
      store = pickupData.value
    }
    const uberIdData = woocommerceOrder.meta_data.find(
      (obj: any) => obj.key === '_udirect_order_id'
    )
    if (uberIdData) {
      uberId = uberIdData.value
    }
  }
  return {
    order_id: woocommerceOrder.id,
    order_date: woocommerceOrder.date_created,
    status_id: 1,
    user_id: null,
    type_id,
    method_id,
    store,
    shippingData: woocommerceOrder.billing,
    shippingTypeMethod: method_id,
    paymentData: {
      platform: woocommerceOrder.payment_method_title,
      payment_id: woocommerceOrder.transaction_id,
      paid_date: woocommerceOrder.date_paid,
    },
    productsData: woocommerceOrder.line_items,
    shipping_price: woocommerceOrder.shipping_total,
    total_price: woocommerceOrder.total,
    uber_id: uberId,
  }
}

export const productsQuantity = (products: [IOrderProduct]) => {
  let quantity = 0
  products.forEach((product) => (quantity += product.quantity))
  return quantity
}

export default dataTratament
