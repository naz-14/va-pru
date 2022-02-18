import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {
  DELETE_ROLE,
  GET_ROLES,
  EXPORT_ROLES,
} from '../../../../graphql/Catalog/Roles/roles'
import LayoutTable from '../../../Global/LayoutTable'
import ContentHeader from '../../../Layout/ContentHeader'
import { ToastSweetAlert } from '../../../Helpers/ToastSweetAlert'

export const Roles = () => {
  const [pagePagination, setPagePagination] = useState({
    searchQuery: null,
    limit: 10,
    offset: 0,
  })
  const [total, setTotal] = useState(0)
  const { loading, error, data } = useQuery(GET_ROLES, {
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
      data.getAllRoles.rows.map((item) => {
        return list.push({
          id: item.id,
          Nombre: item.role_name,
          Descripción: item.description,
        })
      })
      setDataToTable(list)
      setTotal(data.getAllRoles.count)
    }
  }, [loading, error, data])

  return (
    <>
      <ContentHeader
        title="Roles de usuario"
        breadcrumb="Roles"
        windowTitle="Roles"
      />
      <LayoutTable
        data={dataToTable}
        title="Lista de perfiles"
        gql={DELETE_ROLE}
        requery={GET_ROLES}
        exportQuery={EXPORT_ROLES}
        totalCount={total}
        pagePagination={pagePagination}
        setPagePagination={setPagePagination}
        loadingData={loading}
      />
    </>
  )
}

export default Roles
