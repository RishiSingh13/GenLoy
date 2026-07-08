import express from "express";
import { gAuth,logout } from "../controllers/auth_controller.js";

const authRouter=express.Router();

authRouter.post("/google",gAuth)
authRouter.get("/logout", logout)

export default authRouter;