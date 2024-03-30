import { body, check } from "express-validator";

export const SingleAccessCodeModelValidator = 
[
  //body('PurposeCode','PurposeCode field is required').notEmpty().trim().escape(),
  body('StartTime','StartTime field is required').notEmpty().trim().escape(),
  body('EndTime','EndTime field is required').notEmpty().trim().escape(),
  body('Name','Name field is required').notEmpty().trim(),
  //check('Email').optional().trim().isEmail().withMessage('invalid Email format').normalizeEmail(),
  body('Date').notEmpty().withMessage('Date field is required').trim().isDate().withMessage('invalid Date format'),
  
 
]

export const StaticAccessCodeModelValidator = 
[
  body('DateRange','PurposeCode field is required').notEmpty().trim().escape(),
  body('Frequency','StartTime field is required').notEmpty().trim().escape(),
  body('Name','Name field is required').notEmpty().trim(),
  body('Phone','Phone field is required').notEmpty().trim().isMobilePhone('any',{strictMode:true}).withMessage('invalid phone number'),
  //check('Email').optional().trim().isEmail().withMessage('invalid Email format').normalizeEmail(),
  body('Category','Name field is required').notEmpty().trim(),
  
 
]

export const BulkAccessCodeModelValidator = 
[
  body('Frequency','Frequency field is required').notEmpty().trim().escape(),
  body('StartTime','StartTime field is required').notEmpty().trim().escape(),
  body('EndTime','EndTime field is required').notEmpty().trim().escape(),
  body('AppointmentTitle','AppointmentTitle field is required').notEmpty().trim(),
  body('Phone','Phone field is required').notEmpty().trim().isMobilePhone('any',{strictMode:true}).withMessage('invalid phone number'),
  //check('Email').optional().trim().isEmail().withMessage('invalid Email format').normalizeEmail(),
  body('Date').notEmpty().withMessage('Date field is required').trim().isDate().withMessage('invalid Date format'),
  body('NoOfParticipants','NoOfParticipants field is required').notEmpty().trim().escape(),
 
]