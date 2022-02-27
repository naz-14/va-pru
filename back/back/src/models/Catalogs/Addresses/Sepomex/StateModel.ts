import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface StateAttributes {
  id: number
  name: string
  id_country: number
  is_active: boolean
}

interface StateCreationAttributes extends Optional<StateAttributes, 'id'> {}

class State
  extends Model<StateAttributes, StateCreationAttributes>
  implements StateAttributes
{
  public id!: number
  public name!: string
  public id_country!: number
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

State.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    id_country: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'catalog_states',
  }
)

export default State
