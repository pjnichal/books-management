import { body } from "express-validator";

const authValidator = {
  login() {
    return [
      body("email")
        .trim()
        .notEmpty()
        .withMessage("Email address must not be empty.")
        .isLength({ max: 255 })
        .withMessage(
          "Sensible maximum length for an email address is 255 charecters only."
        )
        .isEmail()
        .withMessage(
          "The email address you provided is not in a valid format."
        ),

      body("password")
        .trim()
        .notEmpty()
        .withMessage("Password must not be empty.")
        .isLength({ min: 8, max: 32 })
        .withMessage(
          "Password must have a length of atleast 8 and atmost 32 chars."
        )
        .isStrongPassword()
        .withMessage(
          "Invalid password! Must include at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
        ),
    ];
  },
  signup() {
    return [
      body("email")
        .trim()
        .notEmpty()
        .withMessage("Email address must not be empty.")
        .isLength({ max: 255 })
        .withMessage(
          "Sensible maximum length for an email address is 255 charecters only."
        )
        .isEmail()
        .withMessage(
          "The email address you provided is not in a valid format."
        ),

      body("password")
        .trim()
        .notEmpty()
        .withMessage("Password must not be empty.")
        .isLength({ min: 8, max: 32 })
        .withMessage(
          "Password must have a length of atleast 8 and atmost 32 chars."
        )
        .isStrongPassword()
        .withMessage(
          "Invalid password! Must include at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
        ),

      body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters long"),
    ];
  },
};

export default authValidator;
