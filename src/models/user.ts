import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';


export interface UserAttributes {
  batchId: string;
  firstName: string;
  lastName: string;
  userName?: string;
  email: string;
  phoneNumber: string;
  password: string;
  isVerified?: boolean;
  
  role?:string;
}

export class UserInstance extends Model<UserAttributes> {}

UserInstance.init(
  {
    batchId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name is required',
        },
        notEmpty: {
          msg: 'Provide a first name',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name is required',
        },
        notEmpty: {
          msg: 'Provide a last name',
        },
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email is required',
        },
        isEmail: {
          msg: 'Please provide a valid email',
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'PhoneNumber is required',
        },
        isNumeric: {
          msg: 'Please provide a valid phone number',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role:{
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue: 'User',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: 'User',
  },
);
