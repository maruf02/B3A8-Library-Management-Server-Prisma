import express from "express";
import { borrowReturnController } from "./BRBooks.controller";

const router = express.Router();

router.post("/borrow", borrowReturnController.borrowBook);
router.post("/return", borrowReturnController.returnBook);
router.get("/borrowRecords", borrowReturnController.getAllBorrowRecords);
router.get("/borrow/overdue", borrowReturnController.getOverdueBorrowRecords);

export const borrowReturnRoutes = router;
