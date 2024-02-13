import { Request,Response,NextFunction } from "express";
import { HttpStatus } from "../utilities/HttpstatusCode";
import jwtHandler from "../utilities/jwtHandler";
import { isValid } from "date-fns";

export  const Authorize = async(req:any,res:Response,next:NextFunction)=>{

if(req.url === '/api/login' || req.url === '/api/register' || req.url === '/api/register/sendMail' || req.url === '/api/register/verify' || req.url.includes('/images') || req.url.includes('api-docs')){
    return next()
     
 }
     let token = req.header('Authorization')
     token = token?.replace('Bearer ','')
 if(!token){
     res.status(HttpStatus.STATUS_401).json({status:HttpStatus.STATUS_FAILED,message:'Request UnAuthorized'})
     return;
 }
 let IsValidJwt = await jwtHandler.IsValidToken(token)
 if(!IsValidJwt[0]){
     res.status(HttpStatus.STATUS_403).json({status:HttpStatus.STATUS_FAILED,message:'Request Forbidden, Invalid Token'})
     return;
 }
 req.authValue = IsValidJwt[1]
 return next()


}