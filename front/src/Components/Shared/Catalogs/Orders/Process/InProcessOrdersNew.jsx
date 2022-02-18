import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '../../../../Layout/ContentHeader'
import { GET_ORDER_DETAILS_BY_ID } from '../../../../../graphql/Catalog/Orders/pendingOrders'
import { useQuery, useMutation } from '@apollo/client'
import OrderGeneral from '../../../../OrderGeneral'
import OrderDetailStore from '../../../../OrderDetailStore'
import OrderShippingDetails from '../../../../OrderShippingDetails'
import OrderButtons from '../../../../OrderButtons'
import OrderProducts from '../../../../OrderProducts'
import {
  CHANGE_TO_SUPPLY,
  GET_TO_STOCK_ORDERS,
} from '../../../../../graphql/Catalog/Orders/toStockOrders'
import Timeline from '../../../../Global/Timeline/Timeline'
import InternalNotes from '../../../../Global/InternalNotes/InternalNotes'
import Swal from 'sweetalert2'
import { ToastSweetAlert } from '../../../../Helpers/ToastSweetAlert'
import { RejectOrder } from '../../../../Helpers/RejectOrder'
import { GET_ALL_ISSUES } from '../../../../../graphql/Catalog/Issues/issues'
import { CREATE_REASON } from '../../../../../graphql/Catalog/Reasons/reasons'
import { AuthContext } from '../../../../../Auth/AuthContext'
import moment from 'moment'
import 'moment/locale/es'

const InProcessOrdersNew = () => {
  const { id: _id, show } = useParams()
  const history = useHistory()
  const [storeId, setStoreId] = useState('')
  // const [warehouseId, setWarehouseId] = useState('')
  const [idOrder, setIdOrder] = useState(0)
  const [storeFromDB, setStoreFromDB] = useState(false)
  const [issuses, setIssuses] = useState({})
  const { user } = useContext(AuthContext)

  const { data, loading, error } = useQuery(GET_ORDER_DETAILS_BY_ID, {
    variables: {
      id: parseInt(_id),
    },
  })

  const [changeToSupply] = useMutation(CHANGE_TO_SUPPLY)

  /* GET ALL ISSUSES DATA */
  const {
    data: dataIssuses,
    loading: loadingIssuses,
    error: errorIssuses,
  } = useQuery(GET_ALL_ISSUES)

  const [createReason] = useMutation(CREATE_REASON)

  useEffect(() => {
    if (!loading) {
      if (error) {
        return ToastSweetAlert(
          {
            mode: 'error',
            message: error.message,
          },
          history.push('/orders/local')
        )
      }

      /* VERIFY IF ORDER DOESN'T EXISTS */
      if (!data.getOrderById) {
        return ToastSweetAlert(
          {
            mode: 'error',
            message: 'Esta orden no existe',
          },
          history.push('/orders/local')
        )
      }

      /* VERIFY IF ORDER TYPE ES CORRECT */
      if (data?.getOrderById?.status?.id === 12) {
        return ToastSweetAlert(
          {
            mode: 'error',
            message: 'Esta orden ha sido rechazada',
          },
          history.push('/orders/local')
        )
      }
      if (data?.getOrderById?.status?.id !== 2) {
        return ToastSweetAlert(
          {
            mode: 'error',
            message: 'Esta orden no esta en proceso',
          },
          history.push('/orders/local')
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

  /* SET DATA TO NEW OBJ */
  useEffect(() => {
    if (!loadingIssuses && !errorIssuses) {
      let list = {}
      dataIssuses.getAllIssusses.map((item) => {
        list = Object.assign(list, { [item.id]: item.name })
        return true
      })
      setIssuses(list)
    }
  }, [dataIssuses, loadingIssuses, errorIssuses])

  const onSubmitLocal = async () => {
    try {
      const { data } = await changeToSupply({
        variables: {
          orderId: parseInt(_id),
          storeId: parseInt(storeId),
        },
        refetchQueries: [{ query: GET_TO_STOCK_ORDERS }],
      })
      if (data.changeToSupply) {
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
  const onSubmitNational = () => {}
  const handleStoreChange = (e) => {
    setStoreId(e.value)
  }

  moment.locale('es') //Change dates languages to spanish

  return (
    <>
      {data?.getOrderById && !loading && data?.getOrderById?.status?.id === 2 && (
        <>
          <ContentHeader
            title="Orden en Proceso"
            breadcrumb="Proceso"
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
                {!show && (
                  <OrderButtons
                    cancelBtn={'Rechazar'}
                    onCancel={async () =>
                      RejectOrder(
                        issuses,
                        user.idUser,
                        createReason,
                        idOrder,
                        history
                      )
                    }
                    processBtn={'Surtir'}
                    onProcess={
                      data.getOrderById.type_id === 1
                        ? onSubmitNational
                        : onSubmitLocal
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

export default InProcessOrdersNew
