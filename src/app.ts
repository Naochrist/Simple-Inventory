import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/dbConfig";
import { usersRouter } from "./routes/userRoutes";
import { productsRouter } from "./routes/productRoutes";
import { stockRouter } from "./routes/stockRoutes";

dotenv.config();

db.sync().then(() => {
  console.log("Successfully connected to the Database");
});

const app = express();
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api-v1/users", usersRouter);
app.use("/api-v1/products", productsRouter);
app.use("/api-v1/stock", stockRouter)


app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});
export default app;
