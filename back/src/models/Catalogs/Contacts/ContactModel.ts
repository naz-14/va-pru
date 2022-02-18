import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface ContactAttributes {
  id: number
  name: string
  lastname: string
  second_lastname?: string | null
  phone: string
  ext?: string | null
  mobile: string
  email: string
  id_user_register?: number | null
  id_user_update?: number | null
  id_user_delete?: number | null
  is_active: boolean
}

interface ContactCreationAttributes extends Optional<ContactAttributes, 'id'> {}

class Contact
  extends Model<ContactAttributes, ContactCreationAttributes>
  implements ContactAttributes
{
  public id!: number
  public name!: string
  public lastname!: string
  public second_lastname?: string | null
  public phone!: string
  public ext?: string | null
  public mobile!: string
  public email!: string
  public id_user_register?: number | null
  public id_user_update?: number | null
  public id_user_delete?: number | null
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Contact.init(
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
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    second_lastname: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    ext: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    tableName: 'catalog_contacts',
  }
)

export default Contact
