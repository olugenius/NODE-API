import express, { Request,Response } from 'express'
import loginModel from '../model/loginModel'
import userRepo from '../repository/UserRepository'
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

const router = express.Router()


// router.post('/login',async(req,res)=>{
//     const reqBody = <loginModel>req.body
//     const error = validationResult(req)
//         if(!error.isEmpty()){
//           res.status(400).json(error.array())
//         }else{

//             let response = <registerModel[]> await new userRepo().GetUserByPhone(reqBody.phone)
//             console.log('login response result',<registerModel[]>response)
//             if(response){

//                 let IValid = await bcrypt.compare(reqBody.password,response[0].Password)
//                if(IValid){
//                 if(response[0].IsVerified){
//                res.status(200).json({status:'Success',message:'Login Successful'})
//                 }
//                 else{
//                     res.status(400).json({status:'Failed',message:'Email is not yet verified'})

//                 }
                
//                }
//                else{

//                 res.status(400).json({status:'Failed',message:'Invalid Login Credentials'})

//                }
               
//             }
//             else{
//                 res.status(404).json({status:'Failed',message:'invalid Phone Number or Password'})
//             }
//         }
  
    

// })

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
            let response = <registerModel[]> await new userRepo().GetUserByEmailOrPhone(reqBody.Phone)
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
                const accessToken = jwtHandler.generateJWT(response[0])
                const refreshToken = await jwtHandler.generateRefreshToken(reqBody.Phone)
                 
               res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Login Successful',accessToken:accessToken,refreshToken:refreshToken})
               
    
    

})


router.post('/refreshToken',RefreshTokenValidator,async(req:Request,res:Response)=>{
  const reqBody = <refreshTokenRequestmodel>req.body
  const error = validationResult(req)
      if(!error.isEmpty()){
        res.status(HttpStatus.STATUS_200).json(error.array())
        return;
      }
          let response = <registerModel[]> await new userRepo().GetUserByEmail(reqBody.Email)
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


router.post('/register',validator,
async (req:any,res:any)=>{
    try{
        const reqBody = <registerModel>req.body
        const error = validationResult(req)
        if(!error.isEmpty()){
          res.status(HttpStatus.STATUS_400).json(error.array())
          return;
        }
            let userData = <registerModel[]>await new userRepo().GetUserByEmail(reqBody.Email)
            if(userData.length > 0){
                res.status(HttpStatus.STATUS_400).json({status: HttpStatus.STATUS_FAILED,message:'User with this Email already exist'})
                return;
            }

         let response = await new userRepo().createUser(reqBody)
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
        //store in database
        let token = Math.floor(100000 + Math.random() * 900000);
    let response = await new userRepo().AddToken(reqBody.Email,'EmailVerify',token.toString(),reqBody.Medium)
  
    if(response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){
      res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:`${reqBody.Medium} sending failed, please try again`})
      return;
    }
    //Start sending sms or email
    const mailRes = await SendMail(`${reqBody.Email}`,`Please Validate your account by using this token ${token.toString()}`)
    
    if(!mailRes){
      res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:`${reqBody.Medium} sending failed, please try again`})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:`Token sent successfully Via ${reqBody.Medium}`,Email:`${reqBody.Email}`})

    
})

router.post('/register/verify',VerifyEmailValidator,async(req:Request,res:Response)=>{
    var reqBody = <mailVerifyModel>req.body
    const error = validationResult(req)
    if(!error.isEmpty()){
      res.status(HttpStatus.STATUS_400).json(error.array())
      return;
    }
        //Get Token from Db
    let response = <userToken[]>await new userRepo().GetUserToken(reqBody.Email,'EmailVerify')
    if(response?.length < 1){
       res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
       return;
    }
       let tokenRes = response?.find(c=>c.Token === reqBody.Token && c.Used == false)
       console.log('token response',tokenRes)
         //verify token
    if(!tokenRes){
        res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Token Verification Failed'})
        return;
    }
        let result = await new userRepo().UpdateUserToken(reqBody.Email,'EmailVerify')
        if(result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){
            res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
            return;
        }
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Email Verification Successful, please proceed to login'})
       
   
    
})

router.post('/forgotPassword/sendMail',ForgotPasswordValidator,async(req:Request,res:Response)=>{
    var reqBody = <forgotPasswordRequestmodel>req.body
    const error = validationResult(req)
    if(!error.isEmpty()){
      res.status(HttpStatus.STATUS_400).json(error.array())
    }else{

        let response = <registerModel[]>await new userRepo().GetUserByEmail(reqBody.Email)
        if(response?.length < 1){

            res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Email Address'})
            return;
        }
        console.log('response DBO',dateFormatter(response[0].DOB))
        console.log('iNPUT DBO',dateFormatter(reqBody.DOB) )
          let DOBCheck = dateFormatter(response[0].DOB) === dateFormatter(reqBody.DOB) ? true : false
          if(!DOBCheck){

            res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'invalid Date of Birth'})
            return;
          }
          let token = Math.floor(100000 + Math.random() * 900000);
            let result = await new userRepo().AddToken(reqBody.Email,'ForgotPassword',token.toString(),reqBody.Medium)
            if(result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){
                res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:`${reqBody.Medium} sending failed, please try again`})
                return;
              }

                //Send Email Implementation
                res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Email Sent Successfully'})

       

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
    let response = <userToken[]>await new userRepo().GetUserToken(reqBody.Email,'ForgotPassword')
    if(response?.length < 1){
       res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
       return;
    }
    let tokenRes = response.find(c=>c.Token === reqBody.Token && c.Used == false)
    console.log('token response value',tokenRes)
        //verify token
    if(!tokenRes){

        res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Token Verification Failed'})
        return;
    }
        let result = await new userRepo().UpdateUserToken(reqBody.Email,'ForgotPassword')
        console.log('token update result:',tokenRes)
        if(result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){

            res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'forgot Password Verification Failed, Please try again'})
            return;
        }
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'forgot Password Verification Successful',Email:reqBody.Email})
       
  
    
})

router.post('/resetPassword',resetPasswordValidator,async(req:Request,res:Response)=>{
  var reqBody = <resetPasswordRequestModel>req.body
  const error = validationResult(req)
  if(!error.isEmpty()){
    res.status(HttpStatus.STATUS_400).json(error.array())
    return;
  }
      //Get Token from Db
  let response = <userToken[]>await new userRepo().GetUserByEmail(reqBody.Email)
  if(response?.length < 1){
     res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Email Verification Failed, Please try again'})
     return;
  }
 
      let result = await new userRepo().UpdateUserPassword(reqBody.NewPassword,reqBody.Email)
      if(result?.toLowerCase() !== HttpStatus.STATUS_SUCCESS){

          res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Reset Password Failed, Please try again'})
          return;
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Password Reset Successful, Please proceed to login'})
     

  
})




export default router