import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv'
import usersRouter from './routes/userRoutes';
import db from '../src/config/dbConfig';


process.env.NODE_ENV !== 'test' && db.sync()
  // db.sync({ force: true })
  .then(() => {
    console.log('Successfully connected to the Database');
  })
  
dotenv.config()

const app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api-v1/users', usersRouter);




app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});
export default app;