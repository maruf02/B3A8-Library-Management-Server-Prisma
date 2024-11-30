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

export const bookService = {
  createBook,
};
