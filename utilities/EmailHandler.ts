import nodemailer, { SentMessageInfo } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
 export async function SendMail (mailTo:string,message:string):Promise<boolean | any> {
  let mailResult = false
      try{

    const host = process.env.MAIL_HOST
    const port =process.env.MAIL_PORT
    const user = process.env.MAIL_USER
    const password = process.env.MAIL_PASSWORD
    const from = process.env.MAIL_FROM
    const subject = process.env.MAIL_SUBJECT || 'Testing Email for OTP sending'
    const transport = nodemailer.createTransport({
        host:host,
        port:Number(port),
        secure:false,
        auth:{
            user:user,
            pass:password
        }
    })
   
    const mailOption:Mail.Options = {
     from: from,
     to:mailTo,
     subject:subject,
     html:message
    }
    
    let result = await new Promise<boolean>((resolve,reject)=>{
    
        transport.sendMail(mailOption,(err,info)=>{
          if(err){
            mailResult = false
            reject(err)
            
          }else{
            mailResult = true

            resolve(mailResult)
          }
        

        })
    })
    
    return result
    }
    catch(error){
    console.error('An error occurred while sending mail',error)
    }
    
    
}