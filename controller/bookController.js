import { validationResult } from "express-validator";
import validationHandler from "../handler/validationHandler.js";
import apiHandler from "../handler/apiHandler.js";

import Book from "../model/book.model.js";
import { BookAlreadyExists, BookNotFound } from "../custom-error/bookError.js";
import Review from "../model/review.model.js";

const addBook = async (req, res, next) => {
  try {
    const validations = validationResult(req);
    if (!validations.isEmpty()) return validationHandler(res, validations);

    const bookDetails = req.body;

    const existingBook = await Book.findOne({
      title: bookDetails.title,
      author: bookDetails.author,
    });
    if (existingBook) return next(new BookAlreadyExists());

    const book = await Book.create(bookDetails);

    return apiHandler(res, { message: "Book Added to Database", book }, 200);
  } catch (error) {
    return next(error);
  }
};
const getAllBooks = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0, author, genre } = req.query;
    let filter = {};
    if (author) {
      filter.author = { $regex: new RegExp(author, "i") };
    }

    if (genre) {
      const genres = Array.isArray(genre) ? genre : genre.split(",");
      filter.genre = {
        $in: genres.map((g) => new RegExp(`^${g}$`, "i")),
      };
    }

    const allBooks = await Book.find(filter, {
      _id: 1,
      title: 1,
      author: 1,
      genre: 1,
      publisher: 1,
    })
      .skip(parseInt(offset))
      .limit(parseInt(limit));
    return apiHandler(res, { message: "Book details", allBooks }, 200);
  } catch (error) {
    return next(error);
  }
};
const getBookById = async (req, res, next) => {
  try {
    const validations = validationResult(req);
    if (!validations.isEmpty()) return validationHandler(res, validations);
    const { id } = req.params;
    const { limit = 5, offset = 0 } = req.query;

    const book = await Book.findById(id, {
      _id: 1,
      title: 1,
      author: 1,
      genre: 1,
      publisher: 1,
    }).lean();
    if (!book) return next(new BookNotFound());
    const [avgRating, reviews] = await Promise.all([
      Review.aggregate([
        { $match: { book: book._id } },
        { $group: { _id: null, avgRating: { $avg: "$rating" } } },
      ]),
      Review.find({ book: book._id }, { _id: 0, rating: 1, user: 1 })
        .populate("user", "name")
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }),
    ]);
    return apiHandler(
      res,
      {
        message: "Book details",
        book,
        averageRating: avgRating[0]?.avgRating || 0,
        reviews,
      },
      200
    );
  } catch (error) {
    return next(error);
  }
};
export { addBook, getAllBooks, getBookById };
