import { body, param, query } from "express-validator";

const bookValidator = {
  addBook() {
    return [
      body("title")
        .trim()
        .notEmpty()
        .withMessage("Title must not be empty.")
        .isLength({ max: 255 })
        .withMessage("Title can be up to 255 characters."),

      body("author")
        .trim()
        .notEmpty()
        .withMessage("Author must not be empty.")
        .isLength({ max: 255 })
        .withMessage("Author can be up to 255 characters."),

      body("publisher")
        .trim()
        .notEmpty()
        .isLength({ max: 255 })
        .withMessage("Publisher name can be up to 255 characters."),

      body("genre")
        .isArray()
        .withMessage("Genre must be an array of strings.")
        .custom((arr) => arr.every((g) => typeof g === "string"))
        .withMessage("All genres must be strings."),
    ];
  },
  getBookById() {
    return [
      param("id")
        .trim()
        .notEmpty()
        .withMessage("id must not be empty.")
        .isMongoId()
        .withMessage("Please enter valid book id."),
    ];
  },
  getAllBooks() {
    return [
      query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be an integer between 1 and 100"),

      query("offset")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Offset must be a non-negative integer"),

      query("author")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage("Author can be up to 255 characters."),

      query("genre")
        .optional()
        .custom((value) => {
          const genres = Array.isArray(value) ? value : value.split(",");
          if (!genres.every((g) => typeof g === "string")) {
            throw new Error(
              "Genre must be an array of strings or a comma-separated list"
            );
          }
          return true;
        }),
    ];
  },
  searchBooks() {
    return [
      query("query")
        .trim()
        .notEmpty()
        .withMessage("Search query is required")
        .isString()
        .withMessage("Query must be a string")
        .isLength({ min: 2 })
        .withMessage("Search query must be at least 2 characters long"),
    ];
  },
};
export default bookValidator;
