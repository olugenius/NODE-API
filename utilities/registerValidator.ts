import { RequestHandler, Response } from 'express'
import { ValidationChain, body, validationResult } from 'express-validator'



  export const validator = 
[
  body('FirstName').notEmpty().trim().escape().withMessage('FirstName is required'),
  body('LastName','LastName is required').notEmpty().trim().escape(),
  body('Gender','Gender is required').notEmpty().trim().escape(),
  body('Address','Address is required').notEmpty().trim().escape(),
  body('Phone','PhoneNumber is required').notEmpty().trim().escape(),
  //body('PhotoPath').notEmpty().trim().escape(),
  body('Password','Password is required').notEmpty().trim().escape().isLength({min:6}).withMessage('password length must not be less than 6'),
  //body('VerifyChannel','Verification channel is required').notEmpty().trim().escape(),
  //body('IsVerified').notEmpty().trim().escape(),
  body('Language','Language is required').notEmpty().trim().escape(),
  body('CompanyType','Company type is required').notEmpty().trim().escape(),
  body('DOB','Date of Birth is required').isDate().toDate(),
  body('UserRole','Please Pass the User Role').notEmpty().trim().escape(),
  //body('Email','A valid email is required').isEmail().normalizeEmail(),
]

export const EmailValidator = 
[
  body('Channel','Channel is required. In the form of Email or phone number').notEmpty().trim().escape(),
  body('Medium','Medium is required').notEmpty().trim().escape(),
 
]


export const VerifyEmailValidator = 
[
  body('Channel','Channel is required. In the form of Email or phone number').notEmpty().trim().escape(),
  body('Token','Token is required').notEmpty().trim().escape(),
 
]


export const ForgotPasswordValidator = 
[
  body('Channel','Channel is required. In the form of Email or phone number').notEmpty().trim().escape(),
  body('DOB','Must be date format').isDate().toDate(),
  body('Medium','Medium is required').notEmpty().trim().escape(),
]

export const ForgotPasswordVerifyValidator = 
[
  body('Channel','Channel is required. In the form of Email or phone number').notEmpty().trim().escape(),
  body('Token','Token is required').notEmpty().trim().escape(),
]

export const LoginValidator = 
[
  body('Channel','Channel is required. In the form of Email or phone number').notEmpty().trim().escape(),
  body('Password','Password is required').notEmpty().trim().escape(),
 
]

export const RefreshTokenValidator = 
[
  body('Channel','Channel is required. In the form of Email or phone number').notEmpty().trim().escape(),
  body('RefreshToken','RefreshToken is required').notEmpty().trim().escape(),
 
]


export const resetPasswordValidator = 
[
  body('Channel','Channel is required. In the form of Email or phone number').notEmpty().trim().escape(),
  body('NewPassword','NewPassword is required').notEmpty().trim().escape(),
  body('ConfirmPassword','ConfirmPassword is required').notEmpty().trim().custom((value,{req})=>{
     if(value !== req.body.NewPassword){
       throw new Error('Password and Confirm Password must match')
     }
     return true
  }),
 
]




export const validate = (req:Request, res:Response, next:any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();

}

