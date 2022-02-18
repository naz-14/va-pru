import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../db/connection'

interface SulogAttributes {
  id: number
  cardCode: string
  cardName: string
  docDate: string
  docStatus: string
  comments: string
  numAtCard: string 
  route: string
  whsCode: string  
}

interface SulogCreationAttributes extends Optional<SulogAttributes, 'id'|'cardCode' | 'cardName' | 'docDate' | 'docStatus' | 'comments' | 'numAtCard' | 'route' | 'whsCode'> {}

class Sulog
  extends Model<SulogAttributes, SulogCreationAttributes>
  implements SulogAttributes
{
  public id!: number
  public cardCode!: string
  public cardName!: string
  public docDate!: string
  public docStatus!: string
  public comments!: string
  public numAtCard!: string
  public route!: string
  public whsCode!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Sulog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cardCode: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    cardName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    docDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    docStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numAtCard: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    route: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: true,
    },
    whsCode: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'catalog_supply_logistics',
  }
)

export default Sulog
