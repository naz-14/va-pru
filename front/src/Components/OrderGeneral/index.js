import React from 'react'
import OrderCol from '../Global/OrderCol'

function OrderGeneral({
  platform = '',
  paymentId = '',
  orderId = '',
  orderDate = '',
}) {
  return (
    <div className="box-separator">
      <div className="row">
        <OrderCol title="Plataforma" content={platform} />
        <OrderCol title="No. de cobro" content={paymentId} />
        <OrderCol title="No. de venta" content={orderId} />
        <OrderCol title="Fecha y hora" content={orderDate} />
      </div>
    </div>
  )
}

export default OrderGeneral
