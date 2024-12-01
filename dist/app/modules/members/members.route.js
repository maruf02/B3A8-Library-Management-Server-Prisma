"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRoutes = void 0;
const express_1 = __importDefault(require("express"));
const member_controller_1 = require("./member.controller");
const router = express_1.default.Router();
router.post("/members", member_controller_1.memberController.createMember);
router.get("/members", member_controller_1.memberController.getAllMembers);
router.get("/members/:memberId", member_controller_1.memberController.getMemberById);
router.put("/members/:memberId", member_controller_1.memberController.updateMember);
router.delete("/members/:memberId", member_controller_1.memberController.deleteMember);
exports.memberRoutes = router;
