import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/es'
import ContentHeader from '../../../../Layout/ContentHeader'
import { GET_ORDER_DETAILS_BY_ID } from '../../../../../graphql/Catalog/Orders/pendingOrders'
import { useMutation, useQuery } from '@apollo/client'
import OrderGeneral from '../../../../OrderGeneral'
import OrderDetailStore from '../../../../OrderDetailStore'
import OrderShippingDetails from '../../../../OrderShippingDetails'
import OrderButtons from '../../../../OrderButtons'
import OrderProducts from '../../../../OrderProducts'
import { GET_SIPPING_COMPANIES } from '../../../../../graphql/Catalog/ShippingCompanies/shippingCompanies'
import { ToastSweetAlert } from '../../../../Helpers/ToastSweetAlert'
import Swal from 'sweetalert2'
import { CHANGE_TO_COLLECT } from '../../../../../graphql/Catalog/Orders/collectOrders'
import { GET_TO_STOCK_ORDERS } from '../../../../../graphql/Catalog/Orders/toStockOrders'
import Timeline from '../../../../Global/Timeline/Timeline'
import InternalNotes from '../../../../Global/InternalNotes/InternalNotes'

const ToStockOrdersNew = () => {
  const { id: _id, show } = useParams()
  const history = useHistory()
  const [storeId, setStoreId] = useState('')
  const [shippingCompanyId, setShippingCompanyId] = useState('')
  // const [warehouseId, setWarehouseId] = useState('')
  const [storeFromDB, setStoreFromDB] = useState(false)
  const [idOrder, setIdOrder] = useState(0)

  const { data, loading, error } = useQuery(GET_ORDER_DETAILS_BY_ID, {
    variables: {
      id: parseInt(_id),
    },
  })

  useEffect(() => {
    if (!loading) {
      if (error) {
        return (
          ToastSweetAlert({
            mode: 'error',
            message: error.message,
          }),
          history.push('/orders/stock')
        )
      }

      /* VERIFY IF ORDER DOESN'T EXISTS */
      if (!data.getOrderById) {
        return ToastSweetAlert(
          {
            mode: 'error',
            message: 'Esta orden no existe',
          },
          history.push('/orders/stock')
        )
      }

      /* VERIFY IF ORDER TYPE ES CORRECT */
      if (data?.getOrderById?.status?.id === 12) {
        return ToastSweetAlert(
          {
            mode: 'error',
            message: 'Esta orden ha sido rechazada',
          },
          history.push('/orders/stock')
        )
      }
      if (data?.getOrderById?.status?.id !== 6) {
        return ToastSweetAlert(
          {
            mode: 'error',
            message: 'Esta orden no esta en surtir',
          },
          history.push('/orders/stock')
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

  const [changeToCollect] = useMutation(CHANGE_TO_COLLECT)

  /* SIPPING COMPANIES DATA */
  const {
    data: dataShippingCompanies,
    loading: loadingShippingCompanies,
    // error: errorShippingCompanies,
  } = useQuery(GET_SIPPING_COMPANIES)
  const onSubmitLogistic = async () => {
    if (!shippingCompanyId) {
      return ToastSweetAlert({
        mode: 'error',
        message: 'Por favor seleccione una empresa de logistica',
      })
    }
    try {
      const { data } = await changeToCollect({
        variables: {
          orderId: parseInt(_id),
          shippingCompayId: parseInt(shippingCompanyId),
        },
        refetchQueries: [{ query: GET_TO_STOCK_ORDERS }],
      })
      if (data.changeToCollect) {
        Swal.fire({
          title: 'Bien',
          text: 'Pedido procesado',
          icon: 'success',
          allowOutsideClick: false,
          buttonsStyling: false,
          confirmButtonText: '<i class="fas fa-check"> Aceptar </i>',
          customClass: {
            confirmButton: 'btn btn-sm btn-accept',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            history.goBack()
          }
        })
      }
    } catch (error) {
      return ToastSweetAlert({
        mode: 'errorModal',
        message: error.message,
      })
    }
  }
  const onSubmitNoLogistic = async () => {
    try {
      const { data } = await changeToCollect({
        variables: {
          orderId: parseInt(_id),
        },
        refetchQueries: [{ query: GET_TO_STOCK_ORDERS }],
      })
      if (data.changeToCollect) {
        Swal.fire({
          title: 'Bien',
          text: 'Pedido procesado',
          icon: 'success',
          allowOutsideClick: false,
          buttonsStyling: false,
          confirmButtonText: '<i class="fas fa-check"> Aceptar </i>',
          customClass: {
            confirmButton: 'btn btn-sm btn-accept',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            history.goBack()
          }
        })
      }
    } catch (error) {
      return ToastSweetAlert({
        mode: 'errorModal',
        message: error.message,
      })
    }
  }
  const handleStoreChange = (e) => {
    setStoreId(e.value)
  }
  const handleShippingCompanyChange = (e) => {
    setShippingCompanyId(parseInt(e.value))
  }

  moment.locale('es') //Change dates languages to spanish

  return (
    <>
      {data?.getOrderById &&
        !loading &&
        !loadingShippingCompanies &&
        data?.getOrderById?.status?.id === 6 && (
          <>
            <ContentHeader
              title="Orden por surtir"
              breadcrumb="Surtir"
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
                          id_store={storeId}
                          status_id={data?.getOrderById?.status?.id}
                          uberAssignedId={data?.getOrderById?.uber_id}
                          handleStoreChange={handleStoreChange}
                          shippingCompanies={
                            dataShippingCompanies?.getAllShippingCompanies
                          }
                          id_shippingCompany={shippingCompanyId}
                          handleShippingCompanyChange={
                            handleShippingCompanyChange
                          }
                          show={show}
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
                  {!show && (
                    <OrderButtons
                      firstButtonGray={true}
                      cancelBtn={'Imprimir'}
                      onCancel={() => history.push('/orders/pending')}
                      processBtn={'Por recolectar'}
                      onProcess={
                        data.getOrderById.method?.name === 'Fast'
                          ? onSubmitLogistic
                          : onSubmitNoLogistic
                      }
                    />
                  )}
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

export default ToStockOrdersNew
