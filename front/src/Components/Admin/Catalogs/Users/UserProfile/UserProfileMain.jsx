import { useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import { AuthContext } from '../../../../../Auth/AuthContext'
import { GET_USER_BY_ID } from '../../../../../graphql/Catalog/Users/user'
import ContentHeader from '../../../../Layout/ContentHeader'
import { Sidebar } from './Sidebar'
import { UserInfo } from './UserInfo'

export const UserProfileMain = () => {
  const { user } = useContext(AuthContext)
  const { data } = useQuery(GET_USER_BY_ID, {
    variables: {
      getUserByIdId: parseInt(user.idUser),
    },
  })
  return (
    <>
      <ContentHeader
        title="Perfil de usuario"
        breadcrumb="Perfil"
        windowTitle="Perfil"
      />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {data && (
              <>
                <Sidebar info={data} user={user} />
                <UserInfo info={data} />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
