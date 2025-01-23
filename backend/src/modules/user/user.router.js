import { Router } from "express";
const router = Router();
import *  as userController from "./user.controller.js";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/errorHandling.js";

router.get("/profile", auth, asyncHandler(userController.getProfile));
router.get('/user-books', auth, asyncHandler(userController.getUserBooks));  // عرض الكتب الخاصة بالمستخدم

export default router;