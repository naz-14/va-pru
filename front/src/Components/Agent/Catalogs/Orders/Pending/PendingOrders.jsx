import { useQuery } from '@apollo/client'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import {
  GET_PENDING_ORDERS,
  EXPORT_PENDING_ORDERS,
} from '../../../../../graphql/Catalog/Orders/pendingOrders'
import LayoutTable from '../../../../Global/LayoutTable'
import { ToastSweetAlert } from '../../../../Helpers/ToastSweetAlert'
import ContentHeader from '../../../../Layout/ContentHeader'

const PendingOrders = () => {
  const [pagePagination, setPagePagination] = useState({
    searchQuery: null,
    limit: 10,
    offset: 0,
    platform: null,
  })
  const [total, setTotal] = useState(0)
  const { loading, error, data } = useQuery(GET_PENDING_ORDERS, {
    variables: {
      searchQuery: pagePagination.searchQuery,
      limit: pagePagination.limit,
      offset: pagePagination.offset,
      platform: pagePagination.platform,
    },
  })
  const [dataToTable, setDataToTable] = useState([])
  useEffect(() => {
    if (!loading) {
      if (error)
        return ToastSweetAlert({
          mode: 'errorModal',
          message: error.message,
        })
      let list = data.getPendingOrders.rows.map((order) => {
        return {
          id: order.id,
          'Hora y fecha':
            moment(order?.order_date).format('L') +
              ', ' +
              moment(order?.order_date).format('LT') || '--',
          Plataforma: order.platform.name,
          Tipo: order.type?.name,
          'Plataforma de cobro': order.payment?.platform,
          'No. de cobro': order.payment?.payment_id,
          Cliente: `${order.shipping.first_name} ${order.shipping.last_name}`,
          'Numero de venta': order.order_id,
          Tienda: order?.store?.name || order?.warehouse?.name || '--',
        }
      })
      setTotal(data.getPendingOrders.count)
      setDataToTable(list)
    }
  }, [loading, error, data])
  console.log(loading, data)
  return (
    <>
      <ContentHeader
        title="Pedidos"
        breadcrumb="Pedidos Pendientes"
        windowTitle="Pendientes"
      />
      <LayoutTable
        data={dataToTable}
        title="Pendientes"
        requery={GET_PENDING_ORDERS}
        editText={'Tomar Orden'}
        exportQuery={EXPORT_PENDING_ORDERS}
        platformSelector={true}
        totalCount={total}
        pagePagination={pagePagination}
        setPagePagination={setPagePagination}
        loadingData={loading}
      />
    </>
  )
}

export default PendingOrders
