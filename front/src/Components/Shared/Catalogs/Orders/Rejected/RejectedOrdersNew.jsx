import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '../../../../Layout/ContentHeader'
import { GET_ORDER_DETAILS_BY_ID } from '../../../../../graphql/Catalog/Orders/pendingOrders'
import { useQuery } from '@apollo/client'
import OrderGeneral from '../../../../OrderGeneral'
import OrderDetailStore from '../../../../OrderDetailStore'
import OrderShippingDetails from '../../../../OrderShippingDetails'
import OrdersIssuesDetails from '../../../../OrdersIssuesDetails'
import OrderProducts from '../../../../OrderProducts'
import Timeline from '../../../../Global/Timeline/Timeline'
import InternalNotes from '../../../../Global/InternalNotes/InternalNotes'
import { ToastSweetAlert } from '../../../../Helpers/ToastSweetAlert'
import moment from 'moment'
import 'moment/locale/es'

const RejectedOrdersNew = () => {
  const { id: _id } = useParams()
  const [storeId, setStoreId] = useState('')
  // const [warehouseId, setWarehouseId] = useState('')
  const [storeFromDB, setStoreFromDB] = useState(false)
  const [idOrder, setIdOrder] = useState(0)
  const history = useHistory()

  const { data, loading, error } = useQuery(GET_ORDER_DETAILS_BY_ID, {
    variables: {
      id: parseInt(_id),
    },
  })

  useEffect(() => {
    if (!loading) {
      if (error) {
        return ToastSweetAlert(
          {
            mode: 'error',
            message: error.message,
          },
          history.push('/orders/rejected')
        )
      }

      /* VERIFY IF ORDER DOESN'T EXISTS */
      if (!data.getOrderById) {
        return ToastSweetAlert(
          {
            mode: 'error',
            message: 'Esta orden no existe',
          },
          history.push('/orders/rejected')
        )
      }
      /* VERIFY IF ORDER TYPE ES CORRECT */
      if (
        data?.getOrderById?.status?.id !== 12 &&
        data?.getOrderById?.status?.id !== 13
      ) {
        return ToastSweetAlert(
          {
            mode: 'error',
            message: 'Esta orden no esta rechazada',
          },
          history.push('/orders/rejected')
        )
      }

      const orderData = data.getOrderById
      if (orderData.store?.name || orderData.warehouse?.name)
        setStoreFromDB(true)
      setStoreId(orderData.store_id)
      // setWarehouseId(orderData.warehouse_id)
      setIdOrder(orderData.order_id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error])
  const handleStoreChange = (e) => {
    setStoreId(e.value)
  }

  moment.locale('es') //Change dates languages to spanish

  return (
    <>
      {data?.getOrderById &&
        !loading &&
        (data?.getOrderById?.status?.id === 12 ||
          data?.getOrderById?.status?.id === 13) && (
          <>
            <ContentHeader
              title="Orden Rechazada"
              breadcrumb="Ordenes"
              windowTitle={`${_id ? 'Editar' : 'Agregar'} orden `}
            />
            <div className="row">
              <div className="col-8">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Detalles</h3>
                      </div>
                      <div className="card-body col-12">
                        <OrderGeneral
                          orderDate={moment(
                            data?.getOrderById?.order_date
                          ).format('LLL')}
                          orderId={data?.getOrderById?.order_id}
                          paymentId={data?.getOrderById?.payment.payment_id}
                          platform={data?.getOrderById?.platform.name}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Detalles de pago</h3>
                      </div>
                      <div className="card-body">
                        <OrderDetailStore
                          orderType={data.getOrderById.type?.name}
                          orderStore={
                            data.getOrderById.store?.name ||
                            data.getOrderById.warehouse?.name
                          }
                          orderPaymentPlatform={
                            data.getOrderById.payment?.platform
                          }
                          orderMethod={data.getOrderById.method?.name}
                          withStore={storeFromDB}
                          totalPrice={data.getOrderById.total_price}
                          shippingPrice={data.getOrderById.shipping_price}
                          handleStoreChange={handleStoreChange}
                          id_store={storeId}
                          status={data?.getOrderById?.status?.id}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Desgloce de productos</h3>
                      </div>
                      <div className="card-body">
                        <OrderProducts
                          productsArray={data.getOrderById.products}
                          totalQuantity={data.getOrderById.product_quantity}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Detalles de envío</h3>
                      </div>
                      <div className="card-body">
                        <OrderShippingDetails
                          city={data.getOrderById.shipping?.city}
                          address={data.getOrderById.shipping?.address_1}
                          postcode={data.getOrderById.shipping?.postcode}
                          email={data.getOrderById.shipping?.email}
                          phone={data.getOrderById.shipping?.phone}
                          firstName={data.getOrderById.shipping?.first_name}
                          lastName={data.getOrderById.shipping?.last_name}
                          state={data.getOrderById.shipping?.state}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Detalles de cancelacion</h3>
                      </div>
                      <div className="card-body">
                        <OrdersIssuesDetails
                          issues={
                            data.getOrderById?.reason?.issusesDetails?.name !==
                            'Otro'
                              ? data.getOrderById?.reason?.issusesDetails?.name
                              : data.getOrderById?.reason?.reason
                          }
                          user={
                            data.getOrderById?.reason?.userDetails?.name ||
                            '---'
                          }
                          timestap={
                            moment(data.getOrderById?.reason?.createdAt).format(
                              'LL hh:MM a'
                            ) || '---'
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* TIMELINE & INTERNAL NOTES */}
              <div className="col-4">
                <Timeline idOrder={idOrder} />
                <InternalNotes idOrder={idOrder} />
              </div>
            </div>
          </>
        )}
    </>
  )
}

export default RejectedOrdersNew
