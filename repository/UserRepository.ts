import { Connection } from 'mysql2/typings/mysql/lib/Connection'
import loginModel from '../model/loginModel'
import conn from '../repository/dbContext/dbConnection'
import registerModel from '../model/registerModel'
import bcrypt from 'bcrypt'
import { format } from 'date-fns/format'
import registerResponseModel from '../model/registerResponseModel'
import userToken from '../model/DTOs/userToken'
import { Pool } from 'mysql2/typings/mysql/lib/Pool'
import { Result } from 'express-validator'
import { dateFormatter } from '../utilities/dateFormatter'


export default class UserRepository{
    connection! : Connection | undefined
     constructor(){
    this.getConnection()
    }
     private  async getConnection(): Promise<Pool | undefined>{
        try{
            return  await new conn().getConnect()
        }
        catch(error){
         console.log('error getting  connection to MySql Server',error)
        }
        
    }

    async getAllUsers(loginModel:loginModel){
        this.connection?.connect((err)=>{
            if(err){
            console.log('connection error',err)
            }
            
            })
        
            this.connection?.query('',(err,data)=>{

            })
    }



    async GetUserByPhone(Phone:string):Promise<any | null>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM Users WHERE Phone = '${Phone}'`,(err,data)=>{
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
    
             //await new Promise<void>((resolve,reject)=>{
    
                // connection?.query(`SELECT * FROM Users WHERE Phone = '${Phone}'`,(err,data)=>{
                //     if(err){
                //        console.log('error querying database',err)
                //        reject(err)
       
                //     }
                //     else{
                //        console.log('successfully query',data)
                //        result = data
                //        resolve()
                //     }
                //    })
    
    
             //})
             return result

        }catch(error){
         
        }
       

        
         
    }

    async GetUserByEmail(Email:string):Promise<any | null>{
        
       
        try{

       const connection =  await this.getConnection()   
        let result = await new Promise<any>((resolve,reject)=>{
            connection?.getConnection((err,connection)=>{
                if(err){
                console.log('connection error',err)
                reject(err)
                }
                connection?.query(`SELECT * FROM Users WHERE Email = ?`,[Email],(err,data)=>{
                    connection.release()
                    if(err){
                       console.log('error querying database',err)
                       
       
                    }
                    else{
                       console.log('successfully query',data)
                       
                       
                    }
                    resolve(data)
                   })

                console.log('connection success')
               
                
                })
                
        })

        //console.log('About to query Db after connection success')
         //await new Promise<void>((resolve,reject)=>{

            // connection?.query(`SELECT * FROM Users WHERE Email = ?`,[Email],(err,data)=>{
            //     if(err){
            //        console.log('error querying database',err)
            //        reject(err)
   
            //     }
            //     else{
            //        console.log('successfully query',data)
            //        result = data
            //        resolve()
            //     }
            //    })


         //})

         return result

        }catch(error){
          console.error('An error occurred',error)
          
        }
        

         
         
    }

    async AddToken(email:string,mailFor:string):Promise<string>{
        let  result :string = ''
        try{
            const connection =  await this.getConnection() 
            
           let response =  await new Promise<string>((resolve,reject)=>{
                   connection?.getConnection(async(err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    let token = Math.floor(100000 + Math.random() * 900000);
                    
                       connection?.query(`INSERT INTO MailToken(Token,Email,MailFor,Used) VALUES('${token.toString()}','${email}','${mailFor}',False) `,(err,data)=>{
                        connection.release()
                        if(err){
                           console.log('error querying database',err)
                           result = 'Failed'
           
                        }
                        else{
                           console.log('successfully query',data)
                           result = 'Success'
                       
                        }
                        resolve(result)
                       })
                    
                    
                    })
            })
    
          
             return response

        }catch(error){
            return 'Failed'
        }
        
        

       
         
    }


    async GetUserToken(email:string,mailFor:string):Promise<any>{
        let tokenValue : userToken | any
        try{
            const connection =  await this.getConnection() 
       
       let result =  await new Promise<any>((resolve,reject)=>{
            connection?.getConnection((err,connection)=>{
                if(err){
                console.log('connection error',err)
                reject(err)
                }

                 connection?.query(`SELECT * FROM  MailToken WHERE Email = '${email}' and Used=False and MailFor= '${mailFor}'`,(err,data)=>{
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


    async UpdateUserPassword(newPassword:string,email:string):Promise<any>{
        let tokenValue : userToken | any
        let resValue:string = ''
        try{
            const connection =  await this.getConnection() 
            const saltRound = 10
            const passwordEncrypt = await bcrypt.hash(newPassword,saltRound)
       let result =  await new Promise<any>((resolve,reject)=>{
            connection?.getConnection((err,connection)=>{
                if(err){
                console.log('connection error',err)
                reject(err)
                }

                 connection?.query(`UPDATE Users SET Password=? WHERE Email = ?`,[passwordEncrypt,email],(err,data)=>{
                connection.release()
                if(err){
                   console.log('error querying database',err)   
                   resValue = 'Failed'
                }
                else{
                   console.log('successfully query',data)
                   resValue = 'Success'
                   
                }
                resolve(resValue)
               })
                
                
                })
        })

        return result
       

        }catch(error){
         
        }
        

         
         
    }


    async UpdateUserRefreshToken(phone:string,token:string):Promise<any>{
        let tokenValue : userToken | any
        let resValue:string = ''
        try{
            const connection =  await this.getConnection() 
       let result =  await new Promise<any>((resolve,reject)=>{
            connection?.getConnection((err,connection)=>{
                if(err){
                console.log('connection error',err)
                reject(err)
                }

                 connection?.query(`UPDATE Users SET RefreshToken=? WHERE Phone = ?`,[token,phone],(err,data)=>{
                connection.release()
                if(err){
                   console.log('error querying database',err)   
                   resValue = 'Failed'
                }
                else{
                   console.log('successfully query',data)
                   resValue = 'Success'
                   
                }
                resolve(resValue)
               })
                
                
                })
        })

        return result
       

        }catch(error){
         
        }
        

         
         
    }


    async UpdateUserToken(email:string,mailFor:string):Promise<string>{
       
            let response : string
            let updatedAt =format(new Date(),'yyy-MM-dd HH:mm:ss')
           let result =  await new Promise<string>(async(resolve,reject)=>{
            const connection =  await this.getConnection() 
            connection?.getConnection((err,connection)=>{
                try{

                    if(err){
                        console.log('connection error',err)
                        reject(err)
                        }
                        connection?.query(`UPDATE MailToken SET Used = True,UpdatedAt= '${updatedAt}' where Email='${email}' and MailFor='${mailFor}'`,(err,data)=>{
                            if(err){
                               console.log('error querying database',err)   
                               resolve('failed')    
                            }
                            else{
                               console.log('successfully query',data)
                               resolve('success')
                            }
                           })
        
                           if(mailFor === 'EmailVerify'){
                            
                                connection?.query(`UPDATE Users SET IsVerified = True where Email='${email}'`,(err,data)=>{
                                    if(err){
                                       console.log('error querying database',err)
                                       resolve('Failed')
                       
                                    }
                                    else{
                                       console.log('successfully query',data)
                                       resolve('Success')
                                        
                                    }
                                   })
        
                         }
                         

                }catch(error){
                    
                }finally{
                    connection.release()
                }
               
                
                })
        })
        return result

       
         
    }


    // async createUser(payload:registerModel):Promise<registerResponseModel>{
   
    //     let response : registerResponseModel = {status: ''}
    //     try{
    //         const saltRound = 10
    //         const passwordEncrypt = await bcrypt.hash(payload.Password,saltRound)
    //         let dateFormat = format(payload.DOB, 'yyyy-MM-dd')
    //         const connection =  await this.getConnection()
    //         await new Promise<void>((resolve,reject)=>{
             
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                     console.log('connection error',err)
    //                     reject(err)
    //                 }
                    
                  
    //                 const query = `INSERT INTO Users(FirstName,LastName,DOB,Gender,Address,Phone,Email,PhotoPath,Password,VerifyChannel,IsVerified,Language,CompanyType) VALUES('${payload.FirstName}','${payload.LastName}','${dateFormat}','${payload.Gender}','${payload.Address}','${payload.Phone}','${payload.Email}','${payload.PhotoPath}','${passwordEncrypt}','${payload.VerifyChannel}',${payload.IsVerified ?? false},'${payload.Language}','${payload.CompanyType}')`
    //                 connection.release()
    //                 //await new Promise<void>((resolve,reject)=>{
    //                     connection?.query(query,(err,data)=>{
    //                         if(err){
    //                             console.log('error querying database',err)
    //                             response.status = 'Failed'
                               
    //                         }else{
    //                             console.log('successfully query',data)
    //                             response.status = 'Success'
                               
                               
    //                         }
            
    //                      })
         
    //                 })
    //                    resolve()
                    
    //                 //})

    //         })
          
               
    //             // const saltRound = 10
    //             // const passwordEncrypt = await bcrypt.hash(payload.Password,saltRound)
    //             // let dateFormat = format(payload.DOB, 'yyyy-MM-dd')
    //             // const query = `INSERT INTO Users(FirstName,LastName,DOB,Gender,Address,Phone,Email,PhotoPath,Password,VerifyChannel,IsVerified,Language,CompanyType) VALUES('${payload.FirstName}','${payload.LastName}','${dateFormat}','${payload.Gender}','${payload.Address}','${payload.Phone}','${payload.Email}','${payload.PhotoPath}','${passwordEncrypt}','${payload.VerifyChannel}',${payload.IsVerified ?? false},'${payload.Language}','${payload.CompanyType}')`
    //             // await new Promise<void>((resolve,reject)=>{
    //             //     connection?.query(query,(err,data)=>{
    //             //         if(err){
    //             //             console.log('error querying database',err)
    //             //             reject(err)
    //             //         }else{
    //             //             console.log('successfully query',data)
    //             //             resolve()
                           
    //             //         }
        
    //             //      })
     
    //             // })

    //             return response

    //     }
    //     catch(error){
    //         console.error('Error creating user:', error);
    //         return {status:'Failed'}
    //     }
           
    //             //response.verifyChannel = payload.VerifyChannel
               
               

                 
        
    // }


    async createUser(payload:registerModel):Promise<registerResponseModel>{
   
        let response : registerResponseModel = {status: ''}
        try{
            const saltRound = 10
            const passwordEncrypt = await bcrypt.hash(payload.Password,saltRound)
            let dateFormat = dateFormatter(payload.DOB)
            const connection =  await this.getConnection()
            let result = await new Promise<registerResponseModel>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `INSERT INTO Users(FirstName,LastName,DOB,Gender,Address,Phone,Email,PhotoPath,Password,VerifyChannel,IsVerified,Language,CompanyType) VALUES('${payload.FirstName}','${payload.LastName}','${dateFormat}','${payload.Gender}','${payload.Address}','${payload.Phone}','${payload.Email}','${payload.PhotoPath}','${passwordEncrypt}','${payload.VerifyChannel}',${payload.IsVerified ?? false},'${payload.Language}','${payload.CompanyType}')`
                    connection.release()
                        connection?.query(query,(err,data)=>{
                            if(err){
                                console.log('error querying database',err)
                                response.status = 'Failed'
                               
                            }else{
                                console.log('successfully query',data)
                                response.status = 'Success'
                               
                               
                            }
                            resolve(response)
                         })
                       
                    })

            })

           
          

                return result

        }
        catch(error){
            console.error('Error creating user:', error);
            return {status:'Failed'}
        }
           
               
               

                 
        
    }
}
