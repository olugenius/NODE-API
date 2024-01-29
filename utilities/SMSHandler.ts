import axios from 'axios';
import FormData from 'form-data';

export default function(phone:string,message:string){

var data = new FormData();
data.append('token', process.env.SMS_APIX_TOKEN);
data.append('sender', process.env.SMS_SENDER_ID);
data.append('to', phone);
data.append('message', message);
data.append('type', process.env.SMS_TYPE || 0);
data.append('routing', process.env.SMS_ROUTING || 2);
data.append('ref_id', `VSured- ${new Date().toString()}`);
data.append('simserver_token', 'simserver-token');
//data.append('dlr_timeout', 'dlr-timeout');
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
  console.log(JSON.stringify(response.data));
})
.catch(function (error:any) {
  console.log(error);
});

}
