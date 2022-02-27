import sequelize from '../../../../db/connection';
import IssussesModel from '../../../../models/Catalogs/Issusses/IssussesModel';
import Reasons from '../../../../models/Catalogs/Reason/ReasonModel';
import { Resolvers } from '../../../generated';

const IssussesResolver: Resolvers = {
    Query:{
        getAllIssusses: async (_,{}) => {
            const clause: any = {
                where: {
                    is_active: 1,
                }
            }
            return await IssussesModel.findAll(clause);  
        }
    },
}

export default IssussesResolver;