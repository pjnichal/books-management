import { validationResult } from "express-validator";
import validationHandler from "../handler/validationHandler.js";
import User from "../model/user.model.js";
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from "../custom-error/authError.js";
import apiHandler from "../handler/apiHandler.js";
import { comparePassword, encryptPassword } from "../service/bcryptService.js";
import * as jwtService from "../service/jwtService.js";

const login = async (req, res, next) => {
  try {
    const validations = validationResult(req);
    if (!validations.isEmpty()) return validationHandler(res, validations);

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) return next(new UserNotFoundError());

    const isPasswordValid = comparePassword(password, existingUser.password);
    if (!isPasswordValid) return next(new InvalidCredsError());

    const tokenPayload = {
      email: existingUser.email,
      userId: existingUser._id,
    };

    const accessToken = jwtService.generateAccessToken(tokenPayload);
    const refreshToken = jwtService.generateRefreshToken(tokenPayload);
    await User.findByIdAndUpdate(existingUser._id, { $set: { refreshToken } });
    const rToken = { accessToken, refreshToken };

    return apiHandler(
      res,
      { message: "User Logged In Successfully", tokens: rToken },
      200
    );
  } catch (error) {
    return next(error);
  }
};
const signup = async (req, res, next) => {
  try {
    const validations = validationResult(req);
    if (!validations.isEmpty()) return validationHandler(res, validations);

    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new UserAlreadyExistsError());

    const encryptedPassword = await encryptPassword(password);
    const user = new User({ email, name, password: encryptedPassword });
    await user.save();
    const rUser = { email: user.email, name: user.name };

    return apiHandler(res, { message: "User Created", user: rUser }, 201);
  } catch (error) {
    return next(error);
  }
};

const accessToken = async (req, res, next) => {
  const validations = validationResult(req);
  if (!validations.isEmpty()) return validationHandler(res, validations);

  try {
    const { refreshToken } = req.body;

    const decoded = jwtService.verifyRefreshToken(refreshToken);
    const existingUser = await User.findById(decoded.userId);

    if (!existingUser || existingUser.refreshToken !== refreshToken) {
      return next(new UserNotFoundError());
    }
    const tokenPayload = {
      email: existingUser.email,
      userId: existingUser._id,
    };

    const newAccessToken = jwtService.generateAccessToken(tokenPayload);

    return apiHandler(
      res,
      {
        message: "Access token refreshed successfully",
        accessToken: newAccessToken,
      },
      200
    );
  } catch (error) {
    return next(error);
  }
};
export { login, signup, accessToken };
