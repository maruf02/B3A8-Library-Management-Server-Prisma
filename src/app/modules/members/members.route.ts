import express from "express";
import { memberController } from "./member.controller";

const router = express.Router();

router.post("/members", memberController.createMember);
router.get("/members", memberController.getAllMembers);
router.get("/members/:memberId", memberController.getMemberById);
router.put("/members/:memberId", memberController.updateMember);
router.delete("/members/:memberId", memberController.deleteMember);

export const memberRoutes = router;
