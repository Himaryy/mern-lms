import express from "express";
import {
  addUserRating,
  getUserCourseProgress,
  getUserData,
  purchaseCourse,
  updateUserCourseProgress,
  userEnrolledCOurses,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/data", getUserData);
userRouter.get("/enrolled-courses", userEnrolledCOurses);
userRouter.post("/purchase", purchaseCourse);

userRouter.post("/update-course-progress", updateUserCourseProgress);
userRouter.get("/get-course-progress", getUserCourseProgress);
userRouter.get("/add-rating", addUserRating);

export default userRouter;
