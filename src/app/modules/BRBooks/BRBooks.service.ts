import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

const borrowBook = async (bookId: string, memberId: string) => {
  const book = await prisma.book.findUnique({ where: { bookId } });
  if (!book) {
    throw new Error("Book not found");
  }

  if (book.availableCopies < 1) {
    throw new Error("No available copies of the book");
  }

  const borrowRecord = await prisma.borrowRecord.create({
    data: {
      borrowId: uuid(),
      bookId,
      memberId,
      borrowDate: new Date(),
    },
  });

  await prisma.book.update({
    where: { bookId },
    data: {
      availableCopies: book.availableCopies - 1,
    },
  });

  return borrowRecord;
};

const getAllBorrowRecords = async () => {
  try {
    const borrowRecords = await prisma.borrowRecord.findMany({
      where: {
        returnDate: null,
      },
      include: {
        book: true,
        member: true,
      },
    });

    return borrowRecords;
  } catch (error: any) {
    throw new Error(`Error fetching borrow records: ${error.message}`);
  }
};

const returnBook = async (borrowId: string) => {
  const borrowRecord = await prisma.borrowRecord.findUnique({
    where: { borrowId },
  });
  if (!borrowRecord) {
    throw new Error("Borrow record not found");
  }

  await prisma.borrowRecord.update({
    where: { borrowId },
    data: {
      returnDate: new Date(),
    },
  });

  const book = await prisma.book.findUnique({
    where: { bookId: borrowRecord.bookId },
  });
  if (!book) {
    throw new Error("Book not found");
  }

  await prisma.book.update({
    where: { bookId: book.bookId },
    data: {
      availableCopies: book.availableCopies + 1,
    },
  });
};

const getOverdueBorrowRecords = async () => {
  const currentDate = new Date();
  const overdueRecords = await prisma.borrowRecord.findMany({
    where: {
      returnDate: null,
      borrowDate: {
        lt: new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      },
    },
    include: {
      book: true,
      member: true,
    },
  });

  return overdueRecords.map((record) => ({
    borrowId: record.borrowId,
    bookTitle: record.book.title,
    borrowerName: record.member.name,
    overdueDays: Math.floor(
      (currentDate.getTime() - record.borrowDate.getTime()) /
        (1000 * 60 * 60 * 24) -
        14
    ),
  }));
};

export const borrowReturnService = {
  borrowBook,
  returnBook,
  getAllBorrowRecords,
  getOverdueBorrowRecords,
};
