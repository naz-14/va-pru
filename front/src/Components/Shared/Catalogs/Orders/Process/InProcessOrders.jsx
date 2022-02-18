import React, { useEffect, useState } from 'react'
import moment from 'moment'

import LayoutTable from '../../../../Global/LayoutTable'
import { ToastSweetAlert } from '../../../../Helpers/ToastSweetAlert'
import ContentHeader from '../../../../Layout/ContentHeader'
import { useQuery } from '@apollo/client'

/* DATA */
import { GET_IN_PROCESS_ORDERS } from '../../../../../graphql/Catalog/Orders/inProcessOrders'

const InProcessOrder = () => {
  const [pagePagination, setPagePagination] = useState({
    searchQuery: null,
    limit: 10,
    offset: 0,
    platform: null,
  })
  const [total, setTotal] = useState(0)
  const { loading, error, data } = useQuery(GET_IN_PROCESS_ORDERS, {
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

      const list = data.getInProcessOrders.rows.map((order) => {
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
      setTotal(data.getInProcessOrders.count)
      setDataToTable(list)
    }
  }, [loading, error, data])

  return (
    <>
      <ContentHeader
        title="En proceso"
        breadcrumb="Pedidos en proceso"
        windowTitle="En proceso"
      />
      <LayoutTable
        data={dataToTable}
        title="Proceso"
        requery={GET_IN_PROCESS_ORDERS}
        editText={'Tomar Orden'}
        totalCount={total}
        pagePagination={pagePagination}
        setPagePagination={setPagePagination}
        platformSelector={true}
        loadingData={loading}
      />
    </>
  )
}

export default InProcessOrder
