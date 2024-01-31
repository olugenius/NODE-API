import { Request,Response,NextFunction } from "express";
import { HttpStatus } from "../utilities/HttpstatusCode";
import jwtHandler from "../utilities/jwtHandler";

export  const Authorize = (req:Request,res:Response,next:NextFunction)=>{
//   try{

    

//   }catch(error){
//    console.log('An error occurred',error)
//    res.status(HttpStatus.STATUS_403).json({status:HttpStatus.STATUS_FAILED,message:'Request Forbidden, Invalid Token'})
//   }
if(req.url === '/api/login' || req.url === '/api/register' || req.url === '/api/register/sendMail' || req.url === '/api/register/verify' || req.url.includes('/images')){
    return next()
     
 }
     let token = req.header('Authorization')
     token = token?.replace('Bearer ','')
 if(!token){
     res.status(HttpStatus.STATUS_401).json({status:HttpStatus.STATUS_FAILED,message:'Request UnAuthorized'})
     return;
 }
 let IsValid = jwtHandler.IsValidToken(token)
 if(!IsValid){
     res.status(HttpStatus.STATUS_403).json({status:HttpStatus.STATUS_FAILED,message:'Request Forbidden, Invalid Token'})
     return;
 }
 return next()


}