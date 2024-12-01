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
exports.bookController = void 0;
const books_service_1 = require("./books.service");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = req.body;
        const result = yield books_service_1.bookService.createBook(bookData);
        res.status(201).send({
            success: true,
            status: 201,
            message: "Book created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to create book",
            error: error.message,
        });
    }
});
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield books_service_1.bookService.getAllBooks();
        res.status(200).send({
            success: true,
            status: 200,
            message: "Books retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to retrieve books",
            error: error.message,
        });
    }
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const result = yield books_service_1.bookService.getBookById(bookId);
        res.status(200).send({
            success: true,
            status: 200,
            message: "Book retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to retrieve book",
            error: error.message,
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const bookData = req.body;
        const result = yield books_service_1.bookService.updateBook(bookId, bookData);
        res.status(200).send({
            success: true,
            status: 200,
            message: "Book updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to update book",
            error: error.message,
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        yield books_service_1.bookService.deleteBook(bookId);
        res.status(200).send({
            success: true,
            status: 200,
            message: "Book successfully deleted",
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to delete book",
            error: error.message,
        });
    }
});
exports.bookController = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
