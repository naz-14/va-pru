import React from 'react'
import OrderCol from '../Global/OrderCol'

function OrderShippingDetails({
  firstName,
  lastName,
  email,
  phone,
  address,
  postcode,
  city,
  state,
}) {
  return (
    <div className="col-12">
      <div className="row">
        <OrderCol
          title="Cliente"
          content={`${firstName} ${lastName}`}
          mediumColSize="4"
        />
        <OrderCol title="Email" content={email} mediumColSize="4" />
        <OrderCol title="Telefono" content={phone} mediumColSize="4" />
        <OrderCol title="Dirección" content={address} mediumColSize="8" />
        <OrderCol title="Codigo postal" content={postcode} mediumColSize="4" />
        <OrderCol
          title="Referencia"
          content={'No hay rerefencia'}
          mediumColSize="4"
        />
        <OrderCol title="Ciudad" content={city} mediumColSize="4" />
        <OrderCol title="Estado" content={state} mediumColSize="4" />
      </div>
    </div>
  )
}

export default OrderShippingDetails
