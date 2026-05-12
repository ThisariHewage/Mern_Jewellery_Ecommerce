import express from "express";
import { authUser, registerUser, logoutUser } from "../controllers/userController.js";

const router = express.Router();

// Register a new user and login route
router.post("/", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);

export default router;
