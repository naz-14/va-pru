import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../db/connection'

interface FileAttributes {
  id: number
  url: string
  id_user_register?: number | null
  id_user_update?: number | null
  id_user_delete?: number | null
  is_active: boolean
}

interface FileCreationAttributes extends Optional<FileAttributes, 'id'> {}

class File
  extends Model<FileAttributes, FileCreationAttributes>
  implements FileAttributes
{
  public id!: number
  public url!: string
  public id_user_register?: number | null
  public id_user_update?: number | null
  public id_user_delete?: number | null
  public is_active!: boolean

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(150),
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
    tableName: 'catalog_files',
  }
)

export default File
