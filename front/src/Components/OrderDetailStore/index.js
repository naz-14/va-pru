import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import OrderCol from '../Global/OrderCol'

function OrderDetailStore({
  withStore,
  orderType,
  orderStore,
  orderMethod,
  orderPaymentPlatform,
  shippingPrice,
  totalPrice,
  id_store,
  status_id,
  uberAssignedId,
  stores = [],
  id_shippingCompany,
  shippingCompanies = [],
  show = false,
  handleStoreChange = () => {},
  handleShippingCompanyChange = () => {},
}) {
  /*
      STATUS
      id  name
      ---------------
      1 = pending
      2 = processing
      3 = billing
      4 = local-shipping
      5 = national-shipping
      6 = supply
      7 = in-route
      8 = collect
      9 = picking
      10 = packing
      11 = completed
      12 = rejected
      13 = returned
  */

  const [storeOptions, setStoreOptions] = useState([])
  const [shippingCompaniesOptions, setShippingCompaniesOptions] = useState([])
  useEffect(() => {
    if (stores.length > 0) {
      const options = stores.map((store) => {
        return {
          value: store.id,
          label: store.name,
        }
      })
      setStoreOptions(options)
    }
  }, [stores])
  useEffect(() => {
    if (shippingCompanies.length > 0) {
      const options = shippingCompanies.map((company) => {
        return {
          value: company.id,
          label: company.name,
        }
      })
      setShippingCompaniesOptions(options)
    }
  }, [shippingCompanies])

  return (
    <>
      <div className="col-12 box-separator">
        <div className="row">
          <OrderCol
            title="Tipo de pedido"
            content={orderType}
            mediumColSize="6"
          />
          {withStore || status_id !== 1 || show ? (
            <OrderCol title="Tienda" content={orderStore} mediumColSize="6" />
          ) : (
            <div className="col-6">
              <h5 className="header-text-details">Tienda</h5>
              <Select
                name={'store'}
                placeholder="Selecciona una tienda"
                NoOptionsMessage="No hay datos registrados"
                options={storeOptions}
                onChange={(e) => handleStoreChange(e)}
                value={storeOptions?.find((option) => {
                  if (parseInt(option.value) === parseInt(id_store)) {
                    return option
                  }
                  return null
                })}
              />
            </div>
          )}
          {orderMethod === 'Fast' && (
            <OrderCol
              title="Tipo de entrega"
              content={orderMethod}
              mediumColSize="6"
            />
          )}
          {orderMethod === 'Picking' && (
            <OrderCol
              title="Tipo de entrega"
              content={orderMethod}
              mediumColSize="6"
            />
          )}
          {orderMethod === 'UDirect' && (
            <>
              <OrderCol
                title="Tipo de entrega"
                content={orderMethod}
                mediumColSize="6"
              />
              <OrderCol
                title="Tipo de logística"
                content={orderMethod}
                mediumColSize="6"
              />
              <OrderCol
                title="Uber assigned id"
                content={uberAssignedId}
                mediumColSize="6"
              />
            </>
          )}
          {orderType === 'Nacional' && !show && (
            <div className="col-6">
              <h5 className="header-text-details">Logistica</h5>
              <Select
                name={'logistictCompany'}
                placeholder="Selecciona una compañia"
                NoOptionsMessage="No hay datos registrados"
                options={shippingCompaniesOptions}
                onChange={(e) => handleShippingCompanyChange(e)}
                value={shippingCompaniesOptions?.find((option) => {
                  if (parseInt(option.value) === parseInt(id_shippingCompany)) {
                    return option
                  }
                  return null
                })}
              />
            </div>
          )}
          {orderMethod === 'Fast' && status_id === 6 && !show && (
            <div className="col-6">
              <h5 className="header-text-details">Logistica</h5>
              <Select
                name={'logistictCompany'}
                placeholder="Selecciona una compañia"
                NoOptionsMessage="No hay datos registrados"
                options={shippingCompaniesOptions}
                onChange={(e) => handleShippingCompanyChange(e)}
                value={shippingCompaniesOptions?.find((option) => {
                  if (parseInt(option.value) === parseInt(id_shippingCompany)) {
                    return option
                  }
                  return null
                })}
              />
            </div>
          )}

          <OrderCol
            title="Tipo de pago"
            content={orderPaymentPlatform}
            mediumColSize="6"
          />
          {/* {!show && status_id === 1 && (
            <div className="col-6">
              <h5 className="header-text-details">Carga de documento</h5>
              <input type="file" name="file" id="file" className="uploadFile" />
              <label htmlFor="file" className="process-btn process-btn__gray">
                Subir documento <i className="fas fa-upload"></i>
              </label>
            </div>
          )} */}
        </div>
      </div>

      {/* DETAILS OF PRICES */}
      <div className="col-12">
        <div className="row justify-content-between">
          <p className="cost-header">Producto</p>
          <p className="cost-text">{`$${totalPrice - shippingPrice}`}</p>
        </div>
        <div className="row justify-content-between">
          <p className="cost-header">EnvÍo</p>
          <p className="cost-text">{`$${shippingPrice}`}</p>
        </div>
        <div className="row justify-content-end">
          <p className="cost-header text-bold">Total: {`$${totalPrice}`}</p>
        </div>
      </div>
    </>
  )
}

export default OrderDetailStore
