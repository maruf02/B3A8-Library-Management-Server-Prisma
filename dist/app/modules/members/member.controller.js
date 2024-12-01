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
exports.memberController = void 0;
const members_service_1 = require("./members.service");
// const createMember = async (req: Request, res: Response) => {
//   const memberData = req.body;
//   const result = await memberService.createMember(memberData);
//   res.status(201).send({
//     success: true,
//     status: 201,
//     message: "Member created successfully",
//     data: result,
//   });
// };
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberData = req.body;
    try {
        const result = yield members_service_1.memberService.createMember(memberData);
        res.status(201).send({
            success: true,
            status: 201,
            message: "Member created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            status: 400,
            message: error.message || "Failed to create member",
        });
    }
});
const getAllMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield members_service_1.memberService.getAllMembers();
    res.status(200).send({
        success: true,
        status: 200,
        message: "Members retrieved successfully",
        data: result,
    });
});
const getMemberById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    const result = yield members_service_1.memberService.getMemberById(memberId);
    res.status(200).send({
        success: true,
        status: 200,
        message: "Member retrieved successfully",
        data: result,
    });
});
const updateMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    const updateData = req.body;
    const result = yield members_service_1.memberService.updateMember(memberId, updateData);
    res.status(200).send({
        success: true,
        status: 200,
        message: "Member updated successfully",
        data: result,
    });
});
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    yield members_service_1.memberService.deleteMember(memberId);
    res.status(200).send({
        success: true,
        status: 200,
        message: "Member successfully deleted",
    });
});
exports.memberController = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember,
};
