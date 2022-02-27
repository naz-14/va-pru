import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface QuoteAttributes {
  id: number 
  cardCode: string // Codigo del proveedor (SAP)
  cardName: string // Nombre del proveedor (Razon Social)
  docDate: string // Fecha de cita
  docTime: string // Hora de cita
  docStatus: number // Status del documento
  comments: string | null  // Observaciones  
  whsCode: string  // codigo de almacen o tienda (SAP)
  is_active: boolean
}

interface QuoteCreationAttributes
  extends Optional<
    QuoteAttributes,
    | 'id'
    | 'comments'
  > {}

class Quote
  extends Model<QuoteAttributes, QuoteCreationAttributes>
  implements QuoteAttributes
{
  public id!: number
  public cardCode!: string
  public cardName!: string
  public docDate!: string
  public docTime!: string
  public docStatus!: number
  public comments!: string
  public whsCode!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Quote.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    cardCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    cardName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    docDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    docTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    docStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comments: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    whsCode: {
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
    tableName: 'catalog_quotes',
  }
)

export default Quote
