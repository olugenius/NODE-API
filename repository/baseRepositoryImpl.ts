import { Pool } from "mysql2";
import bulkAccessCodeModel from "../model/bulkAccessCodeModel";
import singleAccessCodeModel from "../model/singleAccessCodeModel";
import staticAccessCodeModel from "../model/staticAccessCodeModel";
import conn from './dbContext/dbConnection'
import { GenerateUniqueId } from "../utilities/GenerateUniqueId";
import BaseRepository from "./Abstraction/baseRepository";
import { injectable } from "inversify";

@injectable()
export default class baseRepositoryImpl implements BaseRepository{

    private  async getConnection(): Promise<Pool | undefined>{
        try{
            return  await conn.getConnect()
        }
        catch(error){
         console.log('error getting  connection to MySql Server',error)
        }
        
    }
    

    async createSingleCode(payload:singleAccessCodeModel): Promise<string>{
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                    var AccessCode = `Access- ${GenerateUniqueId()}`
                    const query = `INSERT INTO AccessCode(CodeType,Code,Purpose,StartTime,EndTime,Name,Date,Phone,Email) VALUES(?,?,?,?,?,?,?,?,?)`
                   
                        connection?.query(query,['Single',AccessCode,payload.PurposeCode,payload.StartTime,payload.EndTime,payload.Name,payload.Date,payload.Phone,payload.Email],(err,data)=>{
                         connection.release()
                            if(err){
                                console.log('error querying database',err)
                                response = 'Failed'
                               
                            }else{
                                console.log('successfully query',data)
                                response = 'Success'
                               
                               
                            }
                            resolve(response)
                         })
                       
                    })

            })

           
                return result

        }
        catch(error){
            console.error('Error creating user:', error);
            return 'Failed'
        }
    }
  


    async createStaticCode(payload:staticAccessCodeModel): Promise<string>{

        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                    var AccessCode = `Access- ${GenerateUniqueId()}`
                    const query = `INSERT INTO AccessCode(CodeType,Code,DateRange,Frequency,Name,Phone,Email,Category) VALUES(?,?,?,?,?,?,?,?)`
                   
                        connection?.query(query,['Static',AccessCode,payload.DateRange,payload.Frequency,payload.Name,payload.Phone,payload.Email,payload.Category],(err,data)=>{
                         connection.release()
                            if(err){
                                console.log('error querying database',err)
                                response = 'Failed'
                               
                            }else{
                                console.log('successfully query',data)
                                response = 'Success'
                               
                               
                            }
                            resolve(response)
                         })
                       
                    })

            })

           
                return result

        }
        catch(error){
            console.error('Error creating user:', error);
            return 'Failed'
        }
        
    }

    async createBulkCode(payload:bulkAccessCodeModel): Promise<string>{

        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                    var AccessCode = `Access- ${GenerateUniqueId()}`
                    const query = `INSERT INTO AccessCode(CodeType,Code,Date,StartTime,EndTime,Frequency,AppointmentTitle,Phone,Email,NoOfParticipants) VALUES(?,?,?,?,?,?,?,?,?,?)`
                   
                        connection?.query(query,['Bulk',AccessCode,payload.Date,payload.StartTime,payload.EndTime,payload.Frequency,payload.AppointmentTitle,payload.Phone,payload.Email,payload.NoOfParticipants],(err,data)=>{
                         connection.release()
                            if(err){
                                console.log('error querying database',err)
                                response = 'Failed'
                               
                            }else{
                                console.log('successfully query',data)
                                response = 'Success'
                               
                               
                            }
                            resolve(response)
                         })
                       
                    })

            })

           
                return result

        }
        catch(error){
            console.error('Error creating user:', error);
            return 'Failed'
        }
        
        
    }



    async getAllAccessCode(): Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM AccessCode`,(err,data)=>{
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

    async getAccessCodeByid(Id:number): Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM AccessCode WHERE Id = ?`,[Id],(err,data)=>{
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