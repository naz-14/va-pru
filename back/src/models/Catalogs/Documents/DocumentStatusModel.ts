import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface DocumentStatusAttributes {
  id: number
  name: String
  is_active: boolean
}

interface DocumentStatusCreationAttributes
  extends Optional<DocumentStatusAttributes, 'id'> {}

class DocumentStatus
  extends Model<DocumentStatusAttributes, DocumentStatusCreationAttributes>
  implements DocumentStatusAttributes
{
  public id!: number
  public name!: string
  public is_active!: boolean
  public readonly updatedAt!: Date
}

DocumentStatus.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
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
    tableName: 'documents_status',
  }
)

export default DocumentStatus
