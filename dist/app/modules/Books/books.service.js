"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield prisma.book.create({
        data: bookData,
    });
    return newBook;
});
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield prisma.book.findMany();
    return books;
});
const getBookById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma.book.findUnique({
        where: { bookId },
    });
    return book;
});
const updateBook = (bookId, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield prisma.book.update({
        where: { bookId },
        data: bookData,
    });
    return updatedBook;
});
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.book.delete({
        where: { bookId },
    });
});
exports.bookService = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
