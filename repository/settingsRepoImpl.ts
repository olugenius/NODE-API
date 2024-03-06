import { Pool } from 'mysql2'
import conn from './dbContext/dbConnection'
import settingsRepo from './Abstraction/settingsRepo'
import UpdateDependantModel from '../model/UpdateDependantModel'

export default class settingsRepoImpl implements settingsRepo{
    private  async getConnection(): Promise<Pool | undefined>{
        try{
            return  await conn.getConnect()
        }
        catch(error){
         console.log('error getting  connection to MySql Server',error)
        }
        
    }

    // async GetCommunityAdminProfile(Phone:string):Promise<any>{
    //     try{

    //         const connection =  await this.getConnection()
    //         let result = await new Promise<any>((resolve,reject)=>{
             
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                     console.log('connection error',err)
    //                     reject(err)
    //                 }
                    
                  
    //                 const query = `SELECT * FROM Users WHERE Phone=? and IsVerified = ?`
                   
    //                     connection?.query(query,[Phone,1],(err,data)=>{
    //                      connection.release()
    //                         if(err){
    //                             console.log('error querying database',err)
                               
                               
    //                         }else{
    //                             console.log('successfully query',data)
                                
                               
                               
    //                         }
    //                         resolve(data)
    //                      })
                       
    //                 })
    
    //         })
    //         return result
    
    //      }
    //      catch(error){
    //        console.error('Error Getting community',error)
    //      }
    // }

