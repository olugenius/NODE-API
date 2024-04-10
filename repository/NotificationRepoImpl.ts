import { Pool } from "mysql2";
import NotificationRepo from "./Abstraction/NotificationRepo";
import conn from './dbContext/dbConnection'
import { GenerateUniqueId } from "../utilities/GenerateUniqueId";
import CreateNotificationModel from "../model/CreateNotificationModel";
import createSubAdminModel from "../model/createSubAdminModel";
import createCheckersModel from "../model/createcheckersModel";
import CreateDependantmodel from "../model/CreateDependantModel";
import { injectable } from "inversify";
import memberModel from "../model/memberModel";

@injectable()
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

                     

                     for(let i=0;i<payload.UserIds!.length;i++){

                        connection?.query(query2,[payload.UserIds![i],notificationId],(err,data)=>{
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

                     

                     for(let i=0;i<payload.UserIds!.length;i++){

                        connection?.query(query2,[payload.UserIds![i],notificationId],(err,data)=>{
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


 async UpdateDependantNotificationStatus(dependantId:string,payload:CreateDependantmodel):Promise<string>{
    let response : string = ''
    try{

        const connection =  await this.getConnection()
        let result = await new Promise<string>((resolve,reject)=>{
         
            connection?.getConnection((err,connection)=>{
                if(err){
                    console.log('connection error',err)
                    reject(err)
                }
                
              
                const query = `UPDATE Dependant SET AllowPushNotification=?,AllowEmailNotification=?,AllowSMSNotification=? WHERE DependantId=?`
               
                    connection?.query(query,[payload.AllowPushNotification,payload.AllowEmailNotification,payload.AllowSMSNotification,dependantId],(err,data)=>{
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

async UpdateAllDependantNotificationStatusByAdmin(CreatorUserId:string,payload:CreateDependantmodel):Promise<string>{
    let response : string = ''
    try{

        const connection =  await this.getConnection()
        let result = await new Promise<string>((resolve,reject)=>{
         
            connection?.getConnection((err,connection)=>{
                if(err){
                    console.log('connection error',err)
                    reject(err)
                }
                
              
                const query = `UPDATE Dependant SET AllowPushNotification=?,AllowEmailNotification=?,AllowSMSNotification=? WHERE CreatorUserId=?`
               
                    connection?.query(query,[payload.AllowPushNotification,payload.AllowEmailNotification,payload.AllowSMSNotification,CreatorUserId],(err,data)=>{
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


async UpdateMemberNotificationStatus(memberId:string,payload:memberModel):Promise<string>{
    let response : string = ''
    try{

        const connection =  await this.getConnection()
        let result = await new Promise<string>((resolve,reject)=>{
         
            connection?.getConnection((err,connection)=>{
                if(err){
                    console.log('connection error',err)
                    reject(err)
                }
                
              
                const query = `UPDATE Member SET AllowPushNotification=?,AllowEmailNotification=?,AllowSMSNotification=? WHERE DependantId=?`
               
                    connection?.query(query,[payload.AllowPushNotification,payload.AllowEmailNotification,payload.AllowSMSNotification,memberId],(err,data)=>{
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

async UpdateAllMemberNotificationStatusByAdmin(CreatorUserId:string,payload:memberModel):Promise<string>{
    let response : string = ''
    try{

        const connection =  await this.getConnection()
        let result = await new Promise<string>((resolve,reject)=>{
         
            connection?.getConnection((err,connection)=>{
                if(err){
                    console.log('connection error',err)
                    reject(err)
                }
                
              
                const query = `UPDATE Member SET AllowPushNotification=?,AllowEmailNotification=?,AllowSMSNotification=? WHERE CreatorUserId=?`
               
                    connection?.query(query,[payload.AllowPushNotification,payload.AllowEmailNotification,payload.AllowSMSNotification,CreatorUserId],(err,data)=>{
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

async UpdateCheckerNotificationStatus(checkerId:string,payload:createCheckersModel):Promise<string>{
    let response : string = ''
    try{

        const connection =  await this.getConnection()
        let result = await new Promise<string>((resolve,reject)=>{
         
            connection?.getConnection((err,connection)=>{
                if(err){
                    console.log('connection error',err)
                    reject(err)
                }
                
              
                const query = `UPDATE checkers SET AllowPushNotification=?,AllowEmailNotification=?,AllowSMSNotification=? WHERE checkerId=?`
               
                    connection?.query(query,[payload.AllowPushNotification,payload.AllowEmailNotification,payload.AllowSMSNotification,checkerId],(err,data)=>{
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

async UpdateAllCheckerNotificationStatusByAdmin(CreatorUserId:string,payload:createCheckersModel):Promise<string>{
    let response : string = ''
    try{

        const connection =  await this.getConnection()
        let result = await new Promise<string>((resolve,reject)=>{
         
            connection?.getConnection((err,connection)=>{
                if(err){
                    console.log('connection error',err)
                    reject(err)
                }
                
              
                const query = `UPDATE checkers SET AllowPushNotification=?,AllowEmailNotification=?,AllowSMSNotification=? WHERE CreatorUserId=?`
               
                    connection?.query(query,[payload.AllowPushNotification,payload.AllowEmailNotification,payload.AllowSMSNotification,CreatorUserId],(err,data)=>{
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

async UpdateSubAdminNotificationStatus(subAdminId:string,payload:createSubAdminModel):Promise<string>{
    let response : string = ''
    try{

        const connection =  await this.getConnection()
        let result = await new Promise<string>((resolve,reject)=>{
         
            connection?.getConnection((err,connection)=>{
                if(err){
                    console.log('connection error',err)
                    reject(err)
                }
                
              
                const query = `UPDATE SubAdmin SET AllowPushNotification=?,AllowEmailNotification=?,AllowSMSNotification=? WHERE SubAdminId=?`
               
                    connection?.query(query,[payload.AllowPushNotification,payload.AllowEmailNotification,payload.AllowSMSNotification,subAdminId],(err,data)=>{
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

async UpdateAllSubAdminNotificationStatusByAdmin(CreatorUserId:string,payload:createSubAdminModel):Promise<string>{
    let response : string = ''
    try{

        const connection =  await this.getConnection()
        let result = await new Promise<string>((resolve,reject)=>{
         
            connection?.getConnection((err,connection)=>{
                if(err){
                    console.log('connection error',err)
                    reject(err)
                }
                
              
                const query = `UPDATE SubAdmin SET AllowPushNotification=?,AllowEmailNotification=?,AllowSMSNotification=? WHERE CreatorUserId=?`
               
                    connection?.query(query,[payload.AllowPushNotification,payload.AllowEmailNotification,payload.AllowSMSNotification,CreatorUserId],(err,data)=>{
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

async GetAllNotification():Promise<any>{
    try{
   
        const connection =  await this.getConnection()
        let result = await new Promise<any>((resolve,reject)=>{
         
            connection?.getConnection((err,connection)=>{
                if(err){
                    console.log('connection error',err)
                    reject(err)
                }
                
              
                const query = `SELECT * FROM Notification`
               
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

}