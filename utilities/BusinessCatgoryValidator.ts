import { body } from "express-validator";

export const businessCategoryValidator = 
[
  body('Name','Name field is required').notEmpty().trim().escape()
 
]