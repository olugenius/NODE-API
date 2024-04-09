import { body, check } from "express-validator";

export const CreateCommunityValidator = 
[
  body('Name','Name field is required').notEmpty().trim().escape(),
  body('Address','Address field is required').notEmpty().trim().escape(),
  body('Phone','Phone field is required').notEmpty().trim().isMobilePhone('any',{strictMode:true}).withMessage('invalid phone number'),
  //check('Email').optional().trim().isEmail().withMessage('invalid Email').normalizeEmail(),
  //body('CommunityId','Community field is required').notEmpty().trim().escape(),
 
]

export const CreateCheckerValidator = 
[
  body('FirstName','FirstName field is required').notEmpty().trim().escape(),
  body('LastName','LastName field is required').notEmpty().trim().escape(),
  body('Phone','Phone field is required').notEmpty().trim().isMobilePhone('any',{strictMode:true}).withMessage('invalid phone number'),
  //check('Email').optional().trim().isEmail().withMessage('invalid Email format').normalizeEmail(),
  body('DOB').notEmpty().withMessage('DOB field is required').trim().isDate().withMessage('invalid Date format'),
  body('Gender').notEmpty().withMessage('Gender field is required').trim(),
  //body('NIN').notEmpty().withMessage('NIN field is required').trim(),
  body('CheckPoint').notEmpty().withMessage('checkpoint field is required').trim(),
  body('CommunityId','Community field is required').notEmpty().trim().escape(),
 
]

export const CreateSubAdminValidator = 
[
  body('FirstName','FirstName field is required').notEmpty().trim().escape(),
  body('LastName','LastName field is required').notEmpty().trim().escape(),
  body('Phone','Phone field is required').notEmpty().trim().isMobilePhone('any',{strictMode:true}).withMessage('invalid phone number'),
  //check('Email').optional().trim().isEmail().withMessage('invalid Email format').normalizeEmail(),
  body('CommunityId','Community field is required').notEmpty().trim().escape(),
  body('CreatorUserId','CreatorUserId field is required').notEmpty().trim().escape(),
 
]