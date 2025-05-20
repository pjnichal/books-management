import dotenv from "dotenv";
dotenv.config();

export const {
  MONGODB_URL,
  PORT,
  SALT_ROUNDS,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env;
