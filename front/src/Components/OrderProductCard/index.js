import React from 'react'
import Bebida from '../../Assets/Images/bebida.jpg'

function OrderProductCard({ sku, name, price, quantity, total, id_product }) {
  return (
    <div className="row d-flex align-items-center">
      <div className="col-8">
        <div className="row">
          <div className="image-wrapper col-4 d-flex align-items-center">
            <img
              src={Bebida}
              style={{ maxWidth: '100%', maxHeight: '100px' }}
              alt=""
            />
          </div>
          <div className="col-4 d-flex align-items-center">
            <p className="sku-text">SKU: {sku}</p>
          </div>
          <div className="col-4 d-flex align-items-center">
            <p className="product-text">{name}</p>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="row">
          <div className="col-12 d-flex align-items-center">
            <p className="product-detail-text m-0 text-bold">
              Precio: ${price}
            </p>
          </div>
          <div className="col-12 d-flex align-items-center">
            <p className="product-detail-text m-0 text-bold">
              Cantidad: {quantity}
            </p>
          </div>
          <div className="col-12 d-flex align-items-center">
            <p className="product-detail-text m-0 text-bold">
              Subtotal: ${total}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderProductCard
