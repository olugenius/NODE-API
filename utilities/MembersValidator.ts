import { body } from "express-validator";

export const CreateAppointmentValidator = 
[
  body('Title','Title field is required').notEmpty().trim().escape(),
  body('Time','Time field is required').notEmpty().trim().escape(),
  body('Venue','Venue field is required').notEmpty().trim().escape(),
  body('Description','Description field is required').notEmpty().trim(),
  body('CommunityId','CommunityId field is required').notEmpty().trim(),
  body('Date').notEmpty().withMessage('Date field is required').trim().isDate().withMessage('invalid Date format'),
  
]