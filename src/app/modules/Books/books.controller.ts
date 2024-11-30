import { Request, Response } from "express";
import { bookService } from "./books.service";

const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    const result = await bookService.createBook(bookData);
    res.status(201).send({
      success: true,
      status: 201,
      message: "Book created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Failed to create book",
      error: error.message,
    });
  }
};

export const bookController = {
  createBook,
};
