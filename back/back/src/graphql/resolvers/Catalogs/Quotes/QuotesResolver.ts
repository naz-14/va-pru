import sequelize from '../../../../db/connection';
import { Resolvers } from '../../../generated';
import Quote from '../../../../models/Catalogs/Quotes/QuoteModel';
import OrderStatus from '../../../../models/Catalogs/Orders/OrderStatusModel';

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const QuoteResolver: Resolvers = {
    Query:{
        getQuotes: async (_,{}) => {
            const clause: any = {
                where: {
                    is_active: 1,
                }
            }
            return await Quote.findAll(clause);  
        }
    },
    Mutation: {
        createQuote: async (_, { inputQuote }) => {
            const transaction = await sequelize.transaction()
            
            const {cardCode, cardName, docDate, docTime, docStatus, comments, whsCode} = inputQuote;
            try {
                /* CREATE NEW QUOTE */
                await Quote.create(
                    {
                        cardCode,
                        cardName,
                        docDate,
                        docTime,
                        docStatus,
                        comments,
                        whsCode,
                        is_active: true,
                    },
                    { transaction }
                  )

                await transaction.commit()
                return true
            } catch (error) {
                await transaction.rollback()
                return Promise.reject(Error(defaultError))
            }
        },
        getInfoProvider: async (_, { inputProvider }) => {//API SAP
            const transaction = await sequelize.transaction()
            
            const {cardCode, cardName} = inputProvider;
            try {

                await transaction.commit()
                return true
            } catch (error) {
                await transaction.rollback()
                return Promise.reject(Error(defaultError))
            }
        },
    },
    quotesData:{
        status: async ({docStatus}) => {
            return await OrderStatus.findOne({ where: { id: docStatus } })
        },
    }
}

export default QuoteResolver;