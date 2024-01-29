import axios from 'axios';
import FormData from 'form-data';

export default async function(phone:string,message:string):Promise<boolean | any>{
    try{
        let isSent = false
        let result = await new Promise<boolean>((resolve,reject)=>{
        var data = new FormData();
        data.append('token', process.env.SMS_APIX_TOKEN);
        data.append('sender', process.env.SMS_SENDER_ID || 'VSure');
        data.append('to', phone);
        data.append('message', message);
        data.append('type', process.env.SMS_TYPE || 0);
        data.append('routing', process.env.SMS_ROUTING || 2);
        data.append('ref_id', `VSure- ${new Date().toString()}`);
        data.append('simserver_token', 'simserver-token');
        data.append('dlr_timeout', 'dlr-timeout');
        //data.append('schedule', 'time-in-future');
        
        var config = {
          method: 'post',
        maxBodyLength: Infinity,
          url: process.env.SMS_URL,
          headers: { 
            ...data.getHeaders()
          },
          data : data
        };
        
        axios(config)
        .then(function (response:any) {
            let newRes = JSON.stringify(response.data)
          if(response?.data?.code === 1000){
            isSent= true
          }else{
            isSent = false
          }
          resolve(isSent)
          
        })
        .catch(function (error:any) {
          console.log('SMS Error message',error);
          reject(error)
        });
        
        

        })
        
        return result

    } 
    catch(error){

        console.log('An error occurred',error)
    }
}
