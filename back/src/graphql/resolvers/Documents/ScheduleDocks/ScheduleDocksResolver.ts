import sequelize from '../../../../db/connection'
import { Resolvers } from '../../../generated'
import { ApiSapReceiver } from '../../../../helpers/ApiSapReceiver'

import ScheduleDocks from '../../../../models/Documents/ScheduleDocks/ScheduleDocksModel'
import Docks from '../../../../models/Catalogs/Docks/DocksModel'

const defaultError = 'Algo salio mal, vuelve a intentar en unos minutos'


const ScheduleDocksResolver: Resolvers = {
  Query: {
  },
  Mutation:{
    getScheduleDocksByScheduleId: async (_, {scheduleId}) => {
      const clause: any = {
        where: {
          schedule_id: scheduleId,
          is_active: 1,
        },
      }

      return await ScheduleDocks.findAll(clause)
    },
  },
  ScheduleDocks:{
    dock: async ({ dock_id }) => {
        return await Docks.findOne({ where: { id: dock_id } })
    },
  },
}
export default ScheduleDocksResolver
