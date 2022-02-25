import FileModel from '../models/Files/FileModel'
import shortid from 'shortid'
import moment from 'moment'
require('dotenv').config()
const S3 = require('aws-sdk/clients/s3')
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')

const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
const region = process.env.AWS_REGION
const bucketName = process.env.AWS_BUCKET_NAME

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
})

const s3Client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
})

export const UploadDocument = async ({
  file,
  userID,
  transaction,
  type,
  idFile = null,
  name = shortid(),
}: any) => {
  try {
    const { createReadStream, filename } = await file

    let folder = type.toLowerCase()
    if (type === 'jpg' || type === 'png' || type === 'jpeg' || type === 'img')
      folder = 'img'

    if (type === 'invoice') folder = 'invoice'

    const extension = filename.slice(
      ((filename.lastIndexOf('.') - 1) >>> 0) + 2
    )
    const fileName = `${folder}/${name}_${moment().format('YYYYMMDDhmmss')}.${
      extension === '' ? 'jpg' : extension
    }`

    const filesStream = createReadStream(fileName)

    const uploadParams = {
      Bucket: bucketName,
      Body: filesStream,
      Key: fileName,
    }
    const upload = await s3.upload(uploadParams).promise()

    if (idFile) {
      const fileCreated = await FileModel.update(
        {
          url: upload.key,
        },
        { where: { id: idFile } }
      )
      return fileCreated as any
    }

    const fileCreated = await FileModel.create(
      {
        url: upload.key,
        id_user_register: userID,
        is_active: true,
      },
      { transaction }
    )
    return fileCreated as any
  } catch (e) {
    await transaction.rollback()
    return false
  }
}

export const getFile = async (Key: any) => {
  const downloadParams = {
    Key: Key,
    Bucket: bucketName,
  }
  try {
    const command = new GetObjectCommand(downloadParams)
    const urlPresigned = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    })
    return urlPresigned
  } catch (e) {
    return false
  }
}

export const DeletePreviousFile = async ({ previous }: any) => {
  try {
    const deleteParams = {
      Key: previous,
      Bucket: bucketName,
    }

    if (previous === 'IMG/default.svg') {
      return true
    }

    await s3.deleteObject(deleteParams).promise()
    return true
  } catch (e) {
    return e
  }
}
