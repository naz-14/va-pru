import React, { useEffect, useState } from 'react'
import ContentHeader from '../../../../Components/Layout/ContentHeader'
import LayoutTable from '../../../../Components/Global/LayoutTable'
import { useQuery } from '@apollo/client'
import { ToastSweetAlert } from '../../../Helpers/ToastSweetAlert'
import {
  DELETE_USER_APP,
  GET_ALL_USERS_APP,
} from '../../../../graphql/Catalog/UsersApp/usersApp'

const UsersApp = () => {
  const [pagePagination, setPagePagination] = useState({
    searchQuery: null,
    limit: 10,
    offset: 0,
  })
  const [total, setTotal] = useState(0)
  const { loading, error, data } = useQuery(GET_ALL_USERS_APP, {
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
      data.getAllAppUsers.rows.map((item) => {
        return list.push({
          id: item.id,
          Nombre: item.name,
          'Apellido Paterno': item.first_name,
          'Apellido Materno': item.last_name,
          Usuario: item.username,
        })
      })
      setDataToTable(list)
      setTotal(data.getAllAppUsers.count)
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
        gql={DELETE_USER_APP}
        requery={GET_ALL_USERS_APP}
        exportQuery={DELETE_USER_APP}
        totalCount={total}
        pagePagination={pagePagination}
        setPagePagination={setPagePagination}
      />
    </>
  )
}
export default UsersApp
