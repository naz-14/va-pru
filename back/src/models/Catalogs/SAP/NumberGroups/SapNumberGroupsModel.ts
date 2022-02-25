import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../../db/connection'

interface SapNumberGroupsAttributes {
  id: number
  group_number: number | null
  payment_group: string | null
  pay_due_month: string | null
  extra_month: number | null
  extra_days: number | null
  payments_number: number | null
  installments_number: number | null
  open_reception: string | null
  is_active: boolean
}

interface SapNumberGroupsCreationAttributes
  extends Optional<
    SapNumberGroupsAttributes,
    | 'id'
    | 'group_number'
    | 'payment_group'
    | 'pay_due_month'
    | 'extra_month'
    | 'extra_days'
    | 'payments_number'
    | 'installments_number'
    | 'open_reception'
  > {}

class SapNumberGroups
  extends Model<SapNumberGroupsAttributes, SapNumberGroupsCreationAttributes>
  implements SapNumberGroupsAttributes
{
  public id!: number
  public group_number!: number
  public payment_group!: string
  public pay_due_month!: string
  public extra_month!: number
  public extra_days!: number
  public payments_number!: number
  public installments_number!: number
  public open_reception!: string
  public is_active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

SapNumberGroups.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    group_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    payment_group: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    pay_due_month: {
        type: DataTypes.CHAR(1),
        allowNull: true,
        defaultValue: 'N'
    },
    extra_month: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: false
    },
    extra_days: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: false
    },
    payments_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    installments_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    open_reception: {
        type: DataTypes.CHAR(1),
        allowNull: true,
        defaultValue: 'N'
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'catalog_sap_number_groups',
  }
)

export default SapNumberGroups