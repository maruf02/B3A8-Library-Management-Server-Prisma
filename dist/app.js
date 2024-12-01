"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import router from "./app/routes";
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const books_route_1 = require("./app/modules/Books/books.route");
const members_route_1 = require("./app/modules/members/members.route");
const BRBooks_route_1 = require("./app/modules/BRBooks/BRBooks.route");
const globalErrorHandler_1 = __importDefault(require("./app/globalErrorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// all apis
app.use("/api", books_route_1.bookRoutes);
app.use("/api", members_route_1.memberRoutes);
app.use("/api", BRBooks_route_1.borrowReturnRoutes);
app.get("/", (req, res) => {
    res.send({
        Message: "Library Management server running..",
    });
});
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(400).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!",
        },
    });
});
exports.default = app;
