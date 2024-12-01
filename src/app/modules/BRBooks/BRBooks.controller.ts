import { Request, Response } from "express";
import { borrowReturnService } from "./BRBooks.service";

const borrowBook = async (req: Request, res: Response) => {
  try {
    const { bookId, memberId } = req.body;
    const result = await borrowReturnService.borrowBook(bookId, memberId);

    const { returnDate, ...responseWithoutReturnDate } = result;
    res.status(200).send({
      success: true,
      status: 200,
      message: "Book borrowed successfully",
      data: responseWithoutReturnDate,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

const getAllBorrowRecords = async (req: Request, res: Response) => {
  try {
    const borrowRecords = await borrowReturnService.getAllBorrowRecords();
    res.status(200).send({
      success: true,
      status: 200,
      message: "Borrow records retrieved successfully",
      data: borrowRecords,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

const returnBook = async (req: Request, res: Response) => {
  try {
    const { borrowId } = req.body;
    await borrowReturnService.returnBook(borrowId);
    res.status(200).send({
      success: true,
      status: 200,
      message: "Book returned successfully",
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

const getOverdueBorrowRecords = async (req: Request, res: Response) => {
  try {
    const overdueRecords = await borrowReturnService.getOverdueBorrowRecords();
    if (overdueRecords.length > 0) {
      res.status(200).send({
        success: true,
        status: 200,
        message: "Overdue borrow list fetched",
        data: overdueRecords,
      });
    } else {
      res.status(200).send({
        success: true,
        status: 200,
        message: "No overdue books",
        data: [],
      });
    }
  } catch (error: any) {
    res.status(400).send({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

export const borrowReturnController = {
  borrowBook,
  returnBook,
  getAllBorrowRecords,
  getOverdueBorrowRecords,
};
