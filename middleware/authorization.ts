import { Request,Response,NextFunction } from "express";
import { HttpStatus } from "../utilities/HttpstatusCode";
import jwtHandler from "../utilities/jwtHandler";
import { isValid } from "date-fns";

export  const Authorize = (req:Request,res:Response,next:NextFunction)=>{
if(req.url === '/api/login' || req.url === '/api/register'){
   return next()
    
}
    let token = req.header('Authorization')
if(!token){
    res.status(HttpStatus.STATUS_401).json({status:HttpStatus.STATUS_FAILED,message:'Request UnAuthorized'})
    return;
}
let IsValid = jwtHandler.IsValidToken(token)
if(!isValid){
    res.status(HttpStatus.STATUS_403).json({status:HttpStatus.STATUS_FAILED,message:'Request Forbidden, Invalid Token'})
    return;
}
next()

}