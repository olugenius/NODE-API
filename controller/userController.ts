import express, { Request, Response } from "express";
import loginModel from "../model/loginModel";
import {
  EmailValidator,
  ForgotPasswordValidator,
  ForgotPasswordVerifyValidator,
  LoginValidator,
  RefreshTokenValidator,
  UpdateUserValidator,
  VerifyEmailValidator,
  createPasswordValidator,
  resetPasswordValidator,
  updatePasswordValidator,
  validate,
  validator,
} from "../utilities/registerValidator";
import { body, validationResult } from "express-validator";
import mailRequestModel from "../model/mailRequestModel";
import mailVerifyModel from "../model/MailVerifyModel";
import bcrypt from "bcrypt";
import forgotPasswordRequestmodel from "../model/forgotPasswordModel";
import forgotPasswordVerifyModel from "../model/forgotPasswordVerifyModel";
import { HttpStatus } from "../utilities/HttpstatusCode";
import userToken from "../model/DTOs/userToken";
import { format } from "date-fns/format";
import { dateFormatter } from "../utilities/dateFormatter";
import {
  createPasswordRequestModel,
  resetPasswordRequestModel,
  updatePasswordRequestModel,
} from "../model/resetPasswordRequestModel";
import jwtHandler from "../utilities/jwtHandler";
import refreshTokenRequestmodel from "../model/refreshTokenRequestModel";
import { isValid } from "date-fns";
import { SendMail } from "../utilities/EmailHandler";
import SMSHandler from "../utilities/SMSHandler";
import { container } from "../Container/appContainer";
import multer from "multer";
import UserRepository from "../repository/Abstraction/UserRepository";
import { RolesEnum } from "../utilities/RolesEnum";
import memberRepository from "../repository/Abstraction/memberRepository";
import communityRepository from "../repository/Abstraction/communityRepository";
import Dependant from "../services/Abstraction/Dependant";
import Community from "../services/Abstraction/community";
import Member from "../services/Abstraction/member";
import checker from "../services/Abstraction/checker";
import UpdateEmailModel from "../model/UpdateEmailModel";
import path from "path";
import { Authorize } from "../middleware/authorization";
import { registerModel, updateUserModel } from "../model/registerModel";
import { v2 as cloudinary } from "cloudinary";
import subAdmin from "../services/Abstraction/subAdmin";
import BaseService from "../services/Abstraction/BaseService";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Application User
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Channel:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             Channel: JohnDoe
 *             Password: john@example.com
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Login Successfuly
 */



/**
 * @swagger
 * /api/super-admin/login:
 *   post:
 *     summary: Login User
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Channel:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             Channel: JohnDoe
 *             Password: john@example.com
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Login Successfuly
 */



/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: file
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *               Gender:
 *                 type: string
 *               Email:
 *                 type: string
 *               Address:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Password:
 *                 type: string
 *               Language:
 *                 type: string
 *               CompanyType:
 *                 type: string
 *               DOB:
 *                 type: string
 *               UserRole:
 *                 type: string
 *           example:
 *             Channel: JohnDoe
 *             Password: john@example.com
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Registration Successful
 */

/**
 * @swagger
 * /api/setting/profile/update/{channel}:
 *   put:
 *     summary: Update User
 *     parameters:
 *       - in: path
 *         name: channel
 *         required: true
 *         schema:
 *           type: string
 *         description: channel of the user to update
 *     tags: [Settings]
 *     security:
 *      - APIKeyHeader: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string  # Change type from file to string
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string  # Add type for LastName
 *               Email:
 *                 type: string
 *           example:
 *             Channel: JohnDoe
 *             Password: john@example.com
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: user update Successful
 */

/**
 * @swagger
 * /api/register/sendMail:
 *   post:
 *     summary: Send Mail /SMS for Validation
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Channel:
 *                 type: string
 *               Medium:
 *                 type: string
 *           example:
 *             Channel: john@example.com
 *             Medium: Email
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Mail/SMS Sent Successfully
 */

/**
 * @swagger
 * /api/register/verify:
 *   post:
 *     summary:  Registration Mail /SMS for Token Validation
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Channel:
 *                 type: string
 *               Token:
 *                 type: string
 *           example:
 *             Channel: Email
 *             Token: '000000'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Verification Successfully
 */

/**
 * @swagger
 * /api/forgotPassword/sendMail:
 *   post:
 *     summary: Send Mail /SMS for forgot password Validation
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Channel:
 *                 type: string
 *               DOB:
 *                 type: string
 *               Medium:
 *                 type: string
 *           example:
 *             Channel: john@example.com
 *             DOB: 1993-01-01
 *             Medium: Email
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Forgot Password Mail/SMS Sent Successfully
 */


/**
 * @swagger
 * /api/super-admin/forgotPassword/sendMail:
 *   post:
 *     summary: Send Mail /SMS for super admin forgot password Validation
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Channel:
 *                 type: string
 *               DOB:
 *                 type: string
 *               Medium:
 *                 type: string
 *           example:
 *             Channel: john@example.com
 *             DOB: 1993-01-01
 *             Medium: Email
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Forgot Password Mail/SMS Sent Successfully
 */

/**
 * @swagger
 * /api/forgotPassword/verify:
 *   post:
 *     summary: forgot password Mail /SMS Token Verification
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Channel:
 *                 type: string
 *               Token:
 *                 type: string
 *           example:
 *             Channel: john@example.com
 *             Token: john@example.com
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Token Verification Successfully
 */


