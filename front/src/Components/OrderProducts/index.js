import React from 'react'
import OrderProductCard from '../OrderProductCard'

function OrderProducts({ productsArray = [], totalQuantity }) {
  return (
    <>
      <div
        className="col-12 box-separator overflow-auto pb-3"
        style={{ maxHeight: '500px' }}
      >
        <div className="row mb-3">
          <h5 className="header-text-details">Desgloce de Productos</h5>
        </div>
        {productsArray.map((product) => {
          return (
            <OrderProductCard
              key={product.id}
              name={product.name}
              id_product={product.product_id}
              price={product.price}
              sku={product.sku}
              total={product.total}
              quantity={product.quantity}
            />
          )
        })}
      </div>
      <div className="col-12 mt-3">
        <div className="row justify-content-end">
          <p className="cost-header">Botellas totales: {totalQuantity}</p>
        </div>
      </div>
    </>
  )
}

export default OrderProducts
