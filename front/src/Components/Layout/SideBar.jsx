/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Avatar from './../../Assets/Images/avatar-default.svg'
import NavItem from './NavItem'
import { Link } from 'react-router-dom'
import { ToastSweetAlert } from '../Helpers/ToastSweetAlert'
import { GET_COUNTERS_ORDERS } from '../../graphql/Catalog/Orders/countOrders'

export const SideBar = ({
  prefixIcon = 'fas fa-',
  user = 'User',
  iconApp,
  logoIcon,
  avatar = Avatar,
  modules = [],
}) => {
  const [menu, setMenu] = useState([])
  const [badges, setBadges] = useState([])
   const {
    data,
    loading,
    error,
  } = useQuery(GET_COUNTERS_ORDERS)

  useEffect(() => {
    let listModule = []
    modules.map((item) => {
      const module = item
      const submodule = item.submodule_info
      if (submodule <= 0) {
        if (
          !module.module_info.relative_link.includes('?') &&
          module?.access_read &&
          item?.module_info.name !== 'UserProfileMain'
        ) {
          listModule.push({
            name: module.module_info?.name,
            label: module.module_info?.front_label,
            link: module.module_info?.relative_link,
            icon: module.module_info?.icon,
            submodule: null,
          })
        }
      } else {
        let exists = listModule.find(
          (item) => item.name === module.module_info.name
        )

        let listSubmodule = []

        modules.map((item) => {
          if (module?.module_info?.name === item?.module_info?.name) {
            if (
              !item.submodule_info?.relative_link.includes('?') &&
              item?.access_read
            ) {
              listSubmodule.push({
                name: item.submodule_info?.name,
                label: item.submodule_info?.front_label,
                link: item.submodule_info?.relative_link,
                icon: item.submodule_info?.icon,
              })
            }
          }
          return null
        })
        if (!exists) {
          listModule.push({
            name: module.module_info?.name,
            label: module.module_info?.front_label,
            link: module.module_info?.relative_link,
            icon: module.module_info?.icon,
            submodule: listSubmodule,
          })
        }
      }
      return null
    })
    setMenu(listModule)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modules])

  useEffect(() => {
    if (!loading) {
      if (error)
        return ToastSweetAlert({
          mode: 'errorModal',
          message: error.message,
        })
      setBadges(data.getAllCounters)
    }
  },[data, loading, error])

  return (
    // <!-- Main Sidebar Container -->
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* <!-- Brand Logo --> */}
      <Link to="/dashboard" className="brand-link logo-switch">
        <img src={logoIcon} alt="Logo Small" className="brand-image logo-xs" />
        <img src={iconApp} alt="Logo Large" className="brand-image logo-xl" />
      </Link>

      {/* <!-- Sidebar --> */}
      <div className="sidebar">
        {/* <!-- Sidebar user panel (optional) --> */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image  container-pic">
            <img
              src={avatar}
              className="img-circle avatar-preview elevation-2"
              alt="User"
            />
          </div>
          <div className="info">
            <Link to={'/profile'} className="d-block">
              {user}
            </Link>
          </div>
        </div>
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* <!-- Add icons to the links using the .nav-icon className */}
            {/* with font-awesome or any other icon font library --> */}

            <NavItem to="/dashboard" icon="fas fa-home" label="Dashboard" />
            {menu.map((item, idx) => {
              if (!item.submodule) {
                return (
                  <NavItem
                    key={`${idx}${item.link}`}
                    to={`${item.link}`}
                    icon={`${prefixIcon}${item?.icon}`}
                    label={item.label}
                  />
                )
              } else {
                return (
                  <NavItem
                    id={idx}
                    key={`${idx}${item.link}`}
                    to={item.link}
                    icon={`${prefixIcon}${item?.icon}`}
                    label={item.label}
                    multiLevel={item.submodule.map((itemSubmodule) => {
                      return {
                        label: itemSubmodule.label,
                        icon: `${prefixIcon}${itemSubmodule?.icon}`,
                        to: `${item.link}${itemSubmodule.link}`,
                        badge:
                          itemSubmodule.name === 'PendingOrders'
                            ? badges.pendings
                            : itemSubmodule.name === 'InProcessOrders'
                            ? badges.processing
                            : itemSubmodule.name === 'BillingOrders'
                            ? badges.billing
                            : itemSubmodule.name === 'ToStockOrders'
                            ? badges.toSupply
                            : itemSubmodule.name === 'LocalShippingOrders'
                            ? badges.localShipping
                            : itemSubmodule.name === 'NationalShippingOrders'
                            ? badges.nationalShipping
                            : itemSubmodule.name === 'ShippedOrders'
                            ? badges.complete
                            : itemSubmodule.name === 'RejectedOrders'
                            ? badges.rejected
                            : itemSubmodule.name === 'InRouteOrders'
                            ? badges.route
                            : itemSubmodule.name === 'CollectOrders'
                            ? badges.collect
                            : false,
                      }
                    })}
                  />
                )
              }
            })}
          </ul>
        </nav>
        {/* <!-- /.sidebar-menu --> */}
      </div>
      {/* <!-- /.sidebar --> */}
    </aside>
  )
}

export default SideBar
