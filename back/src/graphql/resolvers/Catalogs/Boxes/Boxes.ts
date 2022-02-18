import BoxesModel from '../../../../models/Catalogs/Boxes/BoxesModel';
import { Resolvers } from '../../../generated';

const Boxes: Resolvers = {
    Query:{
        getAllBoxes: async (_,{}) =>{
            const clause: any = {
                where: {
                is_active: 1,
                },
            }
        
            return await BoxesModel.findAll(clause)  
        },
    },
}

export default Boxes;