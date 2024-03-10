import { Pool } from "mysql2";
import CreateDependantmodel from "../model/CreateDependantModel";
import DependantRepository from "./Abstraction/DependantRepository";
import conn from './dbContext/dbConnection'
import { injectable } from "inversify";
import UpdateDependantModel from "../model/UpdateDependantModel";

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
    

    // async CreateDependant(payload:CreateDependantmodel): Promise<string>{
    //     let response : string = ''
    //     try{

    //         const connection =  await this.getConnection()
    //         let result = await new Promise<string>((resolve,reject)=>{
             
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                     console.log('connection error',err)
    //                     reject(err)
    //                 }

    //                 const query = `INSERT INTO Dependant(FirstDependantName,FirstDependantEmail,FirstDependantPhone,FirstDependantDOB,SecondDependantName,SecondDependantEmail,SecondDependantPhone,SecondDependantDOB) VALUES(?,?,?,?,?,?,?,?)`
                   
    //                     connection?.query(query,[payload.FirstDependantName,payload.FirstDependantEmail,payload.FirstDependantPhone,payload.FirstDependantDOB,payload.SecondDependantName,payload.SecondDependantEmail,payload.SecondDependantPhone,payload.SecondDependantDOB],(err,data)=>{
    //                      connection.release()
    //                         if(err){
    //                             console.log('error querying database',err)
    //                             response = 'Failed'
                               
    //                         }else{
    //                             console.log('successfully query',data)
    //                             response = 'Success'
                               
                               
    //                         }
    //                         resolve(response)
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

    async CreateDependant(payload:CreateDependantmodel[]): Promise<string>{
        let response : string = ''
        let errorLog:string[]=[]
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    connection?.beginTransaction((err)=>{
                        if(err){
                            console.log('error beginning transaction',err)
                            reject(err)
                        }
                    })
                    const query1 = `INSERT INTO Dependant(Name,Email,Phone,DOB,CreatorPhone) VALUES(?,?,?,?,?)`
                  

                         for(let i=0;i<payload.length;i++){

                            connection?.query(query1,[payload[i].Name,payload[i].Email,payload[i].Phone,payload[i].DOB,payload[i].CreatorPhone],(err,data)=>{
                                   if(err){
                                    errorLog.push(err.message)
                                       connection.rollback(()=>{
                                           console.log('error querying database',err)
       
                                       })
                                   }
                                })

                         }//end of for loop
                       


                         connection.commit((err)=>{
                         connection.release()
                         if(err){
                            errorLog.push(err.message)
                            return connection.rollback(()=>{
                                console.log('Error Committing Transaction',err)
                                reject('Failed')
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

                    connection?.query(`SELECT * FROM Dependant WHERE (Phone=? or Email=?)`,[channel,channel],(err,data)=>{
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

    async GetDependantProfileByPhoneOrEmail(channel: string,CreatorPhone:string): Promise<any> {
        let response : string = ''
        let errorLog:string[]=[]
        let resultArray:any[] = []
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<any>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    // connection?.beginTransaction((err)=>{
                    //     if(err){
                    //         console.log('error beginning transaction',err)
                    //         reject(err)
                    //     }
                    // })
                    const query1 = `SELECT * FROM Dependant WHERE (Phone=? or Email=? ) and CreatorPhone=?`
                    const query2 = `SELECT Gender,PhotoPath FROM Users WHERE (Phone=? or Email=?) and IsVerified=?`
                   
                        connection?.query(query1,[channel,channel,CreatorPhone],(err,data)=>{
                         //connection.release()
                            if(err){
                             errorLog.push('Failed')  
                            console.log('error querying database',err)
                            reject(err)

                            }
                            resultArray.push(data)
                         })

                         connection?.query(query2,[channel,channel,1],(err,data)=>{
                                   if(err){
                                   errorLog.push('Failed')
                                   console.log('error querying database',err)
                                   }
                                   resultArray.push(data)
                                })

                        


                        //  connection.commit((err)=>{
                        //  connection.release()
                        //  if(err){
                        //     errorLog.push(err.message)
                        //     return connection.rollback(()=>{
                        //         console.log('Error Committing Transaction',err)
                        //         reject('Failed')
                        //     })
                            
                        //  }
                         if(errorLog.length < 1){
                            resolve([])

                         }else{
                            resolve(resultArray)
                         }
                         
                        //  })
                       
                    })

            })

           
                return result

        }
        catch(error){
            console.error('Error creating user:', error);
            return 'Failed'
        }
        
    }
    async GetAllDependantProfile(CreatorPhone:string): Promise<any> {
        console.log('About to get All Dependant profile with CreatorPhone',CreatorPhone)
        let response : string = ''
        let errorLog:string[]=[]
        let resultArray:any[] = []
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<any>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    // connection?.beginTransaction((err)=>{
                    //     if(err){
                    //         console.log('error beginning transaction',err)
                    //         reject(err)
                    //     }
                    // })
                    const query1 = `SELECT * FROM Dependant WHERE CreatorPhone=?`
                    const query2 = `SELECT Gender,PhotoPath FROM Users WHERE Phone=? and IsVerified=?`
                   
                        connection?.query(query1,[CreatorPhone],(err,data:any[])=>{
                         //connection.release()
                            if(err){
                             errorLog.push('Failed')  
                            console.log('error querying database',err)
                            reject(err)

                            }else{
                                console.log('Successfully fetch Dependants with datas',data)
                                for(let i=0;i<data.length;i++){

                                    connection.query(query2,[data[i].Phone,1],(err2,data2)=>{
                                        if(err2){
                                            errorLog.push('Failed')  
                                           console.log('error querying database',err)
                                           reject(err)
               
                                           }else{

                                           console.log('Successfully fetch User details of dependant with datas',data2)
                                           resultArray.push(data.concat(data2))
                                           console.log('Result array value:',resultArray)

                                           }
                                           

                                    })

                                }
                                

                            }
                            
                         })

                        //  connection?.query(query2,[Phone,1],(err,data)=>{
                        //            if(err){
                        //            errorLog.push('Failed')
                        //            console.log('error querying database',err)
                        //            }
                        //            resultArray.push(data)
                        //         })

                        


                        //  connection.commit((err)=>{
                        //  connection.release()
                        //  if(err){
                        //     errorLog.push(err.message)
                        //     return connection.rollback(()=>{
                        //         console.log('Error Committing Transaction',err)
                        //         reject('Failed')
                        //     })
                            
                        //  }
                         if(errorLog.length < 1){
                            resolve(resultArray)

                         }else{
                            resolve([])
                         }
                         
                        //  })
                       
                    })

            })

           
                return result

        }
        catch(error){
            console.error('Error creating user:', error);
            return 'Failed'
        }
        
    }

    async DeleteDependant(Phone:string,CreatorPhone:string): Promise<string>{

        let response : string = ''
        let errorLog:string[]=[]
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    connection?.beginTransaction((err)=>{
                        if(err){
                            console.log('error beginning transaction',err)
                            reject(err)
                        }
                    })
                    
                    const query1 = `DELETE FROM Dependant WHERE Phone=? and CreatorPhone=?`
                    const query2 = `DELETE FROM Users WHERE Phone=?`
                   
                        connection?.query(query1,[Phone,CreatorPhone],(err,data)=>{
                         //connection.release()
                            if(err){
                                errorLog.push(err.message)
                                connection.rollback(()=>{
                                    console.log('error querying database',err)

                                })
                            }
                         })

                         connection?.query(query2,[Phone],(err,data)=>{
                                   if(err){
                                    errorLog.push(err.message)
                                       connection.rollback(()=>{
                                           console.log('error querying database',err)
       
                                       })
                                   }
                                })

                       


                         connection.commit((err)=>{
                         connection.release()
                         if(err){
                            errorLog.push(err.message)
                            return connection.rollback(()=>{
                                console.log('Error Committing Transaction',err)
                                reject('Failed')
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

    async UpdateDependantProfile(payload:UpdateDependantModel): Promise<string>{

        let response : string = ''
        let errorLog:string[]=[]
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    connection?.beginTransaction((err)=>{
                        if(err){
                            console.log('error beginning transaction',err)
                            reject(err)
                        }
                    })
                    const name = `${payload.FirstName} ${payload.LastName}`
                    const query1 = `UPDATE Dependant SET Name=?,Email=?,Phone=?,DOB=? WHERE Id=? and CreatorPhone=?`
                    const query2 = `UPDATE Users SET Gender=?,PhotoPath=? WHERE Phone=? and IsVerified=?`
                   
                        connection?.query(query1,[name,payload.Email,payload.Phone,payload.DOB,payload.Id,payload.CreatorPhone],(err,data)=>{
                         //connection.release()
                            if(err){
                                errorLog.push(err.message)
                                connection.rollback(()=>{
                                    console.log('error querying database',err)

                                })
                            }
                         })

                         connection?.query(query2,[payload.Gender,payload.Phone,1],(err,data)=>{
                                   if(err){
                                    errorLog.push(err.message)
                                       connection.rollback(()=>{
                                           console.log('error querying database',err)
       
                                       })
                                   }
                                })

                       


                         connection.commit((err)=>{
                         connection.release()
                         if(err){
                            errorLog.push(err.message)
                            return connection.rollback(()=>{
                                console.log('Error Committing Transaction',err)
                                reject('Failed')
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



  
  
}