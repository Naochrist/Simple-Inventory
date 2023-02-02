import { DataTypes, Model } from 'sequelize';
import db from '../config/dbConfig';


export interface ProductAttributes {
  id: string;
  productId: string;
  productName?: string;
  productType: string;
  expiringDate: string;
  barcode: string;
}

export class ProductInstance extends Model<ProductAttributes> {}

ProductInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    productId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    
    productName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,

    },
    productType: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Product category is required',
        },
        isProduct: {
          msg: 'Please provide a valid product category',
        },
      },
    },
    expiringDate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'expiringDate is required',
        },
        isNumeric: {
          msg: 'Please provide a expiring date',
        },
      },
    },
    barcode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    tableName: 'Product',
  },
);