import AppError from "./appError.js";
class UserAlreadyExistsError extends AppError {
  constructor() {
    super("User with given email already exists", 409); // 409 Conflict
  }
}

class UserNotFoundError extends AppError {
  constructor() {
    super("User not found", 404);
  }
}

export { UserAlreadyExistsError, UserNotFoundError };
