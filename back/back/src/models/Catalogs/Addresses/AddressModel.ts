import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface AddressAttributes {
  id: number
  street: string
  external_number: string
  internal_number: string
  id_country: number
  id_state: number
  id_city: number
  id_municipality: number
  id_colony: number
  zip_code: number
  id_user_register?: number | null
  id_user_update?: number | null
  id_user_delete?: number | null
  is_active: boolean
}

interface AddressCreationAttributes extends Optional<AddressAttributes, 'id'> {}

class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
  public id!: number
  public street!: string
  public external_number!: string
  public internal_number!: string
  public id_country!: number
  public id_state!: number
  public id_city!: number
  public id_municipality!: number
  public id_colony!: number
  public zip_code!: number
  public is_active!: boolean
  public id_user_register?: number | null
  public id_user_update?: number | null
  public id_user_delete?: number | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    street: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: false,
    },
    external_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: false,
    },
    internal_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: false,
    },
    id_country: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: false,
    },
    id_state: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: false,
    },
    id_city: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: false,
    },
    id_municipality: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: false,
    },
    id_colony: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: false,
    },
    zip_code: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: false,
    },
    id_user_register: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    id_user_update: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    id_user_delete: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'catalog_addresses',
  }
)

export default Address
