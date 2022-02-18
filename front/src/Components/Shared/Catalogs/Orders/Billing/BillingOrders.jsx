import React, { useEffect, useState } from 'react'
import moment from 'moment'

import LayoutTable from '../../../../Global/LayoutTable'
import { ToastSweetAlert } from '../../../../Helpers/ToastSweetAlert'
import ContentHeader from '../../../../Layout/ContentHeader'
import { useQuery } from '@apollo/client'

/* DATA */
import { GET_BILLING_ORDERS } from '../../../../../graphql/Catalog/Orders/billingOrders'

const BillingOrders = () => {
  const [pagePagination, setPagePagination] = useState({
    searchQuery: null,
    limit: 10,
    offset: 0,
    platform: null,
  })
  const [total, setTotal] = useState(0)
  const { loading, error, data } = useQuery(GET_BILLING_ORDERS, {
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

      const list = data.getBillingOrders.rows.map((order) => {
        return {
          id: order.id ? order.id : '--',
          'Hora y fecha':
            moment(order?.order_date).format('L') +
              ', ' +
              moment(order?.order_date).format('LT') || '--',
          Plataforma: order.platform?.name || '--',
          Tipo: order.type?.name || '--',
          'Plataforma de cobro': order.payment?.platform || '--',
          'No. de cobro': order.payment?.payment_id || '--',
          Cliente: `${order.shipping?.first_name} ${order.shipping?.last_name}`,
          'Numero de venta': order.order_id ? order.order_id : '--',
          Tienda: order?.store?.name || order?.warehouse?.name || '--',
        }
      })
      setTotal(data.getBillingOrders.count)
      setDataToTable(list)
    }
  }, [loading, error, data])

  return (
    <>
      <ContentHeader
        title="Facturacion"
        breadcrumb="Pedidos Facturacion"
        windowTitle="Facturacion"
      />
      <LayoutTable
        data={dataToTable}
        title="Facturacion"
        requery={GET_BILLING_ORDERS}
        editText={'Detalles'}
        totalCount={total}
        pagePagination={pagePagination}
        setPagePagination={setPagePagination}
        platformSelector={true}
        loadingData={loading}
      />
    </>
  )
}

export default BillingOrders
