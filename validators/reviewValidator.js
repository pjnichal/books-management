import { body, param } from "express-validator";

const validateReviewPost = {
  addReview() {
    return [
      param("id").isMongoId().withMessage("Invalid book ID"),

      body("rating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be an integer between 1 and 5"),

      body("comment")
        .optional()
        .isString()
        .withMessage("Comment must be a string")
        .isLength({ max: 1000 })
        .withMessage("Comment must not exceed 1000 characters"),
    ];
  },
};
export default validateReviewPost;