/**
 * @swagger
 * /api/super-admin/forgotPassword/verify:
 *   post:
 *     summary: Super Admin forgot password Mail /SMS Token Verification
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Channel:
 *                 type: string
 *               Token:
 *                 type: string
 *           example:
 *             Channel: john@example.com
 *             Token: john@example.com
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Token Verification Successfully
 */


/**
 * @swagger
 * /api/refreshToken:
 *   post:
 *     summary: Generate New JWT using RefreshToken
 *     security:
 *      - APIKeyHeader: []
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Channel:
 *                 type: string
 *               RefreshToken:
 *                 type: string
 *           example:
 *             Channel: john@example.com
 *             RefreshToken: 0987897373733hhhrfnnnfff
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: JWT Generated Successfully Successfully
 */

/**
 * @swagger
 * /api/resetPassword:
 *   post:
 *     summary: Reset User Password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NewPassword:
 *                 type: string
 *               ConfirmPassword:
 *                 type: string
 *               Channel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Password Reset Successfully
 */



/**
 * @swagger
 * /api/super-admin/resetPassword:
 *   post:
 *     summary: Reset Super Admin Password
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NewPassword:
 *                 type: string
 *               ConfirmPassword:
 *                 type: string
 *               Channel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Password Reset Successfully
 */


/**
 * @swagger
 * /api/super-admin/createPassword:
 *   post:
 *     summary: Create Super Admin Password
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Password:
 *                 type: string
 *               ConfirmPassword:
 *                 type: string
 *               Channel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Super Admin Password created  Successfully
 */

/**
 * @swagger
 * /api/createPassword:
 *   put:
 *     summary: Create Password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Password:
 *                 type: string
 *               ConfirmPassword:
 *                 type: string
 *               Channel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Password created  Successfully
 */

/**
 * @swagger
 * /api/setting/password/update:
 *   put:
 *     summary: Update Password
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OldPassword:
 *                 type: string
 *               NewPassword:
 *                 type: string
 *               Phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Password Updated  Successfully
 */

/**
 * @swagger
 * /api/setting/account/delete/{Id}:
 *   delete:
 *     summary: Delete Account using Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Account to delete
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully Delete Account
 */

/**
 * @swagger
 * /api/setting/email/update:
 *   put:
 *     summary: Update Email
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Channel:
 *                 type: string
 *               NewEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Email Updated  Successfully
 */

/**
 * @swagger
 * /api/profile/{channel}:
 *   get:
 *     summary: Get user profile by Phone or Email
 *     parameters:
 *       - in: path
 *         name: channel
 *         required: true
 *         schema:
 *           type: string
 *         description: channel of the user profile to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got user profile by channel
 */

/**
 * @swagger
 * /api/users/all/{creatorUserId}:
 *   get:
 *     summary: Get user Users by creatorUserId
 *     parameters:
 *       - in: path
 *         name: creatorUserId
 *         required: true
 *         schema:
 *           type: string
 *         description: creatorUserId of the user to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got user  by creatorUserId
 */


/**
 * @swagger
 * /api/encrypt/data:
 *   post:
 *     summary: Encrypt data
 *     tags: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Data Encrypted   Successfully
 */

const userRepo = container.get<UserRepository>("UserRepository");
const memberRepo = container.get<Member>("Member");
const communityRepo = container.get<Community>("Community");
const dependantRepo = container.get<Dependant>("Dependant");
const checkerRepo = container.get<checker>("checker");
const subAdminRepo = container.get<subAdmin>("subAdmin");
const baseRepo = container.get<BaseService>("BaseService");

// Set up storage for uploaded files

const fileFilter = (req: any, file: any, cb: any) => {
  // Check if the file extension is one of the allowed image formats
  const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true); // Accept the file
  } else {
    const error = new Error(
      "Only images with .png, .jpg, .jpeg, or .gif extensions are allowed"
    );

    cb(error); // Reject the file
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file
  },
});

// Create multer instance with the storage configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});


router.post('/encrypt/data', async (req: Request, res: Response) => {
  try{

  
  const reqBody = req.body
  const saltRound = 10;
  const passwordEncrypt = await bcrypt.hash(reqBody.data, saltRound);

  return res.status(200).json({status:'Success',data:passwordEncrypt})

  }catch(err){
console.log('An error occurred',err)
return res.status(400).json({status:'Success',message:'Something went wrong'})
  }

})

