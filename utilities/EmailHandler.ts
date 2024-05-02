import nodemailer, { SentMessageInfo } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const host = process.env.MAIL_HOST
const port =process.env.MAIL_PORT
const user = process.env.MAIL_USER
const password = process.env.MAIL_PASSWORD
const from = process.env.MAIL_FROM
const subject = process.env.MAIL_SUBJECT || 'Testing Email for OTP sending'
const transport = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    port:Number(process.env.MAIL_PORT),
    secure:false,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASSWORD
    }
})

 export async function SendMail (mailTo:string,message:string):Promise<boolean | any> {
  let mailResult = false
      try{

  
   
    const mailOption:Mail.Options = {
     from: process.env.MAIL_FROM,
     to:mailTo,
     subject:process.env.MAIL_SUBJECT || 'Testing Email for OTP sending',
     html:message
    }
    
    // let result = await new Promise<boolean>((resolve,reject)=>{
    
    //     transport.sendMail(mailOption,(err,info)=>{
    //       if(err){
    //         mailResult = false
    //         reject(err)
            
    //       }else{
    //         mailResult = true

    //         resolve(mailResult)
    //       }
        

    //     })
    // })
    const info  = await transport.sendMail(mailOption)
    return true;
    }
    catch(error){
    console.error('An error occurred while sending mail',error)
    console.log('hostName',host)
    console.log('UserName',user)
    return false;
    }
    
    
}


// import nodemailer, { SentMessageInfo } from 'nodemailer'
// import Mail from 'nodemailer/lib/mailer'
// import SMTPTransport from 'nodemailer/lib/smtp-transport'

// const transport = nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: Number(process.env.MAIL_PORT),
//     secure: false,
//     auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASSWORD
//     }
// })

// export async function sendMail(mailTo: string, message: string): Promise<boolean> {
//     try {
//         const mailOptions: Mail.Options = {
//             from: process.env.MAIL_FROM,
//             to: mailTo,
//             subject: process.env.MAIL_SUBJECT || 'Testing Email for OTP sending',
//             html: message
//         }

//         const info = await transport.sendMail(mailOptions)
//         return true;
//     } catch (error) {
//         console.error('An error occurred while sending mail:', error)
//         return false;
//     }
// }
