import express from "express";
import { reviewValidator } from "../validators/index.js";
import { reviewController } from "../controller/index.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.put(
  "/:id",
  authMiddleware,
  reviewValidator.editReview(),
  reviewController.editReview
);
router.delete(
  "/:id",
  authMiddleware,
  reviewValidator.deleteReview(),
  reviewController.deleteReview
);

export default router;
