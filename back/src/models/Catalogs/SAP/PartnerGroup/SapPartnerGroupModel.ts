import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface SapPartnerGroupAttributes {
  id: number
  group_code: number | null
  group_name: string | null
  group_type: string | null
  price_list: number | null
  is_active: boolean
}

interface SapPartnerGroupCreationAttributes
  extends Optional<
    SapPartnerGroupAttributes,
    | 'id'
    | 'group_code'
    | 'group_name'
    | 'group_type'
    | 'price_list'
  > {}

class SapPartnerGroup
  extends Model<SapPartnerGroupAttributes, SapPartnerGroupCreationAttributes>
  implements SapPartnerGroupAttributes
{
  public id!: number
  public group_code!: number
  public group_name!: string
  public group_type!: string
  public price_list!: number
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

SapPartnerGroup.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    group_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    group_name: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
    },
    group_type: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'C'
    },
    price_list: {
      type: DataTypes.INTEGER,
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
    tableName: 'catalog_sap_partner_group',
  }
)

export default SapPartnerGroup