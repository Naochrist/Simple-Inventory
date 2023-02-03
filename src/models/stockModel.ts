import { DataTypes, Model } from 'sequelize';
import db from '../config/dbConfig';


export interface StockAttributes {
  batchId: string;   
  productId: string;
  quantity: number;
}

export class StockInstance extends Model {}

StockInstance.init(
  {
    batchId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
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
