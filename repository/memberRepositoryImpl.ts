import { Pool } from "mysql2"
import conn from './dbContext/dbConnection'
import createAppointmentModel from "../model/creatAppointmentModel"
import memberRepository from "./Abstraction/memberRepository"
import { injectable } from "inversify"
import { GenerateUniqueId } from "../utilities/GenerateUniqueId"
import memberModel from "../model/memberModel"
import GetNewDate from "../utilities/GetNewDate"


@injectable()
export default class memberRepositoryImpl implements memberRepository{

    private  async getConnection(): Promise<Pool | undefined>{
        try{
            return  await conn.getConnect()
        }
        catch(error){
         console.log('error getting  connection to MySql Server',error)
        }
        
    }
    // async createAppointment(payload:createAppointmentModel):Promise<string>{
   
    //     let response : string = ''
    //     try{

    //         const connection =  await this.getConnection()
    //         let result = await new Promise<string>((resolve,reject)=>{
             
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                     console.log('connection error',err)
    //                     reject(err)
    //                 }
                    
                  
    //                 const query = `INSERT INTO Appointment(Title,Date,Time,Venue,Description,PhotoPath,CommunityId) VALUES(?,?,?,?,?,?,?)`
                   
    //                     connection?.query(query,[payload.Title,payload.Date,payload.Time,payload.Venue,payload.Description,payload.PhotoPath,payload.CommunityId],(err,data)=>{
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

    // async updateAppointment(payload:createAppointmentModel):Promise<string>{
   
    //     let response : string = ''
    //     try{

    //         const connection =  await this.getConnection()
    //         let result = await new Promise<string>((resolve,reject)=>{
             
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                     console.log('connection error',err)
    //                     reject(err)
    //                 }
                    
                  
    //                 const query = `UPDATE Appointment SET Title=?,Date=?,Time=?,Venue=?,Description=?,PhotoPath=?,CommunityId=? WHERE Id= ?`
                   
    //                     connection?.query(query,[payload.Title,payload.Date,payload.Time,payload.Venue,payload.Description,payload.PhotoPath,payload.CommunityId,payload.Id],(err,data)=>{
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

    // async deleteAppointment(Id:number):Promise<string>{
   
    //     let response : string = ''
    //     try{

    //         const connection =  await this.getConnection()
    //         let result = await new Promise<string>((resolve,reject)=>{
             
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                     console.log('connection error',err)
    //                     reject(err)
    //                 }
                    
                  
    //                 const query = `DELETE FROM  Appointment WHERE Id= ?`
                   
    //                     connection?.query(query,[Id],(err,data)=>{
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

    // async GetAllAppointment():Promise<any>{
    //     let result : any
    //     try{
    //         const connection =  await this.getConnection()  
    //         let result =await new Promise<any>((resolve,reject)=>{
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                 console.log('connection error',err)
    //                 reject(err)
    //                 }

    //                 connection?.query(`SELECT * FROM Appointment`,(err,data)=>{
    //                     connection.release()
    //                     if(err){
    //                        console.log('error querying database',err)           
    //                     }
    //                     else{
    //                        console.log('successfully query',data)
                           
    //                     }
    //                     resolve(data)
    //                    })
        

                   
                    
    //                 })
    //         })
    
    //          return result

    //     }catch(error){
         
    //     }

    // }

    // async GetAppointmentId(Id:number):Promise<any>{
    //     let result : any
    //     try{
    //         const connection =  await this.getConnection()  
    //         let result =await new Promise<any>((resolve,reject)=>{
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                 console.log('connection error',err)
    //                 reject(err)
    //                 }

    //                 connection?.query(`SELECT * FROM Appointment where Id=?`,[Id],(err,data)=>{
    //                     connection.release()
    //                     if(err){
    //                        console.log('error querying database',err)           
    //                     }
    //                     else{
    //                        console.log('successfully query',data)
                           
    //                     }
    //                     resolve(data)
    //                    })
        

                   
                    
    //                 })
    //         })
    
    //          return result

    //     }catch(error){
         
    //     }

    // }

    // async GetAppointmentCommunityId(CommunityId:string):Promise<any>{
    //     let result : any
    //     try{
    //         const connection =  await this.getConnection()  
    //         let result =await new Promise<any>((resolve,reject)=>{
    //             connection?.getConnection((err,connection)=>{
    //                 if(err){
    //                 console.log('connection error',err)
    //                 reject(err)
    //                 }

    //                 connection?.query(`SELECT * FROM Appointment where CommunityId=?`,[CommunityId],(err,data)=>{
    //                     connection.release()
    //                     if(err){
    //                        console.log('error querying database',err)           
    //                     }
    //                     else{
    //                        console.log('successfully query',data)
                           
    //                     }
    //                     resolve(data)
    //                    })
        

                   
                    
    //                 })
    //         })
    
    //          return result

    //     }catch(error){
         
    //     }

    // }

    async createMember(payload:memberModel):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                    const memberId = `MEM-${GenerateUniqueId()}`
                    const query = `INSERT INTO Member(MemberId,FirstName,LastName,DOB,Gender,NIN,Email,Phone,IsActive,CreatorUserId) VALUES(?,?,?,?,?,?,?,?,?,?)`
                   
                        connection?.query(query,[memberId,payload.FirstName,payload.LastName,payload.DOB,payload.Gender,payload.NIN,payload.Email,payload.Phone,1,payload.CreatorUserId],(err,data)=>{
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

    async updateMember(memberId:string,payload:memberModel):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `UPDATE Member SET FirstName=?,LastName=?,NIN=?,DOB=?,Gender=?,CommunityId=?,Email=?,Phone=? WHERE MemberId=?`
                   
                        connection?.query(query,[payload.FirstName,payload.LastName,payload.NIN,payload.DOB,payload.Gender,payload.CommunityId,payload.Email,payload.Phone,memberId],(err,data)=>{
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

    async deleteMember(memberId:string):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `UPDATE Member SET IsActive =? WHERE MemberId=?`
                   
                        connection?.query(query,[3,memberId],(err,data)=>{
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

    async GetMemberByMemberId(memberId:string):Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM Member where MemberId=?`,[memberId],(err,data)=>{
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

    async GetMemberByCreatorUserId(creatorUserId:string):Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM Member where CreatorUserId=?`,[creatorUserId],(err,data)=>{
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


    async GetMemberByPhoneOrEmail(channel:string):Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query(`SELECT * FROM Member WHERE (Email = ? or Phone =?)`,[channel,channel],(err,data)=>{
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

    async GetAllMembers():Promise<any>{
        let result : any
        try{
            const connection =  await this.getConnection()  
            let result =await new Promise<any>((resolve,reject)=>{
                connection?.getConnection((err,connection)=>{
                    if(err){
                    console.log('connection error',err)
                    reject(err)
                    }

                    connection?.query('SELECT * FROM Member',(err,data)=>{
                        connection.release()
                        if(err){
                           console.log('error querying database',err)           
                        }
                        else{
                           console.log('successfully query member',data)
                           
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

    async createMembersXls(payloads:memberModel[]):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
             let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
               
               
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
                        1,
                        `MEM-${GenerateUniqueId()}`,
                        GetNewDate(),
                        payload.CreatorUserId

                    ])
                
    
                    const query = `INSERT INTO Member(FirstName,LastName,Phone,Email,DOB,Gender,NIN,CommunityId,IsActive,MemberId,CreatedAt,CreatorUserId) VALUES ${placeholders}`;
    
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


}