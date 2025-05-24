import { validationResult } from "express-validator";
import validationHandler from "../handler/validationHandler.js";

import apiHandler from "../handler/apiHandler.js";

import Review from "../model/review.model.js";
import Book from "../model/book.model.js";
import { BookNotFound } from "../custom-error/bookError.js";
import {
  ReviewAlreadyExists,
  ReviewNotFound,
} from "../custom-error/reviewError.js";

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
const editReview = async (req, res, next) => {
  try {
    const validations = validationResult(req);
    if (!validations.isEmpty()) return validationHandler(res, validations);

    const userId = req.user.userId;
    const { id: bookId } = req.params;
    const { rating, comment } = req.body;

    const bookExists = await Book.exists({ _id: bookId });
    if (!bookExists) return next(new BookNotFound());

    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (!existingReview) return next(new ReviewNotFound());

    existingReview.rating = rating;
    existingReview.comment = comment;
    await existingReview.save();

    return apiHandler(
      res,
      {
        message: "Review updated",
        review: existingReview,
      },
      200
    );
  } catch (error) {
    return next(error);
  }
};
const deleteReview = async (req, res, next) => {
  try {
    const validations = validationResult(req);
    if (!validations.isEmpty()) return validationHandler(res, validations);

    const userId = req.user.userId;
    const { id: bookId } = req.params;

    const bookExists = await Book.exists({ _id: bookId });
    if (!bookExists) return next(new BookNotFound());

    const existingReview = await Review.findOneAndDelete({
      book: bookId,
      user: userId,
    });

    if (!existingReview) return next(new ReviewNotFound());

    return apiHandler(
      res,
      {
        message: "Review deleted successfully",
      },
      200
    );
  } catch (error) {
    return next(error);
  }
};

export { addReview, editReview, deleteReview };
