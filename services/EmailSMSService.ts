import { container } from "../Container/appContainer";
import UserRepository from "../repository/UserRepositoryImpl";
import { SendMail } from "../utilities/EmailHandler";
import SMSHandler from "../utilities/SMSHandler";

const userRepo = container.get<UserRepository>(UserRepository)
export const MailService = async(Channel:string, Medium:string)=>{
    
  
        //store in database
        let token = Math.floor(100000 + Math.random() * 900000);
        let response = await userRepo.AddToken(Channel,'EmailVerify',token.toString(),Medium)
  
   
    //Start sending sms or email
    let emailSMSResult = false
    const message = `Please use the token sent to you for validation: \\n Token Value is: ${token.toString()}`
    if(Medium.toLowerCase() === 'sms'){
       emailSMSResult =  await SMSHandler(Channel,message)

    }else{
      emailSMSResult= await SendMail(`${Channel}`,message)
    }
    return emailSMSResult

}