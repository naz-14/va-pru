import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface ReasonsAttributes {
  id: number
  order_id: number
  reason:string | null
  issusse_id: number
  user_id: number
  is_active: boolean
  createdAt: string
}

interface ReasonsCreationAttributes
  extends Optional<
    ReasonsAttributes,
    | 'id'
    | 'reason'
  > {}

class Reasons
  extends Model<ReasonsAttributes, ReasonsCreationAttributes>
  implements ReasonsAttributes
{
  public id!: number
  public order_id!:number
  public reason!:string
  public issusse_id!: number
  public user_id!: number
  public is_active!: boolean
  public createdAt!: string
  public readonly updatedAt!: Date
}

Reasons.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    issusse_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'catalog_reasons',
  }
)

export default Reasons
