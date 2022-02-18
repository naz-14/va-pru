import React, { useContext, useEffect, useState } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import Footer from './Footer'
import { AuthContext } from './../../Auth/AuthContext'
import { useQuery } from '@apollo/client'
import { APP_CONFIG } from '../../graphql/Auth/auth'
import { GET_USER_BY_ID } from '../../graphql/Catalog/Users/user'

export const LayoutLogged = ({ children }) => {
  const { user } = useContext(AuthContext)
  const { data: dataAvatar } = useQuery(GET_USER_BY_ID, {
    variables: {
      getUserByIdId: parseInt(user.idUser),
    },
  })
  const [dataSys, setDataSys] = useState({
    appLogo: '',
    appName: '',
    appMiniLogo: '',
    appFavicon: '',
  })

  const { loading, error, data } = useQuery(APP_CONFIG)

  //LOAD SYSCONFIG
  useEffect(() => {
    if (!loading) {
      if (data !== undefined || data == null) {
        if (error) return
        setDataSys({
          appLogo: data.getConfigSys.project_logo,
          appName: data.getConfigSys.project_name,
          appMiniLogo: data.getConfigSys.project_mini_logo,
          appFavicon: data.getConfigSys.project_favicon,
        })
        localStorage.setItem('configSys', JSON.stringify(data.getConfigSys))

        let headTitle = document.querySelector('head')
        let setFavicon = document.createElement('link')
        setFavicon.setAttribute('rel', 'icon')
        setFavicon.setAttribute('href', `${data.getConfigSys.project_favicon}`)
        headTitle.appendChild(setFavicon)
      }
    }
  }, [loading, error, data])
  return (
    <div className="wrapper">
      <Header />
      <SideBar
        titleApp={dataSys.appName}
        prefixIcon="fas fa-"
        iconApp={dataSys.appLogo}
        logoIcon={dataSys.appMiniLogo}
        user={user.name}
        avatar={dataAvatar ? dataAvatar?.GetUserById.avatar.url : null}
        modules={user.userPermissions}
      />
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="content-fade">{children}</div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default LayoutLogged
