import express from "express";
import {  getcurrentUser } from "../controllers/user_controllers.js";
import isAuth from "../middleware/isAuth.js";


const userRouter=express.Router();

userRouter.get("/me",isAuth ,getcurrentUser)

export default userRouter;