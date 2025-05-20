import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/index.js";

export const encryptPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(SALT_ROUNDS));
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  } catch (err) {
    throw new Error("Error encrypting password");
  }
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (err) {
    throw new Error("Error comparing passwords");
  }
};
