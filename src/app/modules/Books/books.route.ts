import express from "express";
import { bookController } from "./books.controller";

const router = express.Router();
router.get("/books", bookController.getAllBooks);

router.get("/books/:bookId", bookController.getBookById);

router.post("/books", bookController.createBook);

router.put("/books/:bookId", bookController.updateBook);

router.delete("/books/:bookId", bookController.deleteBook);

export const bookRoutes = router;
