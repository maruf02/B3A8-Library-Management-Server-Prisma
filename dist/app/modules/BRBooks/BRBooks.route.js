"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowReturnRoutes = void 0;
const express_1 = __importDefault(require("express"));
const BRBooks_controller_1 = require("./BRBooks.controller");
const router = express_1.default.Router();
router.post("/borrow", BRBooks_controller_1.borrowReturnController.borrowBook);
router.post("/return", BRBooks_controller_1.borrowReturnController.returnBook);
router.get("/borrowRecords", BRBooks_controller_1.borrowReturnController.getAllBorrowRecords);
router.get("/borrow/overdue", BRBooks_controller_1.borrowReturnController.getOverdueBorrowRecords);
exports.borrowReturnRoutes = router;
