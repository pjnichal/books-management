import AppError from "./appError.js";

export class BookAlreadyExists extends AppError {
  constructor() {
    super("Book Already Exists in Database", 409);
  }
}

export class BookNotFound extends AppError {
  constructor() {
    super("Book Doesn't Exists in Database", 409);
  }
}
