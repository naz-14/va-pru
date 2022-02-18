import FileModel from '../models/Files/FileModel'
import path from 'path'
import fs from 'fs'
import shortid from 'shortid'
import moment from 'moment'

export const UploadFile = async ({
  file,
  type,
  userID,
  transaction,
  typeRequest,
}: any) => {
  try {
    const { createReadStream, mimetype, filename } = await file

    if (!mimetype.includes('image')) {
      return false
    }
    const extension = filename.slice(
      ((filename.lastIndexOf('.') - 1) >>> 0) + 2
    )
    const fileName = `${type}_${shortid()}_${moment().format(
      'YYYYMMDDhmmss'
    )}.${extension}`
    const stream = createReadStream()
    const pathName = path.join(
      __dirname,
      `./../../public/files/${fileName}${
        mimetype.includes('image') ? 'jpg' : null
      }`
    )
    await stream.pipe(fs.createWriteStream(pathName))

    const upload = await FileModel.create(
      {
        url: `http://localhost:4000/files/${fileName}${
          mimetype.includes('image') ? 'jpg' : null
        }`,
        id_user_register: userID,
        is_active: true,
      },
      { transaction }
    )
    return upload
  } catch (e) {
    return false
  }
}

export const UploadDoc = async ({ file, type, userID, transaction }: any) => {
  try {
    const { createReadStream, mimetype, filename } = await file

    let folder = type.toUpperCase()
    if (type === 'jpg' || type === 'png' || type === 'jpeg') folder = 'IMG'

    const extension = filename.slice(
      ((filename.lastIndexOf('.') - 1) >>> 0) + 2
    )
    const fileName = `${shortid()}_${moment().format(
      'YYYYMMDDhmmss'
    )}.${extension}`
    const stream = createReadStream()
    const pathName = path.join(
      __dirname,
      `./../../public/files/${folder}/${fileName}`
    )
    await stream.pipe(fs.createWriteStream(pathName))

    const upload = await FileModel.create(
      {
        url: `http://localhost:4000/files/${folder}/${fileName}`,
        id_user_register: userID,
        is_active: true,
      },
      { transaction }
    )
    return upload
  } catch (e) {
    return false
  }
}

export const CleanPreviousFile = async ({ previous }: any) => {
  try {
    if (previous === 'default.svg') {
      return
    }
    const indexRename = previous.indexOf('/files/')
    const rename = previous.slice(indexRename + 7)
    const pathName = path.join(__dirname, `./../../public/files/${rename}`)
    fs.unlinkSync(pathName)
    return true
  } catch (e) {
    return false
  }
}
