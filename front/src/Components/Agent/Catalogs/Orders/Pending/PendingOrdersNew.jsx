import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ContentHeader from '../../../../Layout/ContentHeader'
import moment from 'moment'
import 'moment/locale/es'
import {
  CHANGE_TO_PROCESS,
  GET_ORDER_DETAILS_BY_ID,
  GET_PENDING_ORDERS,
  CHANGE_TO_BILLING,
} from '../../../../../graphql/Catalog/Orders/pendingOrders'
import { useMutation, useQuery } from '@apollo/client'
import OrderGeneral from '../../../../OrderGeneral'
import OrderDetailStore from '../../../../OrderDetailStore'
import OrderShippingDetails from '../../../../OrderShippingDetails'
import OrderButtons from '../../../../OrderButtons'
import OrderProducts from '../../../../OrderProducts'
import { GET_STORES } from '../../../../../graphql/Catalog/Stores/stores'
import { GET_SIPPING_COMPANIES } from '../../../../../graphql/Catalog/ShippingCompanies/shippingCompanies'
import { ToastSweetAlert } from '../../../../Helpers/ToastSweetAlert'
import Timeline from '../../../../Global/Timeline/Timeline'
import InternalNotes from '../../../../Global/InternalNotes/InternalNotes'
import Swal from 'sweetalert2'
import { RejectOrder } from '../../../../Helpers/RejectOrder'
import { AuthContext } from '../../../../../Auth/AuthContext'
import { GET_ALL_ISSUES } from '../../../../../graphql/Catalog/Issues/issues'
import { CREATE_REASON } from '../../../../../graphql/Catalog/Reasons/reasons'
import { GET_BILLING_ORDERS } from '../../../../../graphql/Catalog/Orders/billingOrders'
import { GET_COUNTERS_ORDERS } from '../../../../../graphql/Catalog/Orders/countOrders'
import { GET_IN_PROCESS_ORDERS } from '../../../../../graphql/Catalog/Orders/inProcessOrders'

const PendingOrdersNew = () => {
  const { id: _id, show } = useParams()
  const history = useHistory()
  const [storeId, setStoreId] = useState('')
  const [shippingCompanyId, setShippingCompanyId] = useState('')
  const [idOrder, setIdOrder] = useState(0)
  const [warehouseId, setWarehouseId] = useState('')
  const [storeFromDB, setStoreFromDB] = useState(false)
  const [issuses, setIssuses] = useState({})

  /* ORDER DATA */
  const { data, loading, error } = useQuery(GET_ORDER_DETAILS_BY_ID, {
    variables: {
      id: parseInt(_id),
    },
  })

  /* STORES DATA */
  const { data: dataStores, loading: loadingStores } = useQuery(GET_STORES)

  /* SIPPING COMPANIES DATA */
  const { data: dataShippingCompanies, loading: loadingShippingCompanies } =
    useQuery(GET_SIPPING_COMPANIES)

  const [changeToProcess] = useMutation(CHANGE_TO_PROCESS)
  const [changeToBilling] = useMutation(CHANGE_TO_BILLING)

  const { user } = useContext(AuthContext)

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
      if (data?.getOrderById?.status?.id !== 1) {
        return ToastSweetAlert(
          {
            mode: 'error',
            message: 'Esta orden no esta en pendiente',
          },
          history.push('/orders/local')
        )
      }

      const orderData = data.getOrderById
      if (orderData.store?.name || orderData.warehouse?.name)
        setStoreFromDB(true)
      setStoreId(orderData.store_id)
      setWarehouseId(orderData.warehouse_id)
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
    if (!storeId) {
      return ToastSweetAlert({
        mode: 'error',
        message: 'Por favor seleccione una tienda',
      })
    }
    try {
      const { data } = await changeToProcess({
        variables: {
          orderId: parseInt(_id),
          storeId: parseInt(storeId),
        },
        refetchQueries: [
          {
            query: GET_PENDING_ORDERS,
            variables: {
              searchQuery: '',
              limit: null,
              offset: null,
              platform: null,
            },
          },
          {
            query: GET_COUNTERS_ORDERS,
          },
          {
            query: GET_IN_PROCESS_ORDERS,
            variables: {
              searchQuery: '',
              limit: null,
              offset: null,
              platform: null,
            },
          },
        ],
      })
      if (data.changeToProcess) {
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
  const onSubmitNational = async () => {
    if (!warehouseId) {
      return ToastSweetAlert({
        mode: 'error',
        message: 'Por favor seleccione un almacen',
      })
    }
    if (!shippingCompanyId) {
      return ToastSweetAlert({
        mode: 'error',
        message: 'Por favor seleccione una empresa de logistica',
      })
    }
    try {
      const { data } = await changeToBilling({
        variables: {
          orderId: parseInt(_id),
          shippingCompayId: parseInt(shippingCompanyId),
        },
        refetchQueries: [
          {
            query: GET_PENDING_ORDERS,
            variables: {
              searchQuery: '',
              limit: null,
              offset: null,
              platform: null,
            },
          },
          { query: GET_BILLING_ORDERS },
          { query: GET_COUNTERS_ORDERS },
        ],
      })
      if (data.changeToBilling) {
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
    setStoreId(parseInt(e.value))
  }
  const handleShippingCompanyChange = (e) => {
    setShippingCompanyId(parseInt(e.value))
  }

  moment.locale('es') //Change dates languages to spanish

  return (
    <>
      {data?.getOrderById &&
        !loading &&
        !loadingStores &&
        !loadingShippingCompanies &&
        data?.getOrderById?.status?.id === 1 && (
          <>
            <ContentHeader
              title="Orden Pendiente"
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
                          id_store={storeId}
                          status={data?.getOrderById?.status?.id}
                          uberAssignedId={data?.getOrderById?.uber_id}
                          stores={dataStores?.getAllStores.rows}
                          shippingCompanies={
                            dataShippingCompanies?.getAllShippingCompanies
                          }
                          id_shippingCompany={shippingCompanyId}
                          status_id={data?.getOrderById?.status_id}
                          handleStoreChange={handleStoreChange}
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
                      processBtn={'Procesar'}
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

export default PendingOrdersNew
