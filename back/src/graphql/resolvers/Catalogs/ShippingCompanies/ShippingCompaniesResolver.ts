import ShippingCompaniesModel from '../../../../models/Catalogs/ShippingCompanies/ShippingCompanies';
import { Resolvers } from '../../../generated';

const ShippingCompanies: Resolvers = {
  Query:{
    getAllShippingCompanies: async (_,{}) =>{
      const clause: any = {
        where: {
          is_active: 1,
        },
      }
      
      return await ShippingCompaniesModel.findAll(clause)  
    },
  },
}

export default ShippingCompanies;