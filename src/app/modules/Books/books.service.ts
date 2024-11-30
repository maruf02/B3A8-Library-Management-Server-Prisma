import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBook = async (bookData: {
  title: string;
  genre: string;
  publishedYear: number;
  totalCopies: number;
  availableCopies: number;
}) => {
  const newBook = await prisma.book.create({
    data: bookData,
  });
  return newBook;
};

const getAllBooks = async () => {
  const books = await prisma.book.findMany();
  return books;
};

const getBookById = async (bookId: string) => {
  const book = await prisma.book.findUnique({
    where: { bookId },
  });
  return book;
};

const updateBook = async (
  bookId: string,
  bookData: {
    title?: string;
    genre?: string;
    publishedYear?: number;
    totalCopies?: number;
    availableCopies?: number;
  }
) => {
  const updatedBook = await prisma.book.update({
    where: { bookId },
    data: bookData,
  });
  return updatedBook;
};

const deleteBook = async (bookId: string) => {
  await prisma.book.delete({
    where: { bookId },
  });
};

export const bookService = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
