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
import { injectable } from 'inversify'
import 'reflect-metadata'


interface UserRepository{
    GetUserByPhone(Phone:string):Promise<any | null>
    GetUserByEmailOrPhone(Email:string):Promise<any | null>
    GetUserByEmail(Email:string):Promise<any | null>
    AddToken(email:string,mailFor:string,token:string,medium:string):Promise<string>
    UpdateUserRefreshToken(phone:string,token:string):Promise<any>
    UpdateUserToken(email:string,mailFor:string):Promise<string>
    createUser(payload:registerModel):Promise<registerResponseModel>
    UpdateUserTokenTest(email:string,mailFor:string):Promise<string>


}
@injectable()
export default class UserRepositoryImpl implements UserRepository{
    connection! : Connection | undefined
   
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

                    connection?.query(`SELECT * FROM Users WHERE Phone = ?`,[Phone],(err,data)=>{
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

    async GetUserByEmailOrPhone(Email:string):Promise<any | null>{
        
       
        try{

       const connection =  await this.getConnection()   
        let result = await new Promise<any>((resolve,reject)=>{
            connection?.getConnection((err,connection)=>{
                if(err){
                console.log('connection error',err)
                reject(err)
                }
                connection?.query(`SELECT * FROM Users WHERE (Email = ? or Phone =?)`,[Email,Email],(err,data)=>{
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

    async AddToken(email:string,mailFor:string,token:string,medium:string):Promise<string>{
        let  result :string = ''
        try{
            const connection =  await this.getConnection() 
            
           let response =  await new Promise<string>((resolve,reject)=>{
                   connection?.getConnection(async(err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    
                        let channel =  medium.toLowerCase() === 'email' ? 'Email' : 'Phone'
                       connection?.query(`INSERT INTO MailToken(Token,${channel},MailFor,Used) VALUES(?,?,?,?) `,[token.toString(),email,mailFor,false],(err,data)=>{
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

                 connection?.query(`SELECT * FROM  MailToken WHERE (Email = ? or Phone=?)and Used=False and MailFor= ?`,[email,email,mailFor],(err,data)=>{
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

                 connection?.query(`UPDATE Users SET Password=? WHERE (Email = ? or Phone=?)`,[passwordEncrypt,email,email],(err,data)=>{
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

                 connection?.query(`UPDATE Users SET RefreshToken=? WHERE (Phone = ? or Email=?)`,[token,phone,phone],(err,data)=>{
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
                        connection?.query(`UPDATE MailToken SET Used = ?,UpdatedAt= ? where (Email=? or Phone=?) and MailFor=?`,[true,updatedAt,email,email,mailFor],(err,data)=>{
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
                            
                                connection?.query(`UPDATE Users SET IsVerified = ? where (Email=? or Phone=?)`,[true,email,email],(err,data)=>{
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


    async UpdateUserTokenTest(email:string,mailFor:string):Promise<string>{
       
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
                    
    
                       if(mailFor === 'EmailVerify'){
                        
                            connection?.query(`UPDATE Users SET IsVerified = ? where (Email=? or Phone=?)`,[true,email,email],(err,data)=>{
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
                    
                  
                    const query = `INSERT INTO Users(FirstName,LastName,DOB,Gender,Address,Phone,Email,PhotoPath,Password,IsVerified,Language,CompanyType) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`
                   
                        connection?.query(query,[payload.FirstName,payload.LastName,dateFormat,payload.Gender,payload.Address,payload.Phone,payload.Email,payload.PhotoPath,passwordEncrypt,false,payload.Language,payload.CompanyType],(err,data)=>{
                         connection.release()
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
