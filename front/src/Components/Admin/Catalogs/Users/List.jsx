import React, { useEffect, useState } from 'react'
import ContentHeader from '../../../../Components/Layout/ContentHeader'
import LayoutTable from '../../../../Components/Global/LayoutTable'
import { useQuery } from '@apollo/client'
import {
  GET_USERS,
  DELETE_USER,
  EXPORT_USERS,
} from '../../../../graphql/Catalog/Users/user'
import { ToastSweetAlert } from '../../../Helpers/ToastSweetAlert'

const List = () => {
  const [pagePagination, setPagePagination] = useState({
    searchQuery: null,
    limit: 10,
    offset: 0,
  })
  const [total, setTotal] = useState(0)
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      searchQuery: pagePagination.searchQuery,
      limit: pagePagination.limit,
      offset: pagePagination.offset,
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
      let list = []
      data.Users.rows.map((item) => {
        return list.push({
          id: item.id,
          Nombre: item.name,
          'Apellido Paterno': item.first_name,
          'Apellido Materno': item.last_name,
          Usuario: item.user_name,
        })
      })
      setDataToTable(list)
      setTotal(data.Users.count)
    }
  }, [loading, error, data])

  return (
    <>
      <ContentHeader
        title="Control de usuarios"
        breadcrumb="Usuarios"
        windowTitle="Usuarios"
      />
      <LayoutTable
        data={dataToTable}
        title="Lista de usuarios"
        gql={DELETE_USER}
        requery={GET_USERS}
        exportQuery={EXPORT_USERS}
        totalCount={total}
        pagePagination={pagePagination}
        setPagePagination={setPagePagination}
        loadingData={loading}
      />
    </>
  )
}
export default List
