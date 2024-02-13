import express, { Request,Response } from 'express'
import loginModel from '../model/loginModel'
//import userRepo from '../repository/UserRepository'
import registerModel from '../model/registerModel'
import  { EmailValidator, ForgotPasswordValidator, ForgotPasswordVerifyValidator, LoginValidator, RefreshTokenValidator, VerifyEmailValidator, resetPasswordValidator, validate,validator } from '../utilities/registerValidator'
import { body, validationResult } from 'express-validator'
import mailRequestModel from '../model/mailRequestModel'
import mailVerifyModel from '../model/MailVerifyModel'
import bcrypt from 'bcrypt'
import forgotPasswordRequestmodel from '../model/forgotPasswordModel'
import forgotPasswordVerifyModel from '../model/forgotPasswordVerifyModel'
import { HttpStatus } from '../utilities/HttpstatusCode'
import userToken from '../model/DTOs/userToken'
import { format } from 'date-fns/format'
import { dateFormatter } from '../utilities/dateFormatter'
import resetPasswordRequestModel from '../model/resetPasswordRequestModel'
import jwtHandler from '../utilities/jwtHandler'
import refreshTokenRequestmodel from '../model/refreshTokenRequestModel'
import { isValid } from 'date-fns'
import { SendMail } from '../utilities/EmailHandler'
import SMSHandler from '../utilities/SMSHandler'
import {container} from '../Container/appContainer'
import  multer from 'multer';
import UserRepository from '../repository/Abstraction/UserRepository'
const router = express.Router()

const userRepo = container.get<UserRepository>('UserRepository')


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
 *             Token: 000000
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
 *               NewPassword:
 *                 type: string
 *               ConfirmPassword:
 *                 type: string
  *               Channel:
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











// Set up storage for uploaded files

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file
  }
});

// Create multer instance with the storage configuration
const upload = multer({ storage: storage });

router.get('',(req,res)=>{
  res.send("Welcome to VSURED Api Platform")
})

router.post('/login',LoginValidator,async(req:Request,res:Response)=>{
    const reqBody = <loginModel>req.body
    const error = validationResult(req)
        if(!error.isEmpty()){
          res.status(HttpStatus.STATUS_200).json(error.array())
          return;
        }
            let response = <registerModel[]> await  userRepo.GetUserByEmailOrPhone(reqBody.Channel)
            if(response?.length < 1){

                res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'invalid Phone Number or Password'})
                return;

            }

                let IValid = await bcrypt.compare(reqBody.Password,response[0].Password)
               if(!IValid){
                res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Login Credentials'})
                return;
               }

                if(!response[0]?.IsVerified){
                    res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email is not yet verified'})
                    return;
                }
                //generate jwt Token
                let claims = {
                  Phone:response[0]?.Phone,
                  Email: response[0]?.Email,
                  Name:  response[0].FirstName + ' ' + response[0].LastName
                }
                const accessToken = jwtHandler.generateJWT(claims)
                const refreshToken = await jwtHandler.generateRefreshToken(reqBody.Channel)
                 
               res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Login Successful',accessToken:accessToken,refreshToken:refreshToken})
               
    
    

})


router.post('/refreshToken',RefreshTokenValidator,async(req:Request,res:Response)=>{
  const reqBody = <refreshTokenRequestmodel>req.body
  const error = validationResult(req)
      if(!error.isEmpty()){
        res.status(HttpStatus.STATUS_200).json(error.array())
        return;
      }
          let response = <registerModel[]> await userRepo.GetUserByEmailOrPhone(reqBody.Channel)
          if(response?.length < 1){

              res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Email does not exist as a registered user, Please register'})
              return;

          }

         
              //Validate jwt Token

              let IsExist = response.find(c=>c.RefreshToken === reqBody.RefreshToken)
              if(!IsExist){
                res.status(HttpStatus.STATUS_401).json({status:HttpStatus.STATUS_FAILED,message:'UnAuthorized'})
                return;
              }
              let IsValid = await jwtHandler.IsValidToken(reqBody.RefreshToken)
              if(!isValid){
                res.status(HttpStatus.STATUS_403).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Refresh Token'})
                return;
              }
               //generate jwt Token
               const accessToken = jwtHandler.generateJWT(response[0])
               const refreshToken = await jwtHandler.generateRefreshToken(response[0].Phone)
             res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Token Generated Successfully',accessToken:accessToken,refreshToken:refreshToken})
             
  

})


