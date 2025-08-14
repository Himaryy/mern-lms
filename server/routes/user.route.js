import express from "express";
import {
  getUserData,
  purchaseCourse,
  userEnrolledCOurses,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/data", getUserData);
userRouter.get("/enrolled-courses", userEnrolledCOurses);
userRouter.post("/purchase", purchaseCourse);

export default userRouter;
