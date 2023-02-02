import { DataTypes, Model } from "sequelize";
import db from "../config/dbConfig";

export interface ProductAttributes {
  id: string;
  stockId: string;
  productName: string;
  productPrice: string;
  productType: string;
  expiringDate: string;
}

export class ProductInstance extends Model {}

ProductInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    stockId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    productPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    productType: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notNull: {
          msg: "Product category is required",
        },
      },
    },
    expiringDate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "expiringDate is required",
        },
        isNumeric: {
          msg: "Please provide a expiring date",
        },
      },
    },
  },
  {
    sequelize: db,
    tableName: "Product",
  }
);