router.post("/login", LoginValidator, async (req: Request, res: Response) => {
  try {
    const reqBody = <loginModel>req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(HttpStatus.STATUS_400).json(error.array());
      return;
    }
    let response = <registerModel[]>(
      await userRepo.GetUserByEmailOrPhone(reqBody.Channel)
    );
    if (response?.length < 1) {
      const tempUser = await userRepo.GetTempUserByEmailOrPhone(reqBody.Channel)
   
      if(tempUser?.length > 0 && tempUser[0].TempPass === reqBody.Password){
        if(tempUser[0].PasswordUsed === 0){
          await userRepo.UpdateTempUserPasswordStatus(reqBody.Channel)
          return res.status(HttpStatus.STATUS_200).json({
            status: HttpStatus.STATUS_SUCCESS,
            message: "Activation Successful",
            IsOnboarded:'False',
            UserId: tempUser[0]?.UserId,
            Channel: reqBody.Channel,
            UserRole: tempUser[0]?.Role,
          });
        }else{
          return res.status(HttpStatus.STATUS_400).json({
            status: HttpStatus.STATUS_FAILED,
            message: "Login Password cannot be re-used as a temporary user"
          });
        }
      
      }
     return  res.status(HttpStatus.STATUS_400).json({
        status: HttpStatus.STATUS_FAILED,
        message: "Invalid Login Credentials",
      });
    
    }
  //  if(response[0].UserRole !== RolesEnum.SUPER_ADMIN){

    let IValid = await bcrypt.compare(reqBody.Password, response[0].Password);
    if (!IValid) {
      return res.status(HttpStatus.STATUS_400).json({
        status: HttpStatus.STATUS_FAILED,
        message: "Invalid Login Credentials",
      });
     
    }

  //  }else if(response[0].Password !== reqBody.Password){
  //   return res.status(HttpStatus.STATUS_400).json({
  //     status: HttpStatus.STATUS_FAILED,
  //     message: "Invalid Login Credentials",
  //   });
  //  }
    

    if (!response[0]?.IsVerified) {
      return res.status(HttpStatus.STATUS_400).json({
        status: HttpStatus.STATUS_FAILED,
        message: "Email is not yet verified",
      });
      
    }
    //generate jwt Token
    let claims = {
      Phone: response[0]?.Phone,
      Email: response[0]?.Email,
      Name: response[0].FirstName + " " + response[0].LastName,
      Role: response[0].UserRole,
    };
    const accessToken = jwtHandler.generateJWT(claims);
    const refreshToken = await jwtHandler.generateRefreshToken(reqBody.Channel);

    return res.status(HttpStatus.STATUS_200).json({
      status: HttpStatus.STATUS_SUCCESS,
      message: "Login Successful",
      UserId: response[0]?.UserId,
      Channel: reqBody.Channel,
      IsOnboarded:'True',
      UserRole: response[0]?.UserRole,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.log("An error occured", err);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, Message: "Something went wrong" });
  }
});


router.post("/super-admin/login", LoginValidator, async (req: Request, res: Response) => {
  try {
    const reqBody = <loginModel>req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(HttpStatus.STATUS_400).json(error.array());
      return;
    }
    let response = (
      await userRepo.GetSuperAdminEmailOrPhone(reqBody.Channel)
    );
    if (response?.length < 1) {
   
     return  res.status(HttpStatus.STATUS_400).json({
        status: HttpStatus.STATUS_FAILED,
        message: "Invalid Login Credentials",
      });
    
    }
   console.log('password passed',reqBody.Password)

   console.log('password on db',response[0].Password)
    
    let IValid = await bcrypt.compare(reqBody.Password, response[0].Password);
    if (!IValid) {
      return res.status(HttpStatus.STATUS_400).json({
        status: HttpStatus.STATUS_FAILED,
        message: "Invalid Login Credentials",
      });
     
    }


    // if (!response[0]?.IsVerified) {
    //   return res.status(HttpStatus.STATUS_400).json({
    //     status: HttpStatus.STATUS_FAILED,
    //     message: "Email is not yet verified",
    //   });
      
    // }
    //generate jwt Token
    let claims = {
      Phone: response[0]?.Phone,
      Email: response[0]?.Email,
      Name: response[0].FirstName + " " + response[0].LastName,
      Role: response[0].UserRole,
    };
    const accessToken = jwtHandler.generateJWT(claims);
    const refreshToken = await jwtHandler.generateRefreshToken(reqBody.Channel);

    return res.status(HttpStatus.STATUS_200).json({
      status: HttpStatus.STATUS_SUCCESS,
      message: "Login Successful",
      UserId: response[0]?.UserId,
      Channel: reqBody.Channel,
      IsOnboarded:'True',
      UserRole: response[0]?.UserRole,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.log("An error occured", err);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, Message: "Something went wrong" });
  }
});

router.post(
  "/refreshToken",
  RefreshTokenValidator,
  async (req: Request, res: Response) => {
    try {
      const reqBody = <refreshTokenRequestmodel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }
      let response = <registerModel[]>(
        await userRepo.GetUserByEmailOrPhone(reqBody.Channel)
      );
      if (response?.length < 1) {
        res.status(HttpStatus.STATUS_404).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Email does not exist as a registered user, Please register",
        });
        return;
      }

      //Validate jwt Token

      let IsExist = response.find(
        (c) => c.RefreshToken === reqBody.RefreshToken
      );
      if (!IsExist) {
        res
          .status(HttpStatus.STATUS_401)
          .json({ status: HttpStatus.STATUS_FAILED, message: "UnAuthorized" });
        return;
      }
      let IsValid = await jwtHandler.IsValidToken(reqBody.RefreshToken);
      if (!isValid) {
        res.status(HttpStatus.STATUS_403).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Invalid Refresh Token",
        });
        return;
      }
      //generate jwt Token
      const accessToken = jwtHandler.generateJWT(response[0]);
      const refreshToken = await jwtHandler.generateRefreshToken(
        response[0].Phone
      );
      return res.status(HttpStatus.STATUS_200).json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Token Generated Successfully",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (err) {
      console.log("An error occured", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        Message: "Something went wrong",
      });
    }
  }
);

router.post(
  "/register",
  upload.single("file"),
  validator,
  async (req: any, res: any) => {
    try {
      if (req.fileValidationError) {
        return res
          .status(400)
          .json({ message: req.fileValidationError.message });
      }

      const reqBody = <registerModel>req.body;

      //console.log('file Path',req.protocol + '://' + req.get('host') +req?.file?.path.replace('public',''))
      //reqBody.PhotoPath = req.protocol + '://' + req.get('host') +req?.file?.path.replace('public','')
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }
      if (!(reqBody?.UserRole?.toUpperCase() in RolesEnum)) {
        return res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Invalid user role passed",
        });
      }
      let userData = <registerModel[]>(
        await userRepo.GetUserByPhone(reqBody.Phone)
      );
      if (userData?.length > 0) {
        return res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "User with this Phone number already exist",
        });
      }
      //start switch case
      switch (reqBody.UserRole.toUpperCase()) {
        case RolesEnum.CHECKER:
          let checker = await checkerRepo.getCheckersByPhoneOrEmail(
            reqBody.Phone
          );
          if (checker?.length < 1) {
            return res.status(HttpStatus.STATUS_400).json({
              status: HttpStatus.STATUS_FAILED,
              message: "Checker is not yet created. Please contact Admin",
            });
          }

          break;

        case RolesEnum.COMMUNITY_ADMIN:
          break;

        case RolesEnum.MEMBER:
          let member = await memberRepo.GetMemberByPhoneOrEmail(reqBody.Phone);
          if (member?.length < 1) {
            return res.status(HttpStatus.STATUS_400).json({
              status: HttpStatus.STATUS_FAILED,
              message: "Member is not yet created. Please contact Admin",
            });
          }
          break;

        case RolesEnum.SUB_ADMIN:
          let subAdmin = await subAdminRepo.GetSubAdminByPhoneOrEmail(reqBody.Phone);
          if (subAdmin?.length < 1) {
            return res.status(HttpStatus.STATUS_400).json({
              status: HttpStatus.STATUS_FAILED,
              message: "subAdmin is not yet created. Please contact Admin",
            });
          }
          break;

        case RolesEnum.DEPENDANT:
          let dependant = await dependantRepo.GetDependantByPhoneOrEmail(
            reqBody.Phone
          );
          if (dependant?.length < 1) {
            return res.status(HttpStatus.STATUS_400).json({
              status: HttpStatus.STATUS_FAILED,
              message: "Dependant is not yet created. Please contact Admin",
            });
          }
          break;
      }

      //end switch case

      if (req.file?.path !== undefined) {
        cloudinary.uploader.upload(
          req.file.path,
          async (error: any, result: any) => {
            if (error) {
              // Handle error
              console.error(error);
              return res
                .status(500)
                .json({ status: "Failed", message: "File Upload failed" });
            }
            // File uploaded successfully, send back URL
            console.log("photo url:", result.secure_url);
            reqBody.PhotoPath = result.secure_url;
            let response = await userRepo.createUser(reqBody);
            if (response?.status?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
              return res.status(HttpStatus.STATUS_400).json({
                status: response.status,
                message: "Error registering user",
              });
            }
            return res.status(HttpStatus.STATUS_200).json({
              status: response.status,
              message: "Successfully registered user",
              data: reqBody,
            });
          }
        );
      } else {
        reqBody.PhotoPath = "";
        let response = await userRepo.createUser(reqBody);
        if (response?.status?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
          return res.status(HttpStatus.STATUS_400).json({
            status: response.status,
            message: "Error registering user",
          });
        }
        return res.status(HttpStatus.STATUS_200).json({
          status: response.status,
          message: "Successfully registered user",
          data: reqBody,
        });
      }
    } catch (err) {
      console.log("error creating user at controller side", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        message: "Something went wrong",
      });
    }
  }
);

router.put(
  "/setting/profile/update/:channel",
  upload.single("file"),
  UpdateUserValidator,
  async (req: any, res: any) => {
    try {
      const param = req.params.channel;
      if (req.fileValidationError) {
        return res
          .status(400)
          .json({ message: req.fileValidationError.message });
      }

      const reqBody = <updateUserModel>req.body;

      //console.log('file Path',req.protocol + '://' + req.get('host') +req?.file?.path.replace('public',''))
      //reqBody.PhotoPath = req.protocol + '://' + req.get('host') +req?.file?.path.replace('public','')
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }
      // if(!(reqBody?.UserRole?.toUpperCase() in RolesEnum)){
      //   return res.status(HttpStatus.STATUS_400).json({status: HttpStatus.STATUS_FAILED,message:'Invalid user role passed'})
      // }
      // let userData = <registerModel[]>await userRepo.GetUserByEmailOrPhone(param)
      // if(userData?.length > 0){
      //     return res.status(HttpStatus.STATUS_400).json({status: HttpStatus.STATUS_FAILED,message:'User with this Phone number already exist'})

      // }
      //start switch case
      // switch(reqBody.UserRole.toUpperCase()){
      //   case RolesEnum.CHECKER:
      //    let checker = await  checkerRepo.getCheckersByPhoneOrEmail(reqBody.Phone)
      //    if(checker?.length < 1){
      //     return res.status(HttpStatus.STATUS_400).json({status: HttpStatus.STATUS_FAILED,message:'Checker is not yet created. Please contact Admin'})
      //     }

      //     break;

      //   case RolesEnum.COMMUNITY_ADMIN:

      //     break;

      //   case RolesEnum.MEMBER:
      //     let member = await  memberRepo.GetMemberByPhoneOrEmail(reqBody.Phone)
      //    if(member?.length < 1){
      //     return res.status(HttpStatus.STATUS_400).json({status: HttpStatus.STATUS_FAILED,message:'Member is not yet created. Please contact Admin'})
      //     }
      //     break;

      //   case RolesEnum.SUB_ADMIN:

      //     break;

      //   case RolesEnum.DEPENDANT:
      //     let dependant = await  dependantRepo.GetDependantByPhoneOrEmail(reqBody.Phone)
      //    if(dependant?.length < 1){
      //     return res.status(HttpStatus.STATUS_400).json({status: HttpStatus.STATUS_FAILED,message:'Dependant is not yet created. Please contact Admin'})
      //     }
      //     break;

      // }

      //end switch case
      if (req?.file?.path !== undefined) {
        cloudinary.uploader.upload(
          req.file.path,
          async (error: any, result: any) => {
            if (error) {
              // Handle error
              console.error(error);
              return res
                .status(500)
                .json({ status: "Failed", message: "File Upload failed" });
            }
            // File uploaded successfully, send back URL
            console.log("photo url:", result.secure_url);
            reqBody.PhotoPath = result.secure_url;
            let response = await userRepo.updateUser(param, reqBody);
            if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
              return res.status(HttpStatus.STATUS_400).json({
                status: HttpStatus.STATUS_FAILED,
                message: "Error Updating user",
              });
            }
            return res.status(HttpStatus.STATUS_200).json({
              status: HttpStatus.STATUS_SUCCESS,
              message: "Successfully Updated user",
              data: reqBody,
            });
          }
        );
      } else {
        reqBody.PhotoPath = "";
        let response = await userRepo.updateUser(param, reqBody);
        if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
          return res.status(HttpStatus.STATUS_400).json({
            status: HttpStatus.STATUS_FAILED,
            message: "Error Updating user",
          });
        }
        return res.status(HttpStatus.STATUS_200).json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Successfully Updated user",
          data: reqBody,
        });
      }
    } catch (err) {
      console.log("error creating user at controller side", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        message: "Something went wrong",
      });
    }
  }
);

router.post(
  "/register/sendMail",
  EmailValidator,
  async (req: Request, res: Response) => {
    try {
      var reqBody = <mailRequestModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }
      //check if user exist
      let userRes = <registerModel[]>(
        await userRepo.GetUserByEmailOrPhone(reqBody.Channel)
      );
      if (userRes?.length < 1) {
        res.status(HttpStatus.STATUS_404).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Invalid Channel passed",
        });
        return;
      }
      //store in database
      let token = Math.floor(100000 + Math.random() * 900000);
      let response = await userRepo.AddToken(
        reqBody.Channel,
        "EmailVerify",
        token.toString(),
        reqBody.Medium
      );

      if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: `${reqBody.Medium} sending failed, please try again`,
        });
        return;
      }
      //Start sending sms or email
      let emailSMSResult = false;
      const message = `Please use the token sent to you for validation: \n Token Value is: ${token.toString()}`;
      if (reqBody.Medium.toLowerCase() === "sms") {
        emailSMSResult = await SMSHandler(reqBody.Channel, message);
      } else {
        const emailMessage = `<!DOCTYPE html><html><body><h2>Dear Customer</h2><p><b>A token request was sent using your Email address. Please ignore if not requested by you </b></p><p class="demo">Please use the token below to complete your verify. <br><br> <b>Token:</b> ${token}</p></body></html>`;
        emailSMSResult = await SendMail(`${reqBody.Channel}`, emailMessage);
      }

      if (!emailSMSResult) {
        return res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: `${reqBody.Medium} sending failed, please try again`,
        });
      }
      return res.status(HttpStatus.STATUS_200).json({
        status: HttpStatus.STATUS_SUCCESS,
        message: `Token sent successfully Via ${reqBody.Medium}`,
        Channel: `${reqBody.Channel}`,
        Medium: `${reqBody.Medium}`,
      });
    } catch (err) {
      console.log("error creating user at controller side", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        message: "Something went wrong",
      });
    }
  }
);

router.post(
  "/register/verify",
  VerifyEmailValidator,
  async (req: Request, res: Response) => {
    try {
      var reqBody = <mailVerifyModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }
      //comment this when going to production environment
      if (reqBody.Token === "000000") {
        let testResult = await userRepo.UpdateUserTokenTest(
          reqBody.Channel,
          "EmailVerify"
        );
        if (testResult?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
          res.status(HttpStatus.STATUS_400).json({
            status: HttpStatus.STATUS_FAILED,
            message: "Email Verification Failed, Please try again",
          });
          return;
        }
        return res.status(HttpStatus.STATUS_200).json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Email Verification Successful, please proceed to login",
        });
      }

      //check if user exist
      let userRes = <registerModel[]>(
        await userRepo.GetUserByEmailOrPhone(reqBody.Channel)
      );
      if (userRes?.length < 1) {
        res.status(HttpStatus.STATUS_404).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Invalid Channel passed",
        });
        return;
      }
      //Get Token from Db

      let response = <userToken[]>(
        await userRepo.GetUserToken(reqBody.Channel, "EmailVerify")
      );
      if (response?.length < 1) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Email Verification Failed, Please try again",
        });
        return;
      }
      let tokenRes = response?.find(
        (c) => c.Token === reqBody.Token && c.Used == false
      );
      console.log("token response", tokenRes);
      //verify token
      if (!tokenRes) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Token Verification Failed",
        });
        return;
      }

      let result = await userRepo.UpdateUserToken(
        reqBody.Channel,
        "EmailVerify"
      );
      if (result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Email Verification Failed, Please try again",
        });
        return;
      }
      return res.status(HttpStatus.STATUS_200).json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Email Verification Successful, please proceed to login",
      });

      //comment this when going to production environment
      // if(reqBody.Token === '000000'){
      //   let result = await  userRepo.UpdateUserTokenTest(reqBody.Channel,'EmailVerify')
      //   if(result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){
      //     res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
      //     return;
      // }
      // res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Email Verification Successful, please proceed to login'})

      // }else{
      //   res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
      // }
    } catch (err) {
      console.log("An error occurred verifying token", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        message: "Something went wrong",
      });
    }
  }
);

router.post(
  "/forgotPassword/sendMail",
  ForgotPasswordValidator,
  async (req: Request, res: Response) => {
    try {
      var reqBody = <forgotPasswordRequestmodel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
      } else {
        let response = <registerModel[]>(
          await userRepo.GetUserByEmailOrPhone(reqBody.Channel)
        );
        if (response?.length < 1) {
          res.status(HttpStatus.STATUS_404).json({
            status: HttpStatus.STATUS_FAILED,
            message: "Invalid Channel passed",
          });
          return;
        }
     
        let DOBCheck =
          dateFormatter(response[0].DOB) === dateFormatter(reqBody.DOB)
            ? true
            : false;
        if (!DOBCheck) {
          res.status(HttpStatus.STATUS_400).json({
            status: HttpStatus.STATUS_FAILED,
            message: "invalid Date of Birth",
          });
          return;
        }

        
        let token = Math.floor(100000 + Math.random() * 900000);
        let result = await userRepo.AddToken(
          reqBody.Channel,
          "ForgotPassword",
          token.toString(),
          reqBody.Medium
        );
        if (result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
          res.status(HttpStatus.STATUS_400).json({
            status: HttpStatus.STATUS_FAILED,
            message: `${reqBody.Medium} sending failed, please try again`,
          });
          return;
        }

        //Send Email Implementation
        let emailSMSResult = false;
        const message = `Please use the token sent to you for validation: \\n Token Value is: ${token.toString()}`;
        if (reqBody.Medium.toLowerCase() === "sms") {
          emailSMSResult = await SMSHandler(reqBody.Channel, message);
        } else {
          emailSMSResult = await SendMail(`${reqBody.Channel}`, message);
        }

        if (!emailSMSResult) {
          return res.status(HttpStatus.STATUS_400).json({
            status: HttpStatus.STATUS_FAILED,
            message: `${reqBody.Medium} sending failed, please try again`,
          });
        }
        return res.status(HttpStatus.STATUS_200).json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Email Sent Successfully",
          Channel: `${reqBody.Channel}`,
          Medium: `${reqBody.Medium}`,
        });
      }
    } catch (err) {
      console.log("An error occurred sending mail/sms", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        message: "Something went wrong",
      });
    }
  }
);

router.post(
  "/super-admin/forgotPassword/sendMail",
  ForgotPasswordValidator,
  async (req: Request, res: Response) => {
    try {
      var reqBody = <forgotPasswordRequestmodel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
      } else {
        let response = <registerModel[]>(
          await baseRepo.GetSuperAdminByPhoneOrEmail(reqBody.Channel)
        );
        if (response?.length < 1) {
          res.status(HttpStatus.STATUS_404).json({
            status: HttpStatus.STATUS_FAILED,
            message: "Invalid Channel passed",
          });
          return;
        }
     
        let DOBCheck =
          dateFormatter(response[0].DOB) === dateFormatter(reqBody.DOB)
            ? true
            : false;
        if (!DOBCheck) {
          res.status(HttpStatus.STATUS_400).json({
            status: HttpStatus.STATUS_FAILED,
            message: "invalid Date of Birth",
          });
          return;
        }

        
        let token = Math.floor(100000 + Math.random() * 900000);
        let result = await userRepo.AddToken(
          reqBody.Channel,
          "ForgotPassword",
          token.toString(),
          reqBody.Medium
        );
        if (result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
          res.status(HttpStatus.STATUS_400).json({
            status: HttpStatus.STATUS_FAILED,
            message: `${reqBody.Medium} sending failed, please try again`,
          });
          return;
        }

        //Send Email Implementation
        let emailSMSResult = false;
        const message = `Please use the token sent to you for validation: \\n Token Value is: ${token.toString()}`;
        if (reqBody.Medium.toLowerCase() === "sms") {
          emailSMSResult = await SMSHandler(reqBody.Channel, message);
        } else {
          emailSMSResult = await SendMail(`${reqBody.Channel}`, message);
        }

        if (!emailSMSResult) {
          return res.status(HttpStatus.STATUS_400).json({
            status: HttpStatus.STATUS_FAILED,
            message: `${reqBody.Medium} sending failed, please try again`,
          });
        }
        return res.status(HttpStatus.STATUS_200).json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Email Sent Successfully",
          Channel: `${reqBody.Channel}`,
          Medium: `${reqBody.Medium}`,
        });
      }
    } catch (err) {
      console.log("An error occurred sending mail/sms", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        message: "Something went wrong",
      });
    }
  }
);

