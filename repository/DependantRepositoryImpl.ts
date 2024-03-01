import { Pool } from "mysql2";
import CreateDependantmodel from "../model/CreateDependantModel";
import DependantRepository from "./Abstraction/DependantRepository";
import conn from './dbContext/dbConnection'
import { injectable } from "inversify";

@injectable()
export default class DependantRepositoryImpl implements DependantRepository{
    private  async getConnection(): Promise<Pool | undefined>{
        try{
            return  await conn.getConnect()
        }
        catch(error){
         console.log('error getting  connection to MySql Server',error)
        }
        
    }
    

    async CreateDependant(payload:CreateDependantmodel): Promise<string>{
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }

                    const query = `INSERT INTO Dependant(FirstDependantName,FirstDependantEmail,FirstDependantPhone,FirstDependantDOB,SecondDependantName,SecondDependantEmail,SecondDependantPhone,SecondDependantDOB) VALUES(?,?,?,?,?,?,?,?)`
                   
                        connection?.query(query,[payload.FirstDependantName,payload.FirstDependantEmail,payload.FirstDependantPhone,payload.FirstDependantDOB,payload.SecondDependantName,payload.SecondDependantEmail,payload.SecondDependantPhone,payload.SecondDependantDOB],(err,data)=>{
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

    async GetDependantByPhoneOrEmail(channel:string):Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM Dependant WHERE (FirstDependantEmail = ? or FirstDependantPhone =?)`,[channel,channel],(err,data)=>{
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