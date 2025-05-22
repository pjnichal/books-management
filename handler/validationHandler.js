const validationHandler = (res, validations) => {
  let extractedErrors;
  if (!validations.isEmpty()) {
    const errors = validations.array();
    extractedErrors = {};
    for (const err in errors) {
      const error = errors[err];
      if (!extractedErrors[error.path]) {
        extractedErrors[error.path] = error.msg;
      }
    }
    return res.status(400).json({
      success: false,
      error: "VALIDATION_ERROR",
      validations: extractedErrors,
    });
  }
};

export default validationHandler;
