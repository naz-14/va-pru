import sequelize from '../../../../../db/connection'
import { Op } from 'sequelize'
import { Resolvers } from '../../../../generated'
import TransferRequestModel from '../../../../../models/Catalogs/SAP/Transfers/SapInventoryTransfersRequestModel'
import TransferRequestLineModel from '../../../../../models/Catalogs/SAP/Transfers/SapInventoryTransferLineModel'
import moment from 'moment'
import ApiSapReceiver from '../../../../../helpers/ApiSapReceiver'

const TransferRequestExist = 'Ya existe un registro con este nombre'
const TransferRequestNotExist = 'El registro no existe'
const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const SapTransferRequestResolver: Resolvers = {
  Query: {
    getAllTransferRequest: async (_, { searchQuery, limit, offset }) => {
      try {
        const clause: any = {
          where: {
            is_active: true,
          },
        }

        if (limit !== null && offset !== null) {
          clause.offset = offset
          clause.limit = limit
        }

        if (searchQuery) {
          clause.where[Op.or] = [
            // { document_date_sap: { [Op.like]: `%${searchQuery}%` } },
            // { warehouse_code_sap: { [Op.like]: `%${searchQuery}%` } },
          ]
        }

        return Promise.resolve(
          await TransferRequestModel.findAndCountAll(clause)
        )
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
    getOneTransferRequest: async (_, { id }) => {
      try {
        const TransferRequestExist = await TransferRequestModel.findOne({
          where: { id, is_active: true },
        })
        if (!TransferRequestExist) {
          return Promise.reject(Error(TransferRequestNotExist))
        }
        return await TransferRequestModel.findByPk(id)
      } catch (error) {
        return Promise.reject(Error(defaultError))
      }
    },
  },
  Mutation: {
    createTransferRequest: async (
      _,
      { inputTransferRequest, inputProducts }
    ) => {
      const transaction = await sequelize.transaction() //START TRANSACTION
      try {
        //HERE GOES THE SAP REQUEST FOR THE TRANSFER
        // const requestTransferSAP = true

        const { doc_date, comments, from_whs_code, to_whs_code } =
          inputTransferRequest

        const newTransferRequest = await TransferRequestModel.create(
          {
            doc_date,
            doc_due_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            comments,
            from_whs_code,
            status: 1,
            to_whs_code,
            is_active: true,
          },
          { transaction }
        )

        inputProducts.map(async (product) => {
          const { item_code, quantity, open_quantity } = product as any

          await TransferRequestLineModel.create(
            {
              inventory_transfer_id: newTransferRequest.id,
              item_code,
              quantity,
              open_quantity,
            },
            { transaction }
          )
        })

        const requestTransferSAP = await ApiSapReceiver([
          {
            key: newTransferRequest.id,
            name: 'createInventoryTransferRequest',
            values: { id: newTransferRequest.id },
          },
        ])

        if (requestTransferSAP) {
          await transaction.rollback()
          return Promise.reject(Error(requestTransferSAP))
        }

        await transaction.commit()

        return newTransferRequest
      } catch (error) {
        await transaction.rollback()
        console.log(error)
        return Promise.reject(Error(defaultError))
      }
    },
  },
}
export default SapTransferRequestResolver
