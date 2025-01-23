import { Router } from "express";
const router = Router();
import * as authController from "./auth.controller.js";
import { asyncHandler } from "../../middleware/errorHandling.js";

router.post("/signUp", asyncHandler(authController.signUp));
router.post("/signIn", asyncHandler(authController.signIn));
router.get("/confirmEmail/:token", asyncHandler(authController.confirmEmail));

export default router;