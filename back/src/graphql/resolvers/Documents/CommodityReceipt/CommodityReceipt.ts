import sequelize from '../../../../db/connection'
import SapPurchasesOrders from '../../../../models/Catalogs/SAP/PurchasesOrders/SapPurchasesOrdersModel'
import SapPurchasesOrdersLines from '../../../../models/Catalogs/SAP/PurchasesOrdersLines/SapPurchasesOrdersLinesModel'
import CommodityReceipt from '../../../../models/Documents/CommodityReceipt/CommodityReceipt'
import Schedule from '../../../../models/Documents/Schedule/ScheduleModel'
import { Resolvers } from '../../../generated'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const CommodityReceiptResolver: Resolvers = {
    Query: {
        getAllCommodityReceipt: async (_, {}, context) => {
            const clause: any = {
                where: {
                    is_active: 1
                },
            }
            return await CommodityReceipt.findAll(clause)
        },
    },
    Mutation:{
        createCommodityReceipt: async (_,{ commodityReceiptInput }, context) => {
            const transaction = await sequelize.transaction()
            try {
                for (const item of commodityReceiptInput) {
                    const scheduleExists = await Schedule.findOne({
                        where: {
                            id: item.scheduleId,
                            is_active: true,
                        },
                        transaction
                    })
                    if (!scheduleExists) {
                        await transaction.rollback()
                        return Promise.reject(Error('scheduleId no existe'))
                    }
                    if (scheduleExists.document_status_id !== 1) {
                        await transaction.rollback()
                        return Promise.reject(Error('Cita no disponible'))
                    }
                    const purchasesOrdersExists = await SapPurchasesOrders.findOne({
                        where: {
                            id: item.purchasesOrdersId,
                            is_active: true,
                        },
                        transaction,
                    })
                    if (!purchasesOrdersExists) {
                        await transaction.rollback()
                        return Promise.reject(Error('purchasesOrdersId no existe'))
                    }
                    const ordersLinesExists = await SapPurchasesOrdersLines.findOne({
                        where: {
                            id: item.purchasesOrdersLinesId,
                            is_active: true,
                        },
                        transaction,
                    })
                    if (!ordersLinesExists) {
                        await transaction.rollback()
                        return Promise.reject(Error('purchasesOrdersLinesId no existe'))
                    }
                    scheduleExists.document_status_id = 2;
                    await scheduleExists.save()
                    await CommodityReceipt.create(
                        {
                            schedule_id: item.scheduleId, 
                            sap_purchases_orders_id: item.purchasesOrdersId, 
                            sap_purchases_orders_lines_id: item.purchasesOrdersLinesId, 
                            receipt_quantity: item.quantity,
                            id_user: context.userId,
                            is_active: true,
                        },
                        { transaction }
                    )
                }
                await transaction.commit()
                return true
            } catch (error) {
                await transaction.rollback()
                return Promise.reject(Error(defaultError))
            }
        }
    },
    commodityReceipt: {
        // schedules: async ({ schedule_id }) => {
        //     return await Schedule.findOne({
        //         where: {
        //             id: schedule_id,
        //         },
        //     })
        // },
        // purchases_orders: async ({ purchases_orders_id }) => {
        //     return await SapPurchasesOrders.findOne({
        //         where: {
        //             id: purchases_orders_id,
        //         },
        //     })
        // },
        // purchases_orders_lines: async ({ purchases_orders_lines_id }) => {
        //     return await SapPurchasesOrdersLines.findOne({
        //         where: {
        //             id: purchases_orders_lines_id,
        //         },
        //     })
        // },
    }
}

export default CommodityReceiptResolver
