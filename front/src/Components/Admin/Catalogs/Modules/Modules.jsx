import React, { useEffect, useState } from 'react'
import ContentHeader from '../../../../Components/Layout/ContentHeader'
import LayoutTable from '../../../../Components/Global/LayoutTable'
import { useQuery } from '@apollo/client'
import {
  ALL_MODULES,
  DELETE_MODULE,
  EXPORT_MODULES,
} from '../../../../graphql/Catalog/Modules/modules'
import { ToastSweetAlert } from '../../../Helpers/ToastSweetAlert'

export const Modules = () => {
  const [pagePagination, setPagePagination] = useState({
    searchQuery: null,
    limit: 10,
    offset: 0,
  })
  const [total, setTotal] = useState(0)
  const { loading, error, data } = useQuery(ALL_MODULES, {
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
      data.getAllModules.rows.map((item) => {
        return list.push({
          id: item.id,
          'Nombre módulo': item.name,
          Etiqueta: item.front_label,
          Link: item.relative_link,
          Icono: <i className={`fas fa-${item.icon}`}></i>,
          Submodulos: item.submodules.length,
        })
      })
      setDataToTable(list)
      setTotal(data.getAllModules.count)
    }
  }, [loading, error, data])
  return (
    <>
      <ContentHeader
        title="Control de módulos"
        breadcrumb="Módulos"
        windowTitle="Módulos"
      />
      <LayoutTable
        data={dataToTable}
        title="Lista de módulos"
        gql={DELETE_MODULE}
        requery={ALL_MODULES}
        exportQuery={EXPORT_MODULES}
        totalCount={total}
        pagePagination={pagePagination}
        setPagePagination={setPagePagination}
        loadingData={loading}
      />
    </>
  )
}

export default Modules
