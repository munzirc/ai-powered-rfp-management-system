import { body } from "express-validator";

export const createVendorValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("phone").optional().isString(),
  body("company").optional().isString(),
  body("contact_name").optional().isString(),
];
