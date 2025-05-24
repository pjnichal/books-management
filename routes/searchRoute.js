import express from "express";
import { bookValidator } from "../validators/index.js";
import { bookController } from "../controller/index.js";

const router = express.Router();

router.get("/", bookValidator.searchBooks(), bookController.searchBooks);

export default router;
