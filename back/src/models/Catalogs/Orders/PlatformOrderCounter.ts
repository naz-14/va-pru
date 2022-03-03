import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface PlatformOrderCounterAttributes {
  id: number
  count: number
  is_active: boolean
}

interface PlatformOrderCounterCreationAttributes
  extends Optional<PlatformOrderCounterAttributes, 'id'> {}

class PlatformOrderCounter
  extends Model<
    PlatformOrderCounterAttributes,
    PlatformOrderCounterCreationAttributes
  >
  implements PlatformOrderCounterAttributes
{
  public id!: number
  public count!: number
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

PlatformOrderCounter.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'platform_order_counter',
  }
)

export default PlatformOrderCounter
