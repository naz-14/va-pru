import { Resolvers } from '../../../generated';
import DocumentStatus from '../../../../models/Catalogs/Documents/DocumentStatusModel';

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const StatusResolver: Resolvers = {
    Query:{
        getDocumentStatus: async () => {
            const clause: any = {
                where: {
                    is_active: 1,
                }
            }
            return await DocumentStatus.findAll(clause);  
        }
    },
}

export default StatusResolver;