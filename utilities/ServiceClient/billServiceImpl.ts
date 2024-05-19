import axios from "axios";
import { injectable } from "inversify";
import billService from "./Abstraction/billService";
@injectable()
export default class billServiceImpl implements billService{
    async GetBearer(){
        try{
            const body = {
                "principalId": "VS", 
                "secret":"15C2578B-7688-4DC5-8049-2462CC13DD9C"
               }
            const response = await axios.post('',JSON.stringify(body),{headers:{'Content-Type':'application/json'}})
            return response.data.token;
        }catch(err){
        console.error('An error at GetBearer',err)
        }
       
    }
    async GetRequest(endpoint:string):Promise<any>{
        try{
            const token = await this.GetBearer();
            const baseUrl = ''
            const response = await axios.get(`${baseUrl}/${endpoint}`,{headers:{'Content-Type':'application/json','Authorization':token}})
            return response.data
        }catch(err){
        console.error('An error occurred at get request',err)
        }
        

    }

    async GetRequest_Bill(endpoint:string):Promise<any>{
        try{
            const token = await this.GetBearer();
            const baseUrl = ''
            const response = await axios.get(`${baseUrl}/${endpoint}`,{headers:{'Content-Type':'application/json','Authorization':token}})
            return response.data
        }catch(err){
        console.error('An error occurred at get request',err)
        }
        

    }


    async PostRequest(endpoint:string,body:any):Promise<any>{
        try{
            const token = await this.GetBearer();
            const baseUrl = ''
            const response = await axios.post(`${baseUrl}/${endpoint}`,JSON.stringify(body),{headers:{'Content-Type':'application/json','Authorization':token}})
            return response.data
        }catch(err){
        console.error('An error occurred at Post request',err)
        }
        

    }

    async PostRequest_Bill(endpoint:string,body:any):Promise<any>{
        try{
            const token = await this.GetBearer();
            const baseUrl = ''
            const response = await axios.post(`${baseUrl}/${endpoint}`,JSON.stringify(body),{headers:{'Content-Type':'application/json','Authorization':token}})
            return response.data
        }catch(err){
        console.error('An error occurred at Post request',err)
        }
        

    }

}