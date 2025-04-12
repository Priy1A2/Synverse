import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {getUsersForSidebar, getMessages, sendMessage} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);  // user id that we would like to fetch msg with

router.post("/send/:id", protectRoute, sendMessage);

export default router;