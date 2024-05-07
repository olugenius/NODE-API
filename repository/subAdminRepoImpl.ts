import { Pool } from "mysql2";
import subAdminRepo from "./Abstraction/subAdminRepo";
import conn from './dbContext/dbConnection'
import createSubAdminModel from "../model/createSubAdminModel";
import { injectable } from "inversify";
import { GenerateUniqueId } from "../utilities/GenerateUniqueId";
import { BeginTransaction, CommitTransaction, QueryTransaction, ReleaseTransaction } from "./dbContext/Transactions";
import { SendMail } from "../utilities/EmailHandler";

@injectable()
export default class subAdminRepoimpl implements subAdminRepo{

    private  async getConnection(): Promise<Pool | undefined>{
        try{
            return  await conn.getConnect()
        }
        catch(error){
         console.log('error getting  connection to MySql Server',error)
        }
        
    }

    async createSubAdmin(payload:createSubAdminModel):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection(async(err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }

                    try{

                    

                    await BeginTransaction(connection)
                    
                    
                    const pass = GenerateUniqueId(4)
                    const query = `INSERT INTO SubAdmin(FirstName,LastName,Phone,Email,PhotoPath,CommunityId,SubAdminId,CreatorUserId,IsActive) VALUES(?,?,?,?,?,?,?,?,?)`
                    const query2 = 'INSERT INTO temp_user(FirstName,LastName,Role,Phone,Email,TempPass) VALUES(?,?,?,?,?,?)'
                    const subAdminId = `subAdmin-${GenerateUniqueId()}`
                        // connection?.query(query,[payload.FirstName,payload.LastName,payload.Phone,payload.Email,payload.PhotoPath,payload.CommunityId,subAdminId,payload.CreatorUserId ?? '',1],(err,data)=>{
                        //  connection.release()
                        //     if(err){
                        //         console.log('error querying database',err)
                        //         response = 'Failed'
                               
                        //     }else{
                        //         console.log('successfully query',data)
                        //         response = 'Success'
                               
                               
                        //     }
                        //     resolve(response)
                        //  })


                         await QueryTransaction(connection,query,[payload.FirstName,payload.LastName,payload.Phone,payload.Email,payload.PhotoPath,payload.CommunityId,subAdminId,payload.CreatorUserId ?? '',1])
                         await QueryTransaction(connection,query2,[payload.FirstName,payload.LastName,'SUB_ADMIN',payload.Phone,payload.Email,pass])
                         await CommitTransaction(connection)
                         await ReleaseTransaction(connection)
                         const emailMessage = `<!DOCTYPE html><html><body><h2>Dear ${payload.FirstName} ${payload.LastName}</h2><p><b>You have been created as a SubAdmin in the VSured App</b></p><p class="demo">Please Login with this One time. <br><br> <b>Paswword:</b> ${pass}</p></body></html>`;
                         await SendMail(`${payload.Email}`, emailMessage);

                         resolve('Success')

                        }catch(err){
                            console.log('An error occurred',err)
                            reject(err)
    
                        }

                    })

            })

           
                return result

        }
        catch(error){
            console.error('Error creating user:', error);
            return 'Failed'
        }
           
      
    }

    async GetSubAdminById(Id:number):Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM SubAdmin where Id=?`,[Id],(err,data)=>{
                        connection.release()
                        if(err){
                           console.log('error querying database',err)           
                        }
                        else{
                           console.log('successfully query',data)
                           
                        }
                        resolve(data)
                       })
        

                   
                    
                    })
            })
    
             return result

        }catch(error){
         console.log('An error occurred',error)
        }

    }

    async GetSubAdminByPhoneOrEmail(Email:string):Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM SubAdmin where (Email=? or Phone=?)`,[Email],(err,data)=>{
                        connection.release()
                        if(err){
                           console.log('error querying database',err)           
                        }
                        else{
                           console.log('successfully query',data)
                           
                        }
                        resolve(data)
                       })
        

                   
                    
                    })
            })
    
             return result

        }catch(error){
         console.log('An error occurred',error)
        }

    }


    async GetAllSubAdmins():Promise<any|null>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT a.*,(select Name from community where a.CommunityId = CommunityId ) as CommunityName FROM SubAdmin a `,(err,data)=>{
                        connection.release()
                        if(err){
                           console.log('error querying database',err)           
                        }
                        else{
                           console.log('successfully query',data)
                           
                        }
                        resolve(data)
                       })
        

                   
                    
                    })
            })
    
             return result

        }catch(error){
         
        }

    }

    async GetAllSubAdminsByCreatorUserId(creatorUserId:string):Promise<any>{

        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT a.*,(select Name from community where a.CommunityId = CommunityId ) as CommunityName FROM SubAdmin a where CreatorUserId=?`,[creatorUserId],(err,data)=>{
                        connection.release()
                        if(err){
                           console.log('error querying database',err)           
                        }
                        else{
                           console.log('successfully query',data)
                           
                        }
                        resolve(data)
                       })
        

                   
                    
                    })
            })
    
             return result

        }catch(error){
         
        }

    }



    async GetSubAdminsByCommunityId(communityId:string){
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM SubAdmin where CommunityId=?`,[communityId],(err,data)=>{
                        connection.release()
                        if(err){
                           console.log('error querying database',err)           
                        }
                        else{
                           console.log('successfully query',data)
                           
                        }
                        resolve(data)
                       })
        

                   
                    
                    })
            })
    
             return result

        }catch(error){
         
        }

    }
}