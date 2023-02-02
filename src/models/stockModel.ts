import { DataTypes, Model } from 'sequelize';
import db from '../config/dbConfig';


export interface StockAttributes {
    id: number;
    productName: string;
    quantity: number;
    batchId: string; 
}

export class StockInstance extends Model {}

StockInstance.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    batchId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
      },
   
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'quantity is required',
        },
        isNumeric: {
          msg: 'Please provide a valid quantity',
        },
      },
    },
  },
  {
    sequelize: db,
    tableName: 'Stock',
  },
);
