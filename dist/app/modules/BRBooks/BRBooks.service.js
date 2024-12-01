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
exports.borrowReturnService = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
const borrowBook = (bookId, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma.book.findUnique({ where: { bookId } });
    if (!book) {
        throw new Error("Book not found");
    }
    if (book.availableCopies < 1) {
        throw new Error("No available copies of the book");
    }
    const borrowRecord = yield prisma.borrowRecord.create({
        data: {
            borrowId: (0, uuid_1.v4)(),
            bookId,
            memberId,
            borrowDate: new Date(),
        },
    });
    yield prisma.book.update({
        where: { bookId },
        data: {
            availableCopies: book.availableCopies - 1,
        },
    });
    return borrowRecord;
});
const getAllBorrowRecords = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowRecords = yield prisma.borrowRecord.findMany({
            where: {
                returnDate: null,
            },
            include: {
                book: true,
                member: true,
            },
        });
        return borrowRecords;
    }
    catch (error) {
        throw new Error(`Error fetching borrow records: ${error.message}`);
    }
});
const returnBook = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    const borrowRecord = yield prisma.borrowRecord.findUnique({
        where: { borrowId },
    });
    if (!borrowRecord) {
        throw new Error("Borrow record not found");
    }
    yield prisma.borrowRecord.update({
        where: { borrowId },
        data: {
            returnDate: new Date(),
        },
    });
    const book = yield prisma.book.findUnique({
        where: { bookId: borrowRecord.bookId },
    });
    if (!book) {
        throw new Error("Book not found");
    }
    yield prisma.book.update({
        where: { bookId: book.bookId },
        data: {
            availableCopies: book.availableCopies + 1,
        },
    });
});
const getOverdueBorrowRecords = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const overdueRecords = yield prisma.borrowRecord.findMany({
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
        overdueDays: Math.floor((currentDate.getTime() - record.borrowDate.getTime()) /
            (1000 * 60 * 60 * 24) -
            14),
    }));
});
exports.borrowReturnService = {
    borrowBook,
    returnBook,
    getAllBorrowRecords,
    getOverdueBorrowRecords,
};
