import { Sequelize } from 'sequelize';


console.log(process.env.NODE_ENV, 'h')
const db = new Sequelize('app', 'root', '', {
  storage: process.env.NODE_ENV === 'test' ? './database_test.sqlite' : './database.sqlite',
  dialect: 'sqlite',
  logging: false,
});

export default db;