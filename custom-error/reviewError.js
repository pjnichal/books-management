import AppError from "./appError.js";

class ReviewAlreadyExists extends AppError {
  constructor() {
    super("You have already given review for this book", 400);
  }
}
export { ReviewAlreadyExists };
