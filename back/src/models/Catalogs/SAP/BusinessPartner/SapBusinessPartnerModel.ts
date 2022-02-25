import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface SapBusinessPartnerAttributes {
  id: number
  card_code: string | null
  card_name: string | null
  card_type: string | null
  group_code: number | null
  list_number: number | null
  group_number: number | null
  credit_line: number | null
  debit_line: number | null
  discount: number | null
  phone1: string | null
  phone2: string | null
  email: string | null
  lic_trad_number: string | null
  is_active: boolean
}

interface SapBusinessPartnerCreationAttributes
  extends Optional<
    SapBusinessPartnerAttributes,
    | 'id'
    | 'card_code'
    | 'card_name'
    | 'card_type'
    | 'group_code'
    | 'list_number'
    | 'group_number'
    | 'credit_line'
    | 'debit_line'
    | 'discount'
    | 'phone1'
    | 'phone2'
    | 'email'
    | 'lic_trad_number'
  > {}

class SapBusinessPartner
  extends Model<SapBusinessPartnerAttributes, SapBusinessPartnerCreationAttributes>
  implements SapBusinessPartnerAttributes
{
  public id!: number
  public card_code!: string
  public card_name!: string
  public card_type!: string
  public group_code!: number
  public list_number!: number
  public group_number!: number
  public credit_line!: number
  public debit_line!: number
  public discount!: number
  public phone1!: string
  public phone2!: string
  public email!: string
  public lic_trad_number!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

SapBusinessPartner.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    card_code: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    card_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    card_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    group_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    list_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    group_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    credit_line: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    debit_line: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    phone1: {
        type: DataTypes.STRING(25),
        allowNull: true,
    },
    phone2: {
        type: DataTypes.STRING(25),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(254),
        allowNull: true,
    },
    lic_trad_number: {
        type: DataTypes.STRING(255),
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
    tableName: 'catalog_sap_business_partner',
  }
)

export default SapBusinessPartner