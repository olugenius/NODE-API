import { Connection } from 'mysql2/typings/mysql/lib/Connection'
import loginModel from '../model/loginModel'
import conn from './dbContext/dbConnection'
import bcrypt from 'bcrypt'
import { format } from 'date-fns/format'
import registerResponseModel from '../model/registerResponseModel'
import userToken from '../model/DTOs/userToken'
import { Pool } from 'mysql2/typings/mysql/lib/Pool'
import { Result } from 'express-validator'
import { dateFormatter } from '../utilities/dateFormatter'
import { injectable } from 'inversify'
import 'reflect-metadata'
import UserRepository from './Abstraction/UserRepository'
import { createPasswordRequestModel, updatePasswordRequestModel } from '../model/resetPasswordRequestModel'
import UpdateEmailModel from '../model/UpdateEmailModel'
import { GenerateUniqueId } from '../utilities/GenerateUniqueId'
import { registerModel, updateUserModel } from '../model/registerModel'


@injectable()
export default class UserRepositoryImpl implements UserRepository{
    connection! : Connection | undefined
   
     private  async getConnection(): Promise<Pool | undefined>{
        try{
            return  await conn.getConnect()
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


    async UpdateUserPassword(newPassword:string,channel:string):Promise<any>{
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

                 connection?.query(`UPDATE Users SET Password=? WHERE (Email = ? or Phone=?)`,[passwordEncrypt,channel,channel],(err,data)=>{
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
                    
                  const userId = GenerateUniqueId()
                    const query = `INSERT INTO Users(FirstName,LastName,DOB,Gender,Address,Phone,Email,PhotoPath,Password,IsVerified,Language,CompanyType,UserRole,UserId) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
                   
                        connection?.query(query,[payload.FirstName,payload.LastName,dateFormat,payload.Gender,payload.Address,payload.Phone,payload.Email ?? '',payload.PhotoPath,passwordEncrypt,false,payload.Language,payload.CompanyType,payload.UserRole,userId],(err,data)=>{
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
async updateUser(channel:string,payload:updateUserModel):Promise<string>{
    let response : string = ''
    try{
       
        const connection =  await this.getConnection()
        let result = await new Promise<string>((resolve,reject)=>{
         
            connection?.getConnection((err,connection)=>{
                if(err){
                    console.log('connection error',err)
                    reject(err)
                }
                
              const userId = GenerateUniqueId()
                const query = `UPDATE Users SET FirstName=?,LastName=?,Email=?,PhotoPath=? WHERE (Phone=? or Email=?)`
               
                    connection?.query(query,[payload.FirstName,payload.LastName,payload.Email ?? '',payload.PhotoPath,channel,channel],(err,data)=>{
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

    async CreatePassword(payload:createPasswordRequestModel):Promise<any>{
        const saltRound = 10
        const passwordEncrypt = await bcrypt.hash(payload.Password,saltRound)
        let resValue:string = ''
        try{
            const connection =  await this.getConnection() 
       let result =  await new Promise<any>((resolve,reject)=>{
            connection?.getConnection((err,connection)=>{
                if(err){
                console.log('connection error',err)
                reject(err)
                }

                 connection?.query(`UPDATE Users SET Password=? WHERE (Phone = ? or Email=?)`,[passwordEncrypt,payload.Channel],(err,data)=>{
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

    async UpdatePassword(payload:updatePasswordRequestModel):Promise<any>{
        const saltRound = 10
        const passwordEncrypt = await bcrypt.hash(payload.NewPassword,saltRound)
        let resValue:string = ''
        try{
            const connection =  await this.getConnection() 
       let result =  await new Promise<any>((resolve,reject)=>{
            connection?.getConnection((err,connection)=>{
                if(err){
                console.log('connection error',err)
                reject(err)
                }

                 connection?.query(`UPDATE Users SET Password=? WHERE Phone = ?`,[passwordEncrypt,payload.Phone],(err,data)=>{
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

    async DeleteAccount(Id:number):Promise<string>{
        
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
                    
                        
                            connection?.query(`DELETE FROM Users WHERE Id=?`,[Id],(err,data)=>{
                                if(err){
                                   console.log('error querying database',err)
                                   resolve('Failed')
                   
                                }
                                else{
                                   console.log('successfully query',data)
                                   resolve('Success')
                                    
                                }
                               })
    
                    
                     

            }catch(error){
                
            }finally{
                connection.release()
            }
           
            
            })
    })
    return result

   
    }

    async UpdateEmail(payload:UpdateEmailModel):Promise<string>{
   
        let response : string
       let result =  await new Promise<string>(async(resolve,reject)=>{
        const connection =  await this.getConnection() 
        connection?.getConnection((err,connection)=>{
            try{

                if(err){
                    console.log('connection error',err)
                    reject(err)
                    }
                    
    
                        
                            connection?.query(`UPDATE Users SET Email = ? where (Email=? or Phone=?)`,[payload.NewEmail,payload.Channel,payload.Channel],(err,data)=>{
                                if(err){
                                   console.log('error querying database',err)
                                   resolve('Failed')
                   
                                }
                                else{
                                   console.log('successfully query',data)
                                   resolve('Success')
                                    
                                }
                               })
    
                     
                     

            }catch(error){
                
            }finally{
                connection.release()
            }
           
            
            })
    })
    return result

    }

    // async GetUserByCreatorUserId(creatorUserId:string):Promise<any | null>{
        
       
    //     try{
    //         const resData:any[] = []
    //    const query1 = 'SELECT FirstName,LastName,PhotoPath  FROM subadmin where creatorUserId = ?'
    //    const query2 = 'select FirstName,LastName,Phone, (select PhotoPath from users where (Phone = a.Phone or Email = a.Email)) as PhotoPath from member a where a.CreatorUserId = ?'
    //    const query3 = 'select FirstName,LastName,Phone,(select PhotoPath from users where (Phone = a.Phone or Email = a.Email)) as PhotoPath  from checkers a  where a.CreatorUserId = ?'
    //    const connection =  await this.getConnection()   
    //     let result = await new Promise<any>((resolve,reject)=>{
    //         connection?.getConnection((err,connection)=>{
    //             if(err){
    //             console.log('connection error',err)
    //             reject(err)
    //             }
    //             connection?.query(query1,[creatorUserId],(err,data:any[])=>{
    //                 //connection.release()
    //                 if(err){
    //                    console.log('error querying database',err)
                       
       
    //                 }
    //                 else{
    //                     console.log('SubAdmin data',data)
    //                     data.forEach((dt)=>{
    //                         resData.push(dt)

    //                     })
    //                     //resolve(resData)
                       
                       
    //                 }
    //                 //resolve(data)
    //                })




    //                connection?.query(query2,[creatorUserId],(err,data:any[])=>{
    //                 //connection.release()
    //                 if(err){
    //                    console.log('error querying database',err)
                       
       
    //                 }
    //                 else{
    //                     console.log('Member data',data)
    //                     data.forEach((dt)=>{
    //                         resData.push(dt)

    //                     })
    //                     //resolve(resData)
                       
                       
    //                 }
    //                 //resolve(data)
    //                })


    //                connection?.query(query3,[creatorUserId],(err,data:any[])=>{
    //                 //connection.release()
    //                 if(err){
    //                    console.log('error querying database',err)
                       
       
    //                 }
    //                 else{
    //                     console.log('Checker data',data)
    //                     data.forEach((dt)=>{
    //                         resData.push(dt)

    //                     })
    //                     //resolve(resData)
                        
                       
                       
    //                 }
    //                 //resolve(data)
    //                })
    //                if(resData.length > 0){
    //                 resolve(resData)

    //                }else{
    //                 resolve([])

    //                }
                  

    //           console.log('Final user datas',resData)
    //            connection.release()
                
    //             })
                
    //     })

    //     //console.log('About to query Db after connection success')
    //      //await new Promise<void>((resolve,reject)=>{

    //         // connection?.query(`SELECT * FROM Users WHERE Email = ?`,[Email],(err,data)=>{
    //         //     if(err){
    //         //        console.log('error querying database',err)
    //         //        reject(err)
   
    //         //     }
    //         //     else{
    //         //        console.log('successfully query',data)
    //         //        result = data
    //         //        resolve()
    //         //     }
    //         //    })


    //      //})

    //      return result

    //     }catch(error){
    //       console.error('An error occurred',error)
          
    //     }finally{
            
    //     }
        

         
         
    // }

    async GetUserByCreatorUserId(creatorUserId: string): Promise<any | null> {
        try {
            const resData: any[] = [];
            const query1 = 'SELECT FirstName, LastName, PhotoPath FROM subadmin WHERE creatorUserId = ?';
            const query2 = 'SELECT FirstName, LastName, Phone, (SELECT PhotoPath FROM users WHERE (Phone = a.Phone OR Email = a.Email)) AS PhotoPath FROM member a WHERE a.CreatorUserId = ?';
            const query3 = 'SELECT FirstName, LastName, Phone, (SELECT PhotoPath FROM users WHERE (Phone = a.Phone OR Email = a.Email)) AS PhotoPath FROM checkers a WHERE a.CreatorUserId = ?';
            const connection = await this.getConnection();
    
            
                connection?.getConnection(async (err,connection)=>{

                    if(err){
                        console.log('error connecting to database',err)

                    }
                    
                    const [subadminData, memberData, checkerData] = await Promise.all([


                    new Promise<any[]>((resolve, reject) => {
                        connection.query(query1, [creatorUserId], (err, data: any[]) => {
                            if (err) {
                                console.error('Error querying subadmin table:', err);
                                reject(err);
                            } else {
                                console.log('SubAdmin data:', data);
                                resolve(data);
                            }
                        });
                    }),
                    new Promise<any[]>((resolve, reject) => {
                        connection.query(query2, [creatorUserId], (err, data: any[]) => {
                            if (err) {
                                console.error('Error querying member table:', err);
                                reject(err);
                            } else {
                                console.log('Member data:', data);
                                resolve(data);
                            }
                        });
                    }),
                    new Promise<any[]>((resolve, reject) => {
                        connection.query(query3, [creatorUserId], (err, data: any[]) => {
                            if (err) {
                                console.error('Error querying checkers table:', err);
                                reject(err);
                            } else {
                                console.log('Checker data:', data);
                                resolve(data);
                            }
                        });
                    })
                    


                ]);

                connection.release()
                
                // Push the data from all queries into resData
                subadminData.forEach(dt => resData.push(dt));
                memberData.forEach(dt => resData.push(dt));
                checkerData.forEach(dt => resData.push(dt));


                })
                
              
           
    
            
    
           
    
            // Return the combined result
            console.log('Final user data:', resData);
            return resData;
    
        } catch (error) {
            console.error('An error occurred:', error);
            return null;
        }
    }
    


}