router.post(
  "/forgotPassword/verify",
  ForgotPasswordVerifyValidator,
  async (req: Request, res: Response) => {
    try {
      var reqBody = <forgotPasswordVerifyModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }

      //comment this when going to production environment
      if (reqBody.Token === "000000") {
        let testResult = await userRepo.UpdateUserTokenTest(
          reqBody.Channel,
          "EmailVerify"
        );
        if (testResult?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
          res.status(HttpStatus.STATUS_400).json({
            status: HttpStatus.STATUS_FAILED,
            message: "Verification Failed, Please try again",
          });
          return;
        }
        return res.status(HttpStatus.STATUS_200).json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Verification Successful",
        });
      }

      //check if user exist
      let userRes = <registerModel[]>(
        await userRepo.GetUserByEmailOrPhone(reqBody.Channel)
      );
      if (userRes?.length < 1) {
        res.status(HttpStatus.STATUS_404).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Invalid Channel passed",
        });
        return;
      }
      //Get Token from Db
      let response = <userToken[]>(
        await userRepo.GetUserToken(reqBody.Channel, "ForgotPassword")
      );
      if (response?.length < 1) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Verification Failed, Please try again",
        });
        return;
      }
      let tokenRes = response.find(
        (c) => c.Token === reqBody.Token && c.Used == false
      );
      console.log("token response value", tokenRes);
      //verify token
      if (!tokenRes) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Token Verification Failed",
        });
        return;
      }
      let result = await userRepo.UpdateUserToken(
        reqBody.Channel,
        "ForgotPassword"
      );
      console.log("token update result:", tokenRes);
      if (result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "forgot Password Verification Failed, Please try again",
        });
        return;
      }
      return res.status(HttpStatus.STATUS_200).json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "forgot Password Verification Successful",
        Email: reqBody.Channel,
      });

      //  //comment this when going to production environment
      //  if(reqBody.Token === '000000'){
      //   let result = await  userRepo.UpdateUserTokenTest(reqBody.Channel,'EmailVerify')
      //   if(result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){
      //     res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
      //     return;
      // }
      // res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Email Verification Successful, please proceed to login'})

      // }else{
      //   res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
      // }
    } catch (err) {
      console.log("An error occurred verifying token", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        message: "Something went wrong",
      });
    }
  }
);

router.post(
  "/super-admin/forgotPassword/verify",
  ForgotPasswordVerifyValidator,
  async (req: Request, res: Response) => {
    try {
      var reqBody = <forgotPasswordVerifyModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }

      //comment this when going to production environment
      if (reqBody.Token === "000000") {
        let testResult = await userRepo.UpdateUserTokenTest(
          reqBody.Channel,
          "EmailVerify"
        );
        if (testResult?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
          res.status(HttpStatus.STATUS_400).json({
            status: HttpStatus.STATUS_FAILED,
            message: "Verification Failed, Please try again",
          });
          return;
        }
        return res.status(HttpStatus.STATUS_200).json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Verification Successful",
        });
      }

      //check if user exist
      let userRes = <registerModel[]>(
        await baseRepo.GetSuperAdminByPhoneOrEmail(reqBody.Channel)
      );
      if (userRes?.length < 1) {
        res.status(HttpStatus.STATUS_404).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Invalid Channel passed",
        });
        return;
      }
      //Get Token from Db
      let response = <userToken[]>(
        await userRepo.GetUserToken(reqBody.Channel, "ForgotPassword")
      );
      if (response?.length < 1) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Verification Failed, Please try again",
        });
        return;
      }
      let tokenRes = response.find(
        (c) => c.Token === reqBody.Token && c.Used == false
      );
      console.log("token response value", tokenRes);
      //verify token
      if (!tokenRes) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Token Verification Failed",
        });
        return;
      }
      let result = await userRepo.UpdateUserToken(
        reqBody.Channel,
        "ForgotPassword"
      );
      console.log("token update result:", tokenRes);
      if (result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "forgot Password Verification Failed, Please try again",
        });
        return;
      }
      return res.status(HttpStatus.STATUS_200).json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "forgot Password Verification Successful",
        Email: reqBody.Channel,
      });

      //  //comment this when going to production environment
      //  if(reqBody.Token === '000000'){
      //   let result = await  userRepo.UpdateUserTokenTest(reqBody.Channel,'EmailVerify')
      //   if(result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){
      //     res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
      //     return;
      // }
      // res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Email Verification Successful, please proceed to login'})

      // }else{
      //   res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
      // }
    } catch (err) {
      console.log("An error occurred verifying token", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        message: "Something went wrong",
      });
    }
  }
);

router.post(
  "/resetPassword",
  resetPasswordValidator,
  async (req: Request, res: Response) => {
    try {
      var reqBody = <resetPasswordRequestModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }

      let response = <registerModel[]>(
        await userRepo.GetUserByEmailOrPhone(reqBody.Channel)
      );
      if (response?.length < 1) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Email Verification Failed, Please try again",
        });
        return;
      }

      let result = await userRepo.UpdateUserPassword(
        reqBody.NewPassword,
        reqBody.Channel
      );
      if (result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Reset Password Failed, Please try again",
        });
        return;
      }
      return res.status(HttpStatus.STATUS_200).json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Password Reset Successful, Please proceed to login",
      });
    } catch (err) {
      console.log("An error occurred resetting password", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        message: "Something went wrong",
      });
    }
  }
);

router.post(
  "/super-admin/resetPassword",
  resetPasswordValidator,
  async (req: Request, res: Response) => {
    try {
      var reqBody = <resetPasswordRequestModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }

      let response = (
        await baseRepo.GetSuperAdminByPhoneOrEmail(reqBody.Channel)
      );
      if (response?.length < 1) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Email Verification Failed, Please try again",
        });
        return;
      }

      let result = await userRepo.UpdateAdminUserPassword(
        reqBody.NewPassword,
        reqBody.Channel
      );
      if (result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Reset Password Failed, Please try again",
        });
        return;
      }
      return res.status(HttpStatus.STATUS_200).json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Password Reset Successful, Please proceed to login",
      });
    } catch (err) {
      console.log("An error occurred resetting password", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        message: "Something went wrong",
      });
    }
  }
);


