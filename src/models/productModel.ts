import { DataTypes, Model } from "sequelize";
import db from "../config/dbConfig";

export interface ProductAttributes {
  id: string;
  productName: string;
  productPrice: string;
  productType: string;
}

export class ProductInstance extends Model {}

ProductInstance.init(
  {
    id: {
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
    }
  },
  {
    sequelize: db,
    tableName: "Product",
  }
);
