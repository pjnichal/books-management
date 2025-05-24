import express from "express";
import { bookValidator, reviewValidator } from "../validators/index.js";
import { bookController, reviewController } from "../controller/index.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  bookValidator.addBook(),
  bookController.addBook
);
router.get("/", bookValidator.getAllBooks(), bookController.getAllBooks);
router.get("/:id", bookValidator.getBookById(), bookController.getBookById);
router.post(
  "/:id/reviews",
  authMiddleware,
  reviewValidator.addReview(),
  reviewController.addReview
);

export default router;
