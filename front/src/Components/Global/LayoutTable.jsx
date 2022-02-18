import React, { useEffect, useState, useContext } from 'react'
import DataTable from 'react-data-table-component'
import Loader from './Spinner'
import debounce from 'lodash.debounce'
import { ToastSweetAlert } from '../Helpers/ToastSweetAlert'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { AuthContext } from './../../Auth/AuthContext'
import { useLocation } from 'react-router'
import { EMPTY } from './../../graphql/Auth/auth'
import { useMutation } from '@apollo/client'
import { CSVLink } from 'react-csv'

export const LayoutTable = ({
  data = [],
  title,
  gql = EMPTY,
  requery = EMPTY,
  exportQuery = EMPTY,
  editText = <i className="fas fa-edit"></i>,
  details = false,
  platformSelector = false,
  totalCount,
  pagePagination,
  setPagePagination,
  loadingData,
}) => {
  const [columns, setColumns] = useState([])
  const [cell, setCell] = useState([])
  const [dataExported, setDataExported] = useState([])
  const [FileNameExported, setFileNameExported] = useState('')
  const [loadingExport, setLoadingExport] = useState(false)
  const location = useLocation()
  const [permissions, setPermissions] = useState({
    create: false,
    edit: false,
    erase: false,
    exportBtn: false,
    permissionsBtn: false,
    path: '',
  })
  const { create, edit, erase, exportBtn, permissionsBtn, path } = permissions
  const { user } = useContext(AuthContext)

  const [deleteItem] = useMutation(gql, {
    refetchQueries: [
      {
        query: requery,
        variables: { searchQuery: null, limit: 10, offset: 0, platform: null },
      },
    ],
  })

  const [exportItems] = useMutation(exportQuery)

  //SET PERMISSIONS
  useEffect(() => {
    const permissions = user?.userPermissions
    let listPermissions = []
    permissions.map((item) => {
      let moduleName = `${item?.module_info?.relative_link}`
      if (moduleName === location.pathname) {
        return (listPermissions = {
          create: item.access_retrieve,
          edit: item.access_edit,
          erase: item.access_delete,
          exportBtn: item.access_export,
          path: item.module_info.relative_link,
        })
      }
      return null
    })
    permissions.map((item) => {
      let submoduleName = item.submodule_info?.relative_link
      if (submoduleName) {
        if (location.pathname.includes('new')) {
          const relativePath = location.pathname
            .split('new')[0]
            .replace(/.$/, '')
          const relativePathSplit = relativePath.split('/')
          const submodulePath = relativePathSplit[relativePathSplit.length - 1]
          if (submoduleName === `/${submodulePath}`) {
            return (listPermissions = {
              create: item.access_retrieve,
              edit: item.access_edit,
              erase: item.access_delete,
              exportBtn: item.access_export,
              path: `${item.module_info.relative_link}/${submodulePath}`,
            })
          }
        }
        if (location.pathname.includes('edit')) {
          const relativePath = location.pathname
            .split('edit')[0]
            .replace(/.$/, '')
          const relativePathSplit = relativePath.split('/')
          const submodulePath = relativePathSplit[relativePathSplit.length - 1]
          if (submoduleName === `/${submodulePath}`) {
            return (listPermissions = {
              create: item.access_retrieve,
              edit: item.access_edit,
              erase: item.access_delete,
              exportBtn: item.access_export,
              path: `${item.module_info.relative_link}/${submodulePath}`,
            })
          }
        }
        const relativePathSplit = location.pathname.split('/')
        const submodulePath = relativePathSplit[relativePathSplit.length - 1]
        if (submoduleName === `/${submodulePath}`) {
          return (listPermissions = {
            create: item.access_retrieve,
            edit: item.access_edit,
            erase: item.access_delete,
            exportBtn: item.access_export,
            path: `${item.module_info.relative_link}/${submodulePath}`,
          })
        }
      }
      return true
    })
    if (location.pathname === '/catalog/users') {
      const checkBtnPermissions = permissions.some((permission) => {
        if (permission?.module_info.name === 'UsersPermissions') {
          if (permission?.access_read) {
            return true
          } else {
            return false
          }
        }
        return null
      })
      listPermissions.permissionsBtn = checkBtnPermissions
    }
    return setPermissions(listPermissions)
  }, [location.pathname, user])

  //SETTING DATA
  useEffect(() => {
    let columns = []
    setCell(data)
    if (data.length === 0) return
    Object.keys(data[0]).map((item) => {
      return columns.push({
        name: item,
        selector: (row) => row[item],
        sortable: true,
      })
    })

    columns.push({
      name: 'Acciones',
      button: true,
      cell: (row) => (
        <>
          <div className="btn-group btn-actions-table">
            <Link
              className="btn btn-accept btn-sm"
              to={`${path}/details/${row['id']}/show`}
            >
              Detalles
            </Link>
            {edit && (
              <Link
                className="btn btn-accept btn-sm"
                to={`${path}/edit/${row['id']}`}
              >
                {editText}
              </Link>
            )}

            {erase && (
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(row['id'])}
              >
                <i className="fas fas fa-trash"></i>
              </button>
            )}
            {permissionsBtn && (
              <Link
                className="btn btn-warning btn-sm"
                to={`${path}/permissions/edit/${row['id']}`}
              >
                <i className="fas fa-lock"></i>
              </Link>
            )}
          </div>
        </>
      ),
    })
    setColumns(columns)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data,
    edit,
    erase,
    permissionsBtn,
    path,
    loadingExport,
    dataExported,
    loadingData,
  ])

  //PAGINATION OPTIONS DATA TABLE
  const Options = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    // selectAllRowsItem: true,
    // selectAllRowsItemText: 'Todos',
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Eliminar registro?',
      text: 'Esta acción no se podra revertir',
      icon: 'warning',
      allowOutsideClick: false,
      buttonsStyling: false,
      showDenyButton: true,
      denyButtonText: '<i class="fas fa-times"> Cancelar</i>',
      confirmButtonText: '<i class="fas fa-minus-circle"> Eliminar</i>',
      customClass: {
        confirmButton: 'btn btn-sm btn-accept',
        denyButton: 'btn btn-sm btn-danger',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteItem({
            variables: {
              id: parseInt(id),
              userId: parseInt(user.idUser),
            },
          })
          return ToastSweetAlert({
            mode: 'ok',
            message: 'Registro eliminado',
          })
        } catch (error) {
          ToastSweetAlert({
            mode: 'errorModal',
            message: error.message,
          })
        }
      }
    })
  }

  //LOGIC FOR FILTER DATA
  const handleSearh = (value) => {
    const query = value.target.value.toLowerCase()
    if (!query) {
      setCell(data)
    }
    setPagePagination({
      limit: 10,
      offset: 0,
      searchQuery: query,
      platform: pagePagination?.platform,
    })
  }

  //LOGIC DATA PAGINATION
  const handlePageChange = (page) => {
    setPagePagination({
      ...pagePagination,
      limit: pagePagination.limit,
      offset: pagePagination.limit * (page - 1),
    })
  }

  const handlePerRowsChange = async (newPerPage) => {
    setPagePagination({ ...pagePagination, limit: newPerPage })
  }

  const getDataToExport = async () => {
    if (!loadingExport) {
      setLoadingExport(true)
      try {
        const dataExported = await exportItems()
        const nameOperation = exportQuery.definitions[0].name.value
        const camelCaseNameOperation =
          nameOperation.charAt(0).toLowerCase() + nameOperation.slice(1)
        const fileName = nameOperation.slice(6)
        setFileNameExported(fileName)
        setDataExported(dataExported.data[`${camelCaseNameOperation}`])
        document.getElementById('exportfileCSV').click()
        setLoadingExport(false)
        ToastSweetAlert({
          mode: 'ok',
          message: 'CSV Generado',
        })
      } catch (error) {
        setLoadingExport(false)
        ToastSweetAlert({
          mode: 'errorModal',
          message: error.message,
        })
      }
    }
  }

  return (
    <div className="card layout-configs">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <div className="control-btn-box">
          <>
            <div
              className="btn-group actions-btn"
              role="group"
              aria-label="Button group with nested dropdown"
            >
              <div className="btn-group" role="group">
                {exportBtn && (
                  <>
                    <button
                      id="btnGroupDrop1"
                      type="button"
                      className="btn btn-accept btn-sm"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      disabled={loadingExport}
                    >
                      <i className="fas fa-cloud-download-alt"></i>
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="btnGroupDrop1"
                    >
                      <>
                        <CSVLink
                          id="exportfileCSV"
                          filename={FileNameExported}
                          data={dataExported}
                          className="hide"
                        ></CSVLink>
                        <span
                          className="dropdown-item pointer"
                          onClick={getDataToExport}
                        >
                          <i className="fas fa-file-export"></i> Exportar CSV
                        </span>
                      </>
                    </div>
                  </>
                )}
              </div>

              {create && (
                <Link to={`${path}/new`} className="btn btn-accept btn-sm">
                  <i className="fa fa-plus"></i> Agregar Nuevo &nbsp;
                </Link>
              )}
            </div>
          </>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <DataTable
            columns={columns}
            data={cell}
            expandOnRowClicked
            fixedHeader
            fixedHeaderScrollHeight="600px"
            highlightOnHover
            pagination
            paginationComponentOptions={Options}
            pointerOnHover
            responsive
            striped
            subHeader
            subHeaderAlign="left"
            subHeaderWrap
            // actions={
            //   platformSelector && (
            //
            //     <div className="platform-selector">
            //       <div className="row">
            //         <div className="col-s6 mr-3">
            //           <i className="fa fa-filter"></i>
            //         </div>
            //         <div className="col-s6">
            //           <select
            //             className="form-control"
            //             type="select"
            //             onChange={(e) =>
            //               setPagePagination({
            //                 ...pagePagination,
            //                 platform: parseInt(e.target.value),
            //               })
            //             }
            //           >
            //             <option value="" disabled>
            //               Selecciona una opción
            //             </option>
            //             <option value="">Todas</option>
            //             <option value="1">Woocomerce</option>
            //             <option value="2">MercadoLibre</option>
            //             <option value="3">Amazon</option>
            //           </select>
            //         </div>
            //       </div>
            //     </div>
            //   )
            // }
            // subHeaderComponent={
            //   <div className="input-icons col-md-6 col-sm-12">
            //     <i className="fa fa-search icon"></i>
            //     <input
            //       type="text"
            //       className="input-field form-control position-searchInput"
            //       placeholder="Buscar"
            //       onChange={debounce(handleSearh, 300)}
            //     />
            //   </div>
            // }
            paginationServer
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            paginationTotalRows={totalCount}
            noDataComponent="No se encontraros datos"
            progressPending={loadingData}
            progressComponent={<Loader />}
          />
        </div>
      </div>
    </div>
  )
}
export default LayoutTable
