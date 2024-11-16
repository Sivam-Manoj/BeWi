import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pkg, { AsyncError, biezorMiddleware } from "biezor";
import { ConnectServerWithDb } from "../Config/Database";
import authRoutes from "../Auth/Routes/AuthRoutes";
const app = express();

//defualt middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/auth", authRoutes);

//custom error handler middleware
app.use((err: any, res: any, req: any, next: NextFunction) => {
  biezorMiddleware(err, res, req, next);
});

// database and server connection
ConnectServerWithDb(app);
