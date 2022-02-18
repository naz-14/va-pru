import { gql } from '@apollo/client'

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`

export const UPLOAD_MULTIPLE_FILES = gql`
  mutation UploadMultipleFile($file: [Upload!]!) {
    uploadMultipleFile(file: $file) {
      url
    }
  }
`
export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      url
    }
  }
`

export const UPLOAD_MULTIPLE_IMAGES = gql`
  mutation UploadMultipleImage($file: [Upload!]!) {
    uploadMultipleImage(file: $file) {
      url
    }
  }
`

export const UPDATE_AVATAR = gql`
mutation AvatarUpdate($idUser: Int!, $avatar: Upload!) {
  avatarUpdate(id_user: $idUser, avatar: $avatar)
}
`