    async GetMemberProfile(Phone:string):Promise<any>{
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<any>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `SELECT * FROM Member WHERE Phone=?`
                   
                        connection?.query(query,[Phone],(err,data)=>{
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

    // async GetDependantProfile(Phone:string,CreatorPhone:string):Promise<any>{
    //     try{

    //         const connection =  await this.getConnection()
    //         let result = await new Promise<any>((resolve,reject)=>{
             
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                     console.log('connection error',err)
    //                     reject(err)
    //                 }
                    
                  
    //                 const query = `SELECT * FROM Dependant WHERE Phone=? and CreatorPhone=?`
                   
    //                     connection?.query(query,[Phone,CreatorPhone],(err,data)=>{
    //                      connection.release()
    //                         if(err){
    //                             console.log('error querying database',err)
                               
                               
    //                         }else{
    //                             console.log('successfully query',data)
                                
                               
                               
    //                         }
    //                         resolve(data)
    //                      })
                       
    //                 })
    
    //         })
    //         return result
    
    //      }
    //      catch(error){
    //        console.error('Error Getting community',error)
    //      }
    // }

    // async GetDependantProfileByPhone(Phone: string,CreatorPhone:string): Promise<any> {
    //     let response : string = ''
    //     let errorLog:string[]=[]
    //     let resultArray:any[] = []
    //     try{

    //         const connection =  await this.getConnection()
    //         let result = await new Promise<any>((resolve,reject)=>{
             
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                     console.log('connection error',err)
    //                     reject(err)
    //                 }
    //                 // connection?.beginTransaction((err)=>{
    //                 //     if(err){
    //                 //         console.log('error beginning transaction',err)
    //                 //         reject(err)
    //                 //     }
    //                 // })
    //                 const query1 = `SELECT * FROM Dependant WHERE Phone=? and CreatorPhone=?`
    //                 const query2 = `SELECT Gender,PhotoPath FROM Users WHERE Phone=? and IsVerified=?`
                   
    //                     connection?.query(query1,[Phone,CreatorPhone],(err,data)=>{
    //                      //connection.release()
    //                         if(err){
    //                          errorLog.push('Failed')  
    //                         console.log('error querying database',err)
    //                         reject(err)

    //                         }
    //                         resultArray.push(data)
    //                      })

    //                      connection?.query(query2,[Phone,1],(err,data)=>{
    //                                if(err){
    //                                errorLog.push('Failed')
    //                                console.log('error querying database',err)
    //                                }
    //                                resultArray.push(data)
    //                             })

                        


    //                     //  connection.commit((err)=>{
    //                     //  connection.release()
    //                     //  if(err){
    //                     //     errorLog.push(err.message)
    //                     //     return connection.rollback(()=>{
    //                     //         console.log('Error Committing Transaction',err)
    //                     //         reject('Failed')
    //                     //     })
                            
    //                     //  }
    //                      if(errorLog.length < 1){
    //                         resolve([])

    //                      }else{
    //                         resolve(resultArray)
    //                      }
                         
    //                     //  })
                       
    //                 })

    //         })

           
    //             return result

    //     }
    //     catch(error){
    //         console.error('Error creating user:', error);
    //         return 'Failed'
    //     }
        
    // }
    // async GetDependantProfile(Phone: string,CreatorPhone:string): Promise<any> {
    //     let response : string = ''
    //     let errorLog:string[]=[]
    //     let resultArray:any[] = []
    //     try{

    //         const connection =  await this.getConnection()
    //         let result = await new Promise<any>((resolve,reject)=>{
             
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                     console.log('connection error',err)
    //                     reject(err)
    //                 }
    //                 // connection?.beginTransaction((err)=>{
    //                 //     if(err){
    //                 //         console.log('error beginning transaction',err)
    //                 //         reject(err)
    //                 //     }
    //                 // })
    //                 const query1 = `SELECT * FROM Dependant and CreatorPhone=?`
    //                 const query2 = `SELECT Gender,PhotoPath FROM Users WHERE Phone=? and IsVerified=?`
                   
    //                     connection?.query(query1,[Phone,CreatorPhone],(err,data:any[])=>{
    //                      //connection.release()
    //                         if(err){
    //                          errorLog.push('Failed')  
    //                         console.log('error querying database',err)
    //                         reject(err)

    //                         }else{
    //                             for(let i=0;i<data.length;i++){

    //                                 connection.query(query2,[Phone,1],(err2,data2)=>{
    //                                     if(err2){
    //                                         errorLog.push('Failed')  
    //                                        console.log('error querying database',err)
    //                                        reject(err)
               
    //                                        }
    //                                        resultArray.push(data.concat(data2))

    //                                 })

    //                             }
                                

    //                         }
                            
    //                      })

    //                     //  connection?.query(query2,[Phone,1],(err,data)=>{
    //                     //            if(err){
    //                     //            errorLog.push('Failed')
    //                     //            console.log('error querying database',err)
    //                     //            }
    //                     //            resultArray.push(data)
    //                     //         })

                        


    //                     //  connection.commit((err)=>{
    //                     //  connection.release()
    //                     //  if(err){
    //                     //     errorLog.push(err.message)
    //                     //     return connection.rollback(()=>{
    //                     //         console.log('Error Committing Transaction',err)
    //                     //         reject('Failed')
    //                     //     })
                            
    //                     //  }
    //                      if(errorLog.length < 1){
    //                         resolve([])

    //                      }else{
    //                         resolve(resultArray)
    //                      }
                         
    //                     //  })
                       
    //                 })

    //         })

           
    //             return result

    //     }
    //     catch(error){
    //         console.error('Error creating user:', error);
    //         return 'Failed'
    //     }
        
    // }

    // async DeleteDependant(Phone:string,CreatorPhone:string): Promise<string>{

    //     let response : string = ''
    //     let errorLog:string[]=[]
    //     try{

    //         const connection =  await this.getConnection()
    //         let result = await new Promise<string>((resolve,reject)=>{
             
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                     console.log('connection error',err)
    //                     reject(err)
    //                 }
    //                 connection?.beginTransaction((err)=>{
    //                     if(err){
    //                         console.log('error beginning transaction',err)
    //                         reject(err)
    //                     }
    //                 })
                    
    //                 const query1 = `DELETE FROM Dependant WHERE Phone=? and CreatorPhone=?`
    //                 const query2 = `DELETE FROM Users WHERE Phone=?`
                   
    //                     connection?.query(query1,[Phone,CreatorPhone],(err,data)=>{
    //                      //connection.release()
    //                         if(err){
    //                             errorLog.push(err.message)
    //                             connection.rollback(()=>{
    //                                 console.log('error querying database',err)

    //                             })
    //                         }
    //                      })

    //                      connection?.query(query2,[Phone],(err,data)=>{
    //                                if(err){
    //                                 errorLog.push(err.message)
    //                                    connection.rollback(()=>{
    //                                        console.log('error querying database',err)
       
    //                                    })
    //                                }
    //                             })

                       


    //                      connection.commit((err)=>{
    //                      connection.release()
    //                      if(err){
    //                         errorLog.push(err.message)
    //                         return connection.rollback(()=>{
    //                             console.log('Error Committing Transaction',err)
    //                             reject('Failed')
    //                         })
                            
    //                      }
    //                      if(errorLog.length < 1){
    //                         resolve('Success')

    //                      }else{
    //                         resolve('Failed')
    //                      }
                         
    //                      })
                       
    //                 })

    //         })

           
    //             return result

    //     }
    //     catch(error){
    //         console.error('Error creating user:', error);
    //         return 'Failed'
    //     }
        
    
    // }

    // async UpdateDependantProfile(Id:number,payload:UpdateDependantModel): Promise<string>{

    //     let response : string = ''
    //     let errorLog:string[]=[]
    //     try{

    //         const connection =  await this.getConnection()
    //         let result = await new Promise<string>((resolve,reject)=>{
             
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                     console.log('connection error',err)
    //                     reject(err)
    //                 }
    //                 connection?.beginTransaction((err)=>{
    //                     if(err){
    //                         console.log('error beginning transaction',err)
    //                         reject(err)
    //                     }
    //                 })
    //                 const name = `${payload.FirstName} ${payload.LastName}`
    //                 const query1 = `UPDATE Dependant SET Name=?,Email=?,Phone=?,DOB=? WHERE Id=? and CreatorPhone=?`
    //                 const query2 = `UPDATE Users SET Gender=?,PhotoPath=? WHERE Phone=? and IsVerified=?`
                   
    //                     connection?.query(query1,[name,payload.Email,payload.Phone,payload.DOB,Id,payload.CreatorPhone],(err,data)=>{
    //                      //connection.release()
    //                         if(err){
    //                             errorLog.push(err.message)
    //                             connection.rollback(()=>{
    //                                 console.log('error querying database',err)

    //                             })
    //                         }
    //                      })

    //                      connection?.query(query2,[payload.Gender,payload.Phone,1],(err,data)=>{
    //                                if(err){
    //                                 errorLog.push(err.message)
    //                                    connection.rollback(()=>{
    //                                        console.log('error querying database',err)
       
    //                                    })
    //                                }
    //                             })

                       


    //                      connection.commit((err)=>{
    //                      connection.release()
    //                      if(err){
    //                         errorLog.push(err.message)
    //                         return connection.rollback(()=>{
    //                             console.log('Error Committing Transaction',err)
    //                             reject('Failed')
    //                         })
                            
    //                      }
    //                      if(errorLog.length < 1){
    //                         resolve('Success')

    //                      }else{
    //                         resolve('Failed')
    //                      }
                         
    //                      })
                       
    //                 })

    //         })

           
    //             return result

    //     }
    //     catch(error){
    //         console.error('Error creating user:', error);
    //         return 'Failed'
    //     }
        
        
    // }

    // async GetAllSubAdminProfile(): Promise<any>{

    //     let result : any
    //     try{
    //         const connection =  await this.getConnection()  
    //         let result =await new Promise<any>((resolve,reject)=>{
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                 console.log('connection error',err)
    //                 reject(err)
    //                 }

    //                 connection?.query('SELECT * FROM SubAdmin',(err,data)=>{
    //                     connection.release()
    //                     if(err){
    //                        console.log('error querying database',err)           
    //                     }
    //                     else{
    //                        console.log('successfully query checkers',data)
                           
    //                     }
    //                     resolve(data)
    //                    })
        

                   
                    
    //                 })
    //         })
    
    //          return result

    //     }catch(error){
    //      console.log('An error occurred',error)
    //     }


    // }

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
  

    
}