import express from "express";
import { bookController } from "./books.controller";

const router = express.Router();

router.post("/books", bookController.createBook);

export const bookRoutes = router;
