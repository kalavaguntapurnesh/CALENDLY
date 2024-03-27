import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { doctorModel } from "../models/doctorModel.js";
import { UserModel } from "../models/userModel.js";

const router = express.Router();

//GET Method for Users

router.get("/getAllUsers", authMiddleware, async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send({ status: true, message: "User Data Found", data: users });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "Error in get All Users" });
  }
});

//GET Method for Doctors

router.get("/getAllDoctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.send({ status: true, message: "Interviewers Data Found", data: doctors });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "Error in get All Interviewers" });
  }
});

//Post Account Status
router.post("/changeAccountStatus", authMiddleware, async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await UserModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Interviewer Account Request Has ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor === "approved" ? true : false;
    await user.save();
    res.send({
      status: true,
      message: "Account Status Updated Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in Account Status",
      error,
    });
  }
});

export { router as adminRouter };
