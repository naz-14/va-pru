import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../../../db/connection'

interface BoxesAttributes {
    id: number
    name: string
    size: string
    large: number
    height: number
    width: number
    is_active: Boolean
}

interface BoxesCreationAttributes
    extends Optional<
        BoxesAttributes,
        'id'
    > {}

class Boxes
    extends Model<BoxesAttributes, BoxesCreationAttributes>
    implements BoxesAttributes
{
    public id!: number
    public name!:string
    public size!:string
    public large!:number
    public height!:number
    public width!:number
    public is_active!: boolean
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

Boxes.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        large: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        height: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        width: {
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
        tableName: 'catalog_boxes',
    }
)

export default Boxes
