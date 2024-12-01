import { Request, Response } from "express";
import { memberService } from "./members.service";

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

const createMember = async (req: Request, res: Response) => {
  const memberData = req.body;
  try {
    const result = await memberService.createMember(memberData);
    res.status(201).send({
      success: true,
      status: 201,
      message: "Member created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      status: 400,
      message: error.message || "Failed to create member",
    });
  }
};

const getAllMembers = async (req: Request, res: Response) => {
  const result = await memberService.getAllMembers();
  res.status(200).send({
    success: true,
    status: 200,
    message: "Members retrieved successfully",
    data: result,
  });
};

const getMemberById = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const result = await memberService.getMemberById(memberId);
  res.status(200).send({
    success: true,
    status: 200,
    message: "Member retrieved successfully",
    data: result,
  });
};

const updateMember = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const updateData = req.body;
  const result = await memberService.updateMember(memberId, updateData);
  res.status(200).send({
    success: true,
    status: 200,
    message: "Member updated successfully",
    data: result,
  });
};

const deleteMember = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  await memberService.deleteMember(memberId);
  res.status(200).send({
    success: true,
    status: 200,
    message: "Member successfully deleted",
  });
};

export const memberController = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
