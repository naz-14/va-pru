import Docks from '../../../../models/Catalogs/Docks/DocksModel';
import { Resolvers } from '../../../generated';

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'

const DocksResolver: Resolvers = {
    Query:{
        getDocks: async () => {
            const clause: any = {
                where: {
                    is_active: 1,
                }
            }
            return await Docks.findAll(clause);  
        }
    },
}

export default DocksResolver;