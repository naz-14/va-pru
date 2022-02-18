import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface StoreAttributes {
  id: number
  name: string
  uber_id: string
  phone: string
  address: string
  is_active: boolean
}

interface StoreCreationAttributes extends Optional<StoreAttributes, 'id'> {}

class Store
  extends Model<StoreAttributes, StoreCreationAttributes>
  implements StoreAttributes
{
  public id!: number
  public name!: string
  public uber_id!: string
  public phone!: string
  public address!: string
  public is_active!: boolean

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Store.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    uber_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
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
    tableName: 'catalog_stores',
  }
)

export default Store
