import AppError from "./appError.js";

class ReviewAlreadyExists extends AppError {
  constructor() {
    super("You have already given review for this book", 400);
  }
}
class ReviewNotFound extends AppError {
  constructor() {
    super("Review doesn't exists", 404);
  }
}
export { ReviewAlreadyExists, ReviewNotFound };
