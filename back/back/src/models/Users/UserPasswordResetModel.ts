import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../db/connection'

interface UserPasswordResetAttributes {
  id: number
  id_user: number
  token_recovery: string
}

interface UserPasswordResetCreationAttributes
  extends Optional<UserPasswordResetAttributes, 'id'> {}

class UserPasswordReset
  extends Model<
    UserPasswordResetAttributes,
    UserPasswordResetCreationAttributes
  >
  implements UserPasswordResetAttributes
{
  public id!: number
  public id_user!: number
  public token_recovery!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

UserPasswordReset.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token_recovery: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'catalog_users_passwords_recovey',
  }
)

export default UserPasswordReset
