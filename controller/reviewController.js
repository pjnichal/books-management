import { validationResult } from "express-validator";
import validationHandler from "../handler/validationHandler.js";

import apiHandler from "../handler/apiHandler.js";

import Review from "../model/review.model.js";
import Book from "../model/book.model.js";
import { BookNotFound } from "../custom-error/bookError.js";
import { ReviewAlreadyExists } from "../custom-error/reviewError.js";

const addReview = async (req, res, next) => {
  try {
    const validations = validationResult(req);
    if (!validations.isEmpty()) return validationHandler(res, validations);

    const userId = req.user.userId;
    const { id: bookId } = req.params;
    const { rating, comment } = req.body;

    const bookExists = await Book.exists({ _id: bookId });
    if (!bookExists) next(new BookNotFound());

    const existing = await Review.findOne({ book: bookId, user: userId });
    if (existing) {
      return next(new ReviewAlreadyExists());
    }
    const review = await Review.create({
      book: bookId,
      user: userId,
      rating,
      comment,
    });

    return apiHandler(
      res,
      {
        message: "Review submitted",
        review,
      },
      200
    );
  } catch (error) {
    return next(error);
  }
};
export { addReview };
