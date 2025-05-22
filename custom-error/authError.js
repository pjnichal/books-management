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

class Unauthorized extends AppError {
  constructor() {
    super("User not Authorized", 401);
  }
}
class TokenExpired extends AppError {
  constructor() {
    super("Token has been expired", 401);
  }
}

export {
  UserAlreadyExistsError,
  UserNotFoundError,
  Unauthorized,
  TokenExpired,
};