router.post(
  "/super-admin/createPassword",
  createPasswordValidator,
  async (req: Request, res: Response) => {
    try {
      var reqBody = <createPasswordRequestModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }

      let response = <registerModel[]>(
        await userRepo.GetUserByEmailOrPhone(reqBody.Channel)
      );
      if (
        response?.length > 0 &&
        response[0].UserRole.toUpperCase() === RolesEnum.SUPER_ADMIN
      ) {
        let result = await userRepo.UpdateUserPassword(
          reqBody.Password,
          reqBody.Channel
        );
        if (result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
          res.status(HttpStatus.STATUS_400).json({
            status: HttpStatus.STATUS_FAILED,
            message: "Error creating password for Super Admin",
          });
          return;
        }
        return res.status(HttpStatus.STATUS_200).json({
          status: HttpStatus.STATUS_SUCCESS,
          message:
            "Super Admin Password Created Successful, Please proceed to login",
        });
      }
      return res.status(HttpStatus.STATUS_400).json({
        status: HttpStatus.STATUS_FAILED,
        message: "Super Admin is not created yet",
      });
    } catch (err) {
      console.log("An error occurred resetting password", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        message: "Something went wrong",
      });
    }
  }
);

router.post(
  "/createPassword",
  createPasswordValidator,
  async (req: Request, res: Response) => {
    try {
      var reqBody = <createPasswordRequestModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }

      let response = <registerModel[]>(
        await userRepo.GetUserByEmailOrPhone(reqBody.Channel)
      );
      if (response?.length < 1) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Email Verification Failed, Please try again",
        });
        return;
      }

      let result = await userRepo.CreatePassword(reqBody);
      if (result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Password Create Failed, Please try again",
        });
        return;
      }
      return res.status(HttpStatus.STATUS_200).json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Password Created Successful, Please proceed to login",
      });
    } catch (err) {
      console.log("An error occurred resetting password", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        message: "Something went wrong",
      });
    }
  }
);

router.put(
  "/setting/password/update",
  updatePasswordValidator,
  async (req: Request, res: Response) => {
    try {
      var reqBody = <updatePasswordRequestModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }

      let response = <registerModel[]>(
        await userRepo.GetUserByEmailOrPhone(reqBody.Phone)
      );
      if (response?.length < 1) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Phone Number Verification Failed, Please try again",
        });
        return;
      }
      if (!(await bcrypt.compare(reqBody.OldPassword, response[0].Password))) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Old Password does not match current password",
        });
        return;
      }

      let result = await userRepo.UpdatePassword(reqBody);
      if (result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Password Update Failed, Please try again",
        });
        return;
      }
      return res.status(HttpStatus.STATUS_200).json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Password Updated Successful",
      });
    } catch (err) {
      console.log("An error occurred resetting password", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        message: "Something went wrong",
      });
    }
  }
);

router.delete(
  "/setting/account/delete/:Id",
  async (req: Request, res: Response) => {
    try {
      var param = req.params.Id;

      let result = await userRepo.DeleteAccount(Number(param));
      if (result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Account Delete Failed, Please try again",
        });
        return;
      }
      return res.status(HttpStatus.STATUS_200).json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Account Deleted Successful",
      });
    } catch (err) {
      console.log("An error occurred resetting password", err);
      return res.status(HttpStatus.STATUS_500).json({
        status: HttpStatus.STATUS_500,
        message: "Something went wrong",
      });
    }
  }
);

router.put("/setting/email/update", async (req: Request, res: Response) => {
  try {
    var reqBody = <UpdateEmailModel>req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(HttpStatus.STATUS_400).json(error.array());
      return;
    }

    let response = <registerModel[]>(
      await userRepo.GetUserByEmailOrPhone(reqBody.Channel)
    );
    if (
      response?.length > 0 &&
      response[0].UserRole.toUpperCase() in RolesEnum
    ) {
      let result = await userRepo.UpdateEmail(reqBody);
      if (result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        res.status(HttpStatus.STATUS_400).json({
          status: HttpStatus.STATUS_FAILED,
          message: "Error Updating Email",
        });
        return;
      }
      return res.status(HttpStatus.STATUS_200).json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Email Updated Successful,",
      });
    }
    return res.status(HttpStatus.STATUS_400).json({
      status: HttpStatus.STATUS_FAILED,
      message: "Email Update Failed",
    });
  } catch (err) {
    console.log("An error occurred resetting password", err);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.get("/profile/:channel", Authorize, async (req, res) => {
  try {
    const param = req?.params?.channel;
    if (!param) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({ status: HttpStatus.STATUS_FAILED, message: "Invalid Id" });
    }
    var response = await userRepo.GetUserByEmailOrPhone(param);
    if (response?.length < 1) {
      return res.status(HttpStatus.STATUS_404).json({
        status: HttpStatus.STATUS_FAILED,
        message: "Failed to fetch UserDetails",
      });
    }
    return res.status(HttpStatus.STATUS_200).json({
      status: HttpStatus.STATUS_SUCCESS,
      message: "Successfully fetch UserDetails",
      data: response[0],
    });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.get("/users/all/:creatorUserId", Authorize, async (req, res) => {
  try {
    const param = req?.params?.creatorUserId;
    if (!param) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({ status: HttpStatus.STATUS_FAILED, message: "Invalid Id" });
    }
    var response = await userRepo.GetUserByCreatorUserId(param);
    if (response?.length < 1) {
      return res.status(HttpStatus.STATUS_404).json({
        status: HttpStatus.STATUS_FAILED,
        message: "Failed to fetch UserDetails",
      });
    }
    return res.status(HttpStatus.STATUS_200).json({
      status: HttpStatus.STATUS_SUCCESS,
      message: "Successfully fetch UserDetails",
      data: response,
    });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

export default router;
