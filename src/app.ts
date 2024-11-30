import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
// import router from "./app/routes";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Library Management server running..",
  });
});

export default app;
