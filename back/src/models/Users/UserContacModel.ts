import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../db/connection'

interface UserContactAttributes {
  id: number
  id_user: number
  id_contact: number
  id_user_register?: number | null
  id_user_update?: number | null
  id_user_delete?: number | null
  is_active: boolean
}

interface UserContactCreationAttributes
  extends Optional<UserContactAttributes, 'id'> {}

class UserContact
  extends Model<UserContactAttributes, UserContactCreationAttributes>
  implements UserContactAttributes
{
  public id!: number
  public id_user!: number
  public id_contact!: number
  public id_user_register?: number | null
  public id_user_update?: number | null
  public id_user_delete?: number | null
  public is_active!: boolean
}

UserContact.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    id_contact: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    tableName: 'catalog_user_contacts',
  }
)

export default UserContact
