import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
// import router from "./app/routes";
import cookieParser from "cookie-parser";
import { bookRoutes } from "./app/modules/Books/books.route";
import { memberRoutes } from "./app/modules/members/members.route";

const app: Application = express();
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all apis
app.use("/api", bookRoutes);
app.use("/api", memberRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Library Management server running..",
  });
});

export default app;