router.post('/register',upload.single('file'),validator,
async (req:any,res:any)=>{
    try{
        const reqBody = <registerModel>req.body

        //console.log('file Path',req.protocol + '://' + req.get('host') + req.originalUrl+'/'+req?.file?.path)
        reqBody.PhotoPath = req?.file?.path || ''
        const error = validationResult(req)
        if(!error.isEmpty()){
          res.status(HttpStatus.STATUS_400).json(error.array())
          return;
        }
            let userData = <registerModel[]>await userRepo.GetUserByPhone(reqBody.Phone)
            if(userData.length > 0){
                res.status(HttpStatus.STATUS_400).json({status: HttpStatus.STATUS_FAILED,message:'User with this Phone number already exist'})
                return;
            }

          let response = await userRepo.createUser(reqBody)
          if(response?.status?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){
            res.status(HttpStatus.STATUS_400).json({status: response.status,message:'Error registering user'})
            return;
          }
          res.status(HttpStatus.STATUS_200).json({status:response.status,message:'Successfully registered user',data:reqBody})

     

    }
    catch(err){
        console.log('error creating user at controller side',err)
    }
   

})

router.post('/register/sendMail',EmailValidator,async(req:Request,res:Response)=>{
     var reqBody = <mailRequestModel>req.body
     const error = validationResult(req)
    if(!error.isEmpty()){
      res.status(HttpStatus.STATUS_400).json(error.array())
      return;
    }
    //     //store in database
    //     let token = Math.floor(100000 + Math.random() * 900000);
    //     let response = await userRepo.AddToken(reqBody.Channel,'EmailVerify',token.toString(),reqBody.Medium)
  
    // if(response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){
    //   res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:`${reqBody.Medium} sending failed, please try again`})
    //   return;
    // }
    // //Start sending sms or email
    // let emailSMSResult = false
    // const message = `Please use the token sent to you for validation: \\n Token Value is: ${token.toString()}`
    // if(reqBody.Medium.toLowerCase() === 'sms'){
    //    emailSMSResult =  await SMSHandler(reqBody.Channel,message)

    // }else{
    //   emailSMSResult= await SendMail(`${reqBody.Channel}`,message)
    // }
    
    // if(!emailSMSResult){
    //   return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:`${reqBody.Medium} sending failed, please try again`})
    // }
     return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:`Token sent successfully Via ${reqBody.Medium}`,Channel:`${reqBody.Channel}`})

    
})

router.post('/register/verify',VerifyEmailValidator,async(req:Request,res:Response)=>{
    var reqBody = <mailVerifyModel>req.body
    const error = validationResult(req)
    if(!error.isEmpty()){
      res.status(HttpStatus.STATUS_400).json(error.array())
      return;
    }
        //Get Token from Db

    // let response = <userToken[]>await userRepo.GetUserToken(reqBody.Channel,'EmailVerify')
    // if(response?.length < 1){
    //    res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
    //    return;
    // }
    //    let tokenRes = response?.find(c=>c.Token === reqBody.Token && c.Used == false)
    //    console.log('token response',tokenRes)
    //      //verify token
    // if(!tokenRes){
    //     res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Token Verification Failed'})
    //     return;
    // }
   

        //let result = await  userRepo.UpdateUserToken(reqBody.Channel,'EmailVerify')
        // if(result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){
        //     res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
        //     return;
        // }
        // res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Email Verification Successful, please proceed to login'})
       

        
         //comment this when going to production environment
        if(reqBody.Token === '000000'){
          let result = await  userRepo.UpdateUserTokenTest(reqBody.Channel,'EmailVerify')
          if(result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){
            res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
            return;
        }
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Email Verification Successful, please proceed to login'})
       
        }else{
          res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
        }
   
    
})

router.post('/forgotPassword/sendMail',ForgotPasswordValidator,async(req:Request,res:Response)=>{
    var reqBody = <forgotPasswordRequestmodel>req.body
    const error = validationResult(req)
    if(!error.isEmpty()){
      res.status(HttpStatus.STATUS_400).json(error.array())
    }else{

        // let response = <registerModel[]>await userRepo.GetUserByEmailOrPhone(reqBody.Channel)
        // if(response?.length < 1){

        //     res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Email Address'})
        //     return;
        // }
        // console.log('response DBO',dateFormatter(response[0].DOB))
        // console.log('iNPUT DBO',dateFormatter(reqBody.DOB) )
        //   let DOBCheck = dateFormatter(response[0].DOB) === dateFormatter(reqBody.DOB) ? true : false
        //   if(!DOBCheck){

        //     res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'invalid Date of Birth'})
        //     return;
        //   }
        //   let token = Math.floor(100000 + Math.random() * 900000);
        //     let result = await userRepo.AddToken(reqBody.Channel,'ForgotPassword',token.toString(),reqBody.Medium)
        //     if(result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){
        //         res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:`${reqBody.Medium} sending failed, please try again`})
        //         return;
        //       }

        //         //Send Email Implementation
        //         let emailSMSResult = false
        //         const message = `Please use the token sent to you for validation: \\n Token Value is: ${token.toString()}`
        //         if(reqBody.Medium.toLowerCase() === 'sms'){
        //           emailSMSResult =  await SMSHandler(reqBody.Channel,message)

        //         }else{
        //           emailSMSResult= await SendMail(`${reqBody.Channel}`,message)
        //         }
                
        //         if(!emailSMSResult){
        //           return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:`${reqBody.Medium} sending failed, please try again`})
        //         }
                return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Email Sent Successfully'})

       

    }
   
})

router.post('/forgotPassword/verify',ForgotPasswordVerifyValidator,async(req:Request,res:Response)=>{
    var reqBody = <forgotPasswordVerifyModel>req.body
    const error = validationResult(req)
    if(!error.isEmpty()){
      res.status(HttpStatus.STATUS_400).json(error.array())
      return;
    }
        //Get Token from Db
    // let response = <userToken[]>await userRepo.GetUserToken(reqBody.Channel,'ForgotPassword')
    // if(response?.length < 1){
    //    res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
    //    return;
    // }
    // let tokenRes = response.find(c=>c.Token === reqBody.Token && c.Used == false)
    // console.log('token response value',tokenRes)
    //     //verify token
    // if(!tokenRes){

    //     res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Token Verification Failed'})
    //     return;
    // }
    //     let result = await userRepo.UpdateUserToken(reqBody.Channel,'ForgotPassword')
    //     console.log('token update result:',tokenRes)
    //     if(result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){

    //         res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'forgot Password Verification Failed, Please try again'})
    //         return;
    //     }
    //     res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'forgot Password Verification Successful',Email:reqBody.Channel})
       
  
         //comment this when going to production environment
         if(reqBody.Token === '000000'){
          let result = await  userRepo.UpdateUserTokenTest(reqBody.Channel,'EmailVerify')
          if(result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){
            res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
            return;
        }
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Email Verification Successful, please proceed to login'})
       
        }else{
          res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
        }
    
})

router.post('/resetPassword',resetPasswordValidator,async(req:Request,res:Response)=>{
  var reqBody = <resetPasswordRequestModel>req.body
  const error = validationResult(req)
  if(!error.isEmpty()){
    res.status(HttpStatus.STATUS_400).json(error.array())
    return;
  }
      
  let response = <userToken[]>await userRepo.GetUserByEmailOrPhone(reqBody.Channel)
  if(response?.length < 1){
     res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
     return;
  }
 
      let result = await userRepo.UpdateUserPassword(reqBody.NewPassword,reqBody.Channel)
      if(result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){

          res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Reset Password Failed, Please try again'})
          return;
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Password Reset Successful, Please proceed to login'})
     

  
})




export default router