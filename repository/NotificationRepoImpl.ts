import { Pool } from "mysql2";
import NotificationRepo from "./Abstraction/NotificationRepo";
import conn from './dbContext/dbConnection'
import { GenerateUniqueId } from "../utilities/GenerateUniqueId";
import CreateNotificationModel from "../model/CreateNotificationModel";
import createSubAdminModel from "../model/createSubAdminModel";
import createCheckersModel from "../model/createcheckersModel";
import CreateDependantmodel from "../model/CreateDependantModel";

export default class NotificationRepoImpl implements NotificationRepo{
    private  async getConnection(): Promise<Pool | undefined>{
        try{
            return  await conn.getConnect()
        }
        catch(error){
         console.log('error getting  connection to MySql Server',error)
        }
        
    }

 async CreateNotification(payload:CreateNotificationModel):Promise<string>{
    
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

    
                var notificationId = `Notification-${GenerateUniqueId()}`
                const query1 = `INSERT INTO Notification(Title,IsSchedule,SendDate,SendTime,IsImmediately,Description,PhotoPath,CommunityId,NotificationId) VALUES(?,?,?,?,?,?,?,?,?)`
                const query2 = `INSERT INTO NotificationUser(UserId,NotificationId) VALUES(?,?)`
                const query3 = `INSERT INTO NotificationRoles(NotificationId,Role) VALUES(?,?)`
               
                    connection?.query(query1,[payload.Title,payload.IsSchedule,payload.SendDate,payload.SendTime,payload.IsImmediately,payload.Description,payload.PhotoPath,payload.CommunityId,notificationId],(err,data)=>{
                     //connection.release()
                        if(err){
                            errorLog.push(err.message)
                            return connection.rollback(()=>{
                                console.log('error querying database',err)
                                //reject('Failed')
                                

                            })
                        }
                     })

                     

                     for(let i=0;i<payload.UsersId!.length;i++){

                        connection?.query(query2,[payload.UsersId![i],notificationId],(err,data)=>{
                               if(err){
                                errorLog.push(err.message)
                                   return connection.rollback(()=>{
                                       console.log('error querying database',err)
                                       //reject('Failed')
                                       
   
                                   })
                               }
                            })

                     }//end of for loop

                     for(let i=0;i<payload.Roles.length;i++){

                        connection?.query(query3,[notificationId,payload.Roles[i]],(err,data)=>{
                               if(err){
                                errorLog.push(err.message)
                                   return connection.rollback(()=>{
                                       console.log('error querying database',err)
                                       //reject('Failed')
                                       
   
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
        console.error('Error creating Forum:', error);
        return 'Failed'
    }
    
    
 }

 async UpdateNotification(notificationId:string,payload:CreateNotificationModel):Promise<string>{
    
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

    
                const query1 = `UPDATE Notification SET Title=?,IsSchedule=?,SendDate=?,SendTime=?,IsImmediately=?,Description=?,PhotoPath=?,CommunityId=? WHERE NotificationId=?`
                const query2 = `UPDATE NotificationUser SET UserId=? WHERE NotificationId=?`
                
               
                    connection?.query(query1,[payload.Title,payload.IsSchedule,payload.SendDate,payload.SendTime,payload.IsImmediately,payload.Description,payload.PhotoPath,payload.CommunityId,notificationId],(err,data)=>{
                     //connection.release()
                        if(err){
                            errorLog.push(err.message)
                            return connection.rollback(()=>{
                                console.log('error querying database',err)
                                //reject('Failed')
                                

                            })
                        }
                     })

                     

                     for(let i=0;i<payload.UsersId!.length;i++){

                        connection?.query(query2,[payload.UsersId![i],notificationId],(err,data)=>{
                               if(err){
                                errorLog.push(err.message)
                                   return connection.rollback(()=>{
                                       console.log('error querying database',err)
                                       //reject('Failed')
                                       
   
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
        console.error('Error creating Forum:', error);
        return 'Failed'
    }
    
    
 }


 async UpdateDependantNotificationStatus(Id:number,payload:CreateDependantmodel):Promise<string>{
    let response : string = ''
    try{

        const connection =  await this.getConnection()
        let result = await new Promise<string>((resolve,reject)=>{
         
            connection?.getConnection((err,connection)=>{
                if(err){
                    console.log('connection error',err)
                    reject(err)
                }
                
              
                const query = `UPDATE Dependant SET AllowPushNotification=?,AllowEmailNotification=?,AllowSMSNotification=? WHERE Id=?`
               
                    connection?.query(query,[payload.AllowPushNotification,payload.AllowEmailNotification,payload.AllowSMSNotification,Id],(err,data)=>{
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

async UpdateCheckerNotificationStatus(Id:number,payload:createCheckersModel):Promise<string>{
    let response : string = ''
    try{

        const connection =  await this.getConnection()
        let result = await new Promise<string>((resolve,reject)=>{
         
            connection?.getConnection((err,connection)=>{
                if(err){
                    console.log('connection error',err)
                    reject(err)
                }
                
              
                const query = `UPDATE checkers SET AllowPushNotification=?,AllowEmailNotification=?,AllowSMSNotification=? WHERE Id=?`
               
                    connection?.query(query,[payload.AllowPushNotification,payload.AllowEmailNotification,payload.AllowSMSNotification,Id],(err,data)=>{
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

async UpdateSubAdminNotificationStatus(Id:number,payload:createSubAdminModel):Promise<string>{
    let response : string = ''
    try{

        const connection =  await this.getConnection()
        let result = await new Promise<string>((resolve,reject)=>{
         
            connection?.getConnection((err,connection)=>{
                if(err){
                    console.log('connection error',err)
                    reject(err)
                }
                
              
                const query = `UPDATE SubAdmin SET AllowPushNotification=?,AllowEmailNotification=?,AllowSMSNotification=? WHERE Id=?`
               
                    connection?.query(query,[payload.AllowPushNotification,payload.AllowEmailNotification,payload.AllowSMSNotification,Id],(err,data)=>{
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

}