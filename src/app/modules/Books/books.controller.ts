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

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await bookService.getAllBooks();
    res.status(200).send({
      success: true,
      status: 200,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Failed to retrieve books",
      error: error.message,
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const result = await bookService.getBookById(bookId);
    res.status(200).send({
      success: true,
      status: 200,
      message: "Book retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Failed to retrieve book",
      error: error.message,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const bookData = req.body;
    const result = await bookService.updateBook(bookId, bookData);
    res.status(200).send({
      success: true,
      status: 200,
      message: "Book updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    await bookService.deleteBook(bookId);
    res.status(200).send({
      success: true,
      status: 200,
      message: "Book successfully deleted",
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
};

export const bookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
