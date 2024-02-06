import jwt, { JwtPayload } from 'jsonwebtoken'
import userRepo from '../repository/UserRepository'
import { HttpStatus } from './HttpstatusCode'
  function generateJWT(payload: object):string{
    try{
      let Secret = <string>process.env.JWT_SECRET
      return jwt.sign(payload,Secret,{expiresIn:'1h'})

    }catch(error){
      console.log('generateJWT error:',error)
      return ''
    }
   
}

  async function generateRefreshToken(phone:string):Promise<string>{
    try{
      let Secret = <string>process.env.JWT_SECRET
    let token =  jwt.sign({data:'just a refresh token'},Secret,{expiresIn:'7days'})
    let result = await new userRepo().UpdateUserRefreshToken(phone,token)
    if(result.toLowerCase() !== HttpStatus.STATUS_SUCCESS){
      return ''
    }
    return token;

    }catch(error){
      console.log('generateRefreshToken error:',error)
      return ''
    }
    
}

 async function IsValidToken(token:string):Promise<boolean>{
  try{
    let Secret = <string>process.env.JWT_SECRET
    let result = await new Promise<boolean>((resolve,reject)=>{

      jwt.verify(token,Secret,(error,data)=>{
         if(error){
           reject(error)
         }
         resolve(true)
      })

    })

    return result
    
  }catch(error){
    console.log('Jwt Validation error:',error)
   return false
  }
   
}

export default {
    generateJWT,
    generateRefreshToken,
    IsValidToken
}