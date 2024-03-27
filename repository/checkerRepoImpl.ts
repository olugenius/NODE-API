import { Pool } from "mysql2";
import checkerRepo from "./Abstraction/checkerRepo";
import conn from './dbContext/dbConnection'
import createCheckersModel from "../model/createcheckersModel";
import { injectable } from "inversify";
import { GenerateUniqueId } from "../utilities/GenerateUniqueId";

@injectable()
export default class checkerRepoImpl implements checkerRepo{

    private  async getConnection(): Promise<Pool | undefined>{
        try{
            return  await conn.getConnect()
        }
        catch(error){
         console.log('error getting  connection to MySql Server',error)
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
                    
                  
                    const query = `INSERT INTO Checkers(FirstName,LastName,Phone,Email,DOB,Gender,NIN,CommunityId,CheckPoint,IsActive,CheckerId) VALUES(?,?,?,?,?,?,?,?,?,?,?)`
                     const checkerId = `Check-${GenerateUniqueId()}`
                        connection?.query(query,[payload.FirstName,payload.LastName,payload.Phone,payload.Email,payload.DOB,payload.Gender,payload.NIN,payload.CommunityId,payload.CheckPoint,1,checkerId],(err,data)=>{
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

    async createCheckersXls(payloads:createCheckersModel[]):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
             let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
               
                    
                  
            //         const query = `INSERT INTO Checkers(FirstName,LastName,Phone,Email,DOB,Gender,NIN,CommunityId,CheckPoint,IsActive,CheckerId) VALUES(?,?,?,?,?,?,?,?,?,?,?)`
            //          const checkerId = `Check-${GenerateUniqueId()}`
            const batchSize = 50; // Number of rows to insert in each batch
            const batches = Math.ceil(payloads.length / batchSize);
            let errorLog:string[]=[]
            
            for (let i = 0; i < batches; i++) {
                const start = i * batchSize;
                const end = (i + 1) * batchSize;
                const batchPayloads = payloads.slice(start, end);
    
                connection?.beginTransaction((err)=>{
                    if(err){
                        console.log('error beginning transaction',err)
                        reject(err)
                    }
                })
                    const placeholders = batchPayloads.map(() => '(?,?,?,?,?,?,?,?,?,?,?,?)').join(',');
                    const values = batchPayloads.flatMap(payload => [
                        payload.FirstName,
                        payload.LastName,
                        payload.Phone,
                        payload.Email,
                        payload.DOB,
                        payload.Gender,
                        payload.NIN,
                        payload.CommunityId,
                        payload.CheckPoint,
                        1,
                        `Check-${GenerateUniqueId()}`,
                        new Date()

                    ])
                
    
                    const query = `INSERT INTO Checkers(FirstName,LastName,Phone,Email,DOB,Gender,NIN,CommunityId,CheckPoint,IsActive,CheckerId,CreatedAt) VALUES ${placeholders}`;
    
                        connection?.query(query,values,(err,data)=>{
                         //connection.release()
                            if(err){
                                errorLog.push(err.message)
                                console.log('error querying database',err)
                                connection.rollback((err)=>{
                                    console.log('error rolling back transaction',err)
                                    })
                            }
                         })
                       
                
                
            }
            connection.commit((error)=>{
                connection.release()
             if(error){
                errorLog.push(error.message)
             connection.rollback((err)=>{
             console.log('error rolling back transaction',err)
             })
             }
             if(errorLog.length < 1){
                resolve('Success')

             }else{
                resolve('Failed')
             }
             
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

    async getCheckersByPhoneOrEmail(channel:string):Promise<any | null>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM Checkers WHERE (Email = ? or Phone =?)`,[channel,channel],(err,data)=>{
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

    async DeleteCheckers(Id:string):Promise<any | null>{
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `UPDATE Checkers SET IsActive = ? WHERE CheckerId = ?`
                   
                        connection?.query(query,[3,Id],(err,data)=>{
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
            console.error('Error Deleting community:', error);
            return 'Failed'
        }
       }
  
    async DeactivateCheckers(Id:string):Promise<any | null>{
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `UPDATE Checkers SET IsActive = ? WHERE CheckerId = ?`
                   
                        connection?.query(query,[2,Id],(err,data)=>{
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
            console.error('Error Deactivate community:', error);
            return 'Failed'
        }

       }
  
    async ActivateCheckers(Id:string):Promise<any | null>{
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `UPDATE Checkers SET IsActive = ? WHERE CheckerId = ?`
                   
                        connection?.query(query,[1,Id],(err,data)=>{
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
            console.error('Error Activate community:', error);
            return 'Failed'
        }
       }


}