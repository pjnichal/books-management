import express from "express";
import { authValidator } from "../validators/index.js";
import { authController } from "../controller/index.js";

const router = express.Router();

router.post("/signup", authValidator.signup(), authController.signup);
router.post("/login", authValidator.login(), authController.login);

export default router;
