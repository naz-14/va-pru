import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_ROLE_BY_ID } from '../../../../../graphql/Catalog/Roles/roles'
import InputController from '../../../../Global/InputController'
import { useForm } from 'react-hook-form'

export const Sidebar = ({ info, user }) => {
  const [previewPic, setPreviewPic] = useState(null)
  const { data } = useQuery(GET_ROLE_BY_ID, {
    variables: { getOneRoleId: parseInt(user.role) },
  })
  const [roleName, setRoleName] = useState('')
  const [description, setDescription] = useState('')

  const { control } = useForm()

  useEffect(() => {
    if (info) {
      setPreviewPic(info.GetUserById.avatar.url)
    }
  }, [info])

  useEffect(() => {
    if (data) {
      const { role_name, description } = data.getOneRole
      setRoleName(role_name)
      setDescription(description)
    }
  }, [data])

  return (
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="card card-primary card-outline">
        <div className="card-body box-profile">
          <div className="text-center container-upload">
            <form>
              <InputController
                label="Avatar"
                inputType="imageAutoSend"
                userId={user.idUser}
                name="avatar"
                previewPic={previewPic}
                validateFormat="imageAvatar"
                validateFormatMsg="Solo se admite JPG, JPEG y PNG"
                formatAccept="image/png, image/jpg, image/jpeg"
                control={control}
              />
            </form>
          </div>

          <h3 className="profile-username text-center">{user.name}</h3>

          <p className="text-muted text-center">
            <b>{roleName} </b>
            <br />
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
