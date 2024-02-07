import { Pool } from 'mysql2'
import conn from './dbContext/dbConnection'
import createCommunityModel from '../model/createCommunityModel'
import createSubAdminModel from '../model/createSubAdminModel'
import createCheckersModel from '../model/createcheckersModel'
import { GenerateUniqueId } from '../utilities/GenerateUniqueId'
import {injectable} from 'inversify'
import 'reflect-metadata'
import createAppointmentModel from '../model/creatAppointmentModel'
import memberModel from '../model/memberModel'
import communityRepository from './Abstraction/communityRepository'



@injectable()
export default class communityRepositoryImpl implements communityRepository{

    private  async getConnection(): Promise<Pool | undefined>{
        try{
            return  await new conn().getConnect()
        }
        catch(error){
         console.log('error getting  connection to MySql Server',error)
        }
        
    }

    async GetCommunity():Promise<any>{
     try{

        const connection =  await this.getConnection()
        let result = await new Promise<any>((resolve,reject)=>{
         
            connection?.getConnection((err,connection)=>{
                if(err){
                    console.log('connection error',err)
                    reject(err)
                }
                
              
                const query = `SELECT * FROM Community`
               
                    connection?.query(query,(err,data)=>{
                     connection.release()
                        if(err){
                            console.log('error querying database',err)
                           
                           
                        }else{
                            console.log('successfully query',data)
                            
                           
                           
                        }
                        resolve(data)
                     })
                   
                })

        })
        return result

     }
     catch(error){
       console.error('Error Getting community',error)
     }

    }


    async GetCommunityById(communityId:string):Promise<any>{
        try{
   
           const connection =  await this.getConnection()
           let result = await new Promise<any>((resolve,reject)=>{
            
               connection?.getConnection((err,connection)=>{
                   if(err){
                       console.log('connection error',err)
                       reject(err)
                   }
                   
                 
                   const query = `SELECT * FROM Community where Community.CommunityId = ?`
                  
                       connection?.query(query,[communityId],(err,data)=>{
                        connection.release()
                           if(err){
                               console.log('error querying database',err)
                              
                              
                           }else{
                               console.log('successfully query',data)
                              
                           }
                           resolve(data)
                        })
                      
                   })
   
           })
           return result
   
        }
        catch(error){
          console.error('Error Getting community',error)
        }
        
       }

    async createCommunity(payload:createCommunityModel):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `INSERT INTO Community(Name,Address,Phone,Email,CommunityId) VALUES(?,?,?,?,?)`
                   
                        connection?.query(query,[payload.Name,payload.Address,payload.Phone,payload.Email,payload.CommunityId],(err,data)=>{
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


    async createSubAdmin(payload:createSubAdminModel):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `INSERT INTO SubAdmin(FirstName,LastName,Phone,Email,PhotoPath,CommunityId) VALUES(?,?,?,?,?,?)`
                   
                        connection?.query(query,[payload.FirstName,payload.LastName,payload.Phone,payload.Email,payload.PhotoPath,payload.CommunityId],(err,data)=>{
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


    async createCheckers(payload:createCheckersModel):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `INSERT INTO Checkers(FirstName,LastName,Phone,Email,DOB,Gender,NIN,CommunityId,CheckPoint) VALUES(?,?,?,?,?,?,?,?,?)`
                   
                        connection?.query(query,[payload.FirstName,payload.LastName,payload.Phone,payload.Email,payload.DOB,payload.Gender,payload.NIN,payload.CommunityId,payload.CheckPoint],(err,data)=>{
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


    async getCheckersById(Id:number):Promise<any | null>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM Checkers WHERE Id = ?`,[Id],(err,data)=>{
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


    async getCheckersByCommunityId(communityId:string):Promise<any | null>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM Checkers WHERE CommunityId = ?`,[communityId],(err,data)=>{
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


    async GetAllCheckers():Promise<any>{
        console.log('Inside GetAll Checkers Query method')
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query('SELECT * FROM checkers',(err,data)=>{
                        connection.release()
                        if(err){
                           console.log('error querying database',err)           
                        }
                        else{
                           console.log('successfully query checkers',data)
                           
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

                    connection?.query(`SELECT * FROM SubAdmin`,(err,data)=>{
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

    async GetSubAdminsById(Id:number){
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