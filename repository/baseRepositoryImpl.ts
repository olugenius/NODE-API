import { Pool } from "mysql2";
import bulkAccessCodeModel from "../model/bulkAccessCodeModel";
import singleAccessCodeModel from "../model/singleAccessCodeModel";
import staticAccessCodeModel from "../model/staticAccessCodeModel";
import conn from './dbContext/dbConnection'
import { GenerateUniqueId } from "../utilities/GenerateUniqueId";
import BaseRepository from "./Abstraction/baseRepository";
import { injectable } from "inversify";
import CreateForumModel from "../model/CreateForumModel";
import PostModel from "../model/PostModel";
import CommentModel from "../model/CommentModel";
import { formatDuration } from "date-fns";
import createAppointmentModel from "../model/creatAppointmentModel";
import TransactionModel from "../model/TransactionModel";
import createServiceProviderModel from "../model/createServiceProviderModel";

@injectable()
export default class baseRepositoryImpl implements BaseRepository{

    private  async getConnection(): Promise<Pool | undefined>{
        try{
            return  await conn.getConnect()
        }
        catch(error){
         console.log('error getting  connection to MySql Server',error)
        }
        
    }
    

    async createSingleCode(payload:singleAccessCodeModel): Promise<string>{
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                    var AccessCode = `Access- ${GenerateUniqueId()}`
                    const query = `INSERT INTO AccessCode(CodeType,Code,Purpose,StartTime,EndTime,Name,Date,Phone,Email) VALUES(?,?,?,?,?,?,?,?,?)`
                   
                        connection?.query(query,['Single',AccessCode,payload.PurposeCode,payload.StartTime,payload.EndTime,payload.Name,payload.Date,payload.Phone,payload.Email],(err,data)=>{
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
  
    async createStaticCode(payload:staticAccessCodeModel): Promise<string>{

        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                    var AccessCode = `Access- ${GenerateUniqueId()}`
                    const query = `INSERT INTO AccessCode(CodeType,Code,DateRange,Frequency,Name,Phone,Email,Category) VALUES(?,?,?,?,?,?,?,?)`
                   
                        connection?.query(query,['Static',AccessCode,payload.DateRange,payload.Frequency,payload.Name,payload.Phone,payload.Email,payload.Category],(err,data)=>{
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

    async createBulkCode(payload:bulkAccessCodeModel): Promise<string>{

        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                    var AccessCode = `Access- ${GenerateUniqueId()}`
                    const query = `INSERT INTO AccessCode(CodeType,Code,Date,StartTime,EndTime,Frequency,AppointmentTitle,Phone,Email,NoOfParticipants) VALUES(?,?,?,?,?,?,?,?,?,?)`
                   
                        connection?.query(query,['Bulk',AccessCode,payload.Date,payload.StartTime,payload.EndTime,payload.Frequency,payload.AppointmentTitle,payload.Phone,payload.Email,payload.NoOfParticipants],(err,data)=>{
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

    async getAllAccessCode(): Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM AccessCode`,(err,data)=>{
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

    async getAccessCodeByid(Id:number): Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM AccessCode WHERE Id = ?`,[Id],(err,data)=>{
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

    async CreateForum(payload:CreateForumModel): Promise<string>{

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
                    var forumId = `Forum-${GenerateUniqueId()}`
                    const query1 = `INSERT INTO Forum(CommunityId,Title,ForumId,CreatedBy,DateCreated,Status) VALUES(?,?,?,?,?,?)`
                    const query2 = `INSERT INTO ForumUsers(UserId,ForumId) VALUES(?,?)`
                    const query3 = `INSERT INTO ForumMembers(ForumId,UserRole) VALUES(?,?)`
                   
                        connection?.query(query1,[payload.CommunityId,payload.Title,forumId,payload.CreatorUserId,new Date(),1],(err,data)=>{
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

                            connection?.query(query2,[payload.UserIds![i],forumId],(err,data)=>{
                                   if(err){
                                    errorLog.push(err.message)
                                       return connection.rollback(()=>{
                                           console.log('error querying database',err)
                                           //reject('Failed')
                                           
       
                                       })
                                   }
                                })

                         }//end of for loop

                         for(let i=0;i<payload.UserRoles.length;i++){

                            connection?.query(query3,[forumId,payload.UserRoles[i]],(err,data)=>{
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

    async UpdateForum(Id:string,payload:CreateForumModel): Promise<string>{

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
                    const query1 = `UPDATE Forum SET Title=?,CommunityId=? WHERE ForumId=?`
                    const query2 = `UPDATE ForumMembers SET UserRole=? WHERE ForumId=?`
                   
                        connection?.query(query1,[payload.Title,payload.CommunityId,Id],(err,data)=>{
                         //connection.release()
                            if(err){
                                errorLog.push(err.message)
                                connection.rollback(()=>{
                                    console.log('error querying database',err)

                                })
                            }
                         })


                         for(let i=0;i<payload.UserRoles.length;i++){

                            connection?.query(query2,[payload.UserRoles[i],Id],(err,data)=>{
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

    async DeleteForum(Id:string): Promise<string>{

        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                    const query = `UPDATE Forum SET Status= ? WHERE ForumId=?`
                   
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
            console.error('Error creating user:', error);
            return 'Failed'
        }
        
        
    }

    async DeactivateForum(Id:string): Promise<string>{

        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                    const query = `UPDATE Forum SET Status= ? WHERE ForumId=?`
                    console.log('About to deactivate forum',Id)
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
            console.error('Error creating user:', error);
            return 'Failed'
        }
        
        
    }

    async ActivateForum(Id:string): Promise<string>{

        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                    const query = `UPDATE Forum SET Status= ? WHERE ForumId=?`
                   
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
            console.error('Error creating user:', error);
            return 'Failed'
        }
        
        
    }

    async GetAllForum():Promise<any>{
        try{
   
           const connection =  await this.getConnection()
           let result = await new Promise<any>((resolve,reject)=>{
            
               connection?.getConnection((err,connection)=>{
                   if(err){
                       console.log('connection error',err)
                       reject(err)
                   }
                   
                 
                   const query = `SELECT * FROM Forum`
                  
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
   
   
    async GetForumByForumId(Id:string):Promise<any>{
           try{
      
              const connection =  await this.getConnection()
              let result = await new Promise<any>((resolve,reject)=>{
               
                  connection?.getConnection((err,connection)=>{
                      if(err){
                          console.log('connection error',err)
                          reject(err)
                      }
                      
                    
                      const query = `SELECT * FROM Forum where ForumId = ?`
                     
                          connection?.query(query,[Id],(err,data)=>{
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

    async CreatePost(payload:PostModel):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `INSERT INTO Post(Title,Information,UserId,CreatedAt) VALUES(?,?,?,?)`
                   
                        connection?.query(query,[payload.Title,payload.Information,payload.UserId,new Date()],(err,data)=>{
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

    async GetAllPost():Promise<any>{
        try{
   
           const connection =  await this.getConnection()
           let result = await new Promise<any>((resolve,reject)=>{
            
               connection?.getConnection((err,connection)=>{
                   if(err){
                       console.log('connection error',err)
                       reject(err)
                   }
                   
                 
                   const query = `SELECT * FROM Post`
                  
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

    async GetPostById(PostId:number):Promise<any>{
        try{
   
           const connection =  await this.getConnection()
           let result = await new Promise<any>((resolve,reject)=>{
            
               connection?.getConnection((err,connection)=>{
                   if(err){
                       console.log('connection error',err)
                       reject(err)
                   }
                   
                 
                   const query = `SELECT * FROM Post where Id = ?`
                  
                       connection?.query(query,[PostId],(err,data)=>{
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

    async CreateComment(payload:CommentModel):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `INSERT INTO Comments(PostId,Comment,UserId,CreatedAt) VALUES(?,?,?,?)`
                   
                        connection?.query(query,[payload.PostId,payload.Comment,payload.UserId,new Date()],(err,data)=>{
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

    async UpdateComment(Id:number,payload:CommentModel):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `UPDATE Comments SET Comment= ?,UpdatedAt=? WHERE Id=?`
                   
                        connection?.query(query,[payload.Comment,new Date(),Id],(err,data)=>{
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

    async DeleteComment(Id:number):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `DELETE FROM Comments WHERE Id=?`
                   
                        connection?.query(query,[Id],(err,data)=>{
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

    async GetAllComments():Promise<any>{
        try{
   
           const connection =  await this.getConnection()
           let result = await new Promise<any>((resolve,reject)=>{
            
               connection?.getConnection((err,connection)=>{
                   if(err){
                       console.log('connection error',err)
                       reject(err)
                   }
                   
                 
                   const query = `SELECT * FROM Comments`
                  
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

    async GetCommentById(Id:number):Promise<any>{
        try{
   
           const connection =  await this.getConnection()
           let result = await new Promise<any>((resolve,reject)=>{
            
               connection?.getConnection((err,connection)=>{
                   if(err){
                       console.log('connection error',err)
                       reject(err)
                   }
                   
                 
                   const query = `SELECT * FROM Comments where Id = ?`
                  
                       connection?.query(query,[Id],(err,data)=>{
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

    async createAppointment(payload:createAppointmentModel):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `INSERT INTO Appointment(Title,Date,Time,Venue,Description,PhotoPath,CommunityId) VALUES(?,?,?,?,?,?,?)`
                   
                        connection?.query(query,[payload.Title,payload.Date,payload.Time,payload.Venue,payload.Description,payload.PhotoPath,payload.CommunityId],(err,data)=>{
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

    async updateAppointment(payload:createAppointmentModel):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `UPDATE Appointment SET Title=?,Date=?,Time=?,Venue=?,Description=?,PhotoPath=?,CommunityId=? WHERE Id= ?`
                   
                        connection?.query(query,[payload.Title,payload.Date,payload.Time,payload.Venue,payload.Description,payload.PhotoPath,payload.CommunityId,payload.Id],(err,data)=>{
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

    async deleteAppointment(Id:number):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `DELETE FROM  Appointment WHERE Id= ?`
                   
                        connection?.query(query,[Id],(err,data)=>{
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

    async GetAllAppointment():Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM Appointment`,(err,data)=>{
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

    async GetAppointmentId(Id:number):Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM Appointment where Id=?`,[Id],(err,data)=>{
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

    async GetAppointmentCommunityId(CommunityId:string):Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM Appointment where CommunityId=?`,[CommunityId],(err,data)=>{
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


    async CreateTransaction(payload:TransactionModel):Promise<string>{

        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  const transid = `Trans-${GenerateUniqueId()}`
                    const query = `INSERT INTO Transaction(TransactionId,Product,Plan,Phone,DateTime,Amount,TotalAmount,Status,PaymentMethod) VALUES(?,?,?,?,?,?,?,?,?)`
                   
                        connection?.query(query,[transid,payload.Product,payload.Plan,payload.Phone,payload.DateTime,payload.Amount,payload.TotalAmount,payload.Status,payload.PaymentMethod],(err,data)=>{
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

    async GetTransactionByTransactionId(transactionId:string):Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM Transaction where TransactionId=?`,[transactionId],(err,data)=>{
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

    async GetAllTransaction():Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM Transaction`,(err,data)=>{
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

    async DeleteTransaction(transactionId:string):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `DELETE FROM  Transaction WHERE TransactionId= ?`
                   
                        connection?.query(query,[transactionId],(err,data)=>{
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

    async CreateServiceProvider(payload:createServiceProviderModel):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  const providerId = `Provider- ${GenerateUniqueId()}`
                    const query = `INSERT INTO ServiceProviders(ProviderId,CreatedAt,BusinessName,BusinessCategory,BusinessType,RegistrationType,BusinessRegNum,BusinessTaxId,BusinessDescription,CACPhotoPath) VALUES(?,?,?,?,?,?,?,?,?,?)`
                   
                        connection?.query(query,[providerId,new Date(),payload.BusinessName,payload.BusinessCategory,payload.BusinessType,payload.RegistrationType,payload.BusinessRegNum,payload.BusinessTaxId,payload.BusinessDescription,payload.CACPhotoPath],(err,data)=>{
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