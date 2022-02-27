import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface RacksAttributes {
    id: number
    code: string
    ubication: number
    level: number
    corridor: string
    area: string
    position: number
    side: number
    id_warehouse: number
    is_active: Boolean
}

interface RacksCreationAttributes
    extends Optional<
        RacksAttributes,
        'id'
    > {}

class Racks
    extends Model<RacksAttributes, RacksCreationAttributes>
    implements RacksAttributes
{
    public id!: number
    public code!:string
    public ubication!:number
    public level!:number
    public corridor!:string
    public area!:string
    public position!:number
    public side!:number
    public id_warehouse!:number
    public is_active!: boolean
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

Racks.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        ubication: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        level: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        corridor: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        area: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        position: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        side: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        id_warehouse: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        tableName: 'catalog_racks',
    }
)

export default Racks
