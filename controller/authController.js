import bcrypt from "bcrypt";
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
    await User.findOneAndUpdate(
      { email: existingUser.email },
      { $set: { refreshToken } }
    );
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

  const errors = CustomHelperService.hasValidationError(validations);

  if (errors)
    return next(CustomErrorService.unProcessableEntity(errors, "SGIN-UPE-0"));

  try {
    //service.signIn()
    return res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
};
export { login, signup, accessToken };
