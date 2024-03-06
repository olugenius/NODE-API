import { Pool } from "mysql2"
import conn from './dbContext/dbConnection'
import createAppointmentModel from "../model/creatAppointmentModel"
import memberModel from "../model/memberModel"
import memberRepository from "./Abstraction/memberRepository"
import { injectable } from "inversify"
import { GenerateUniqueId } from "../utilities/GenerateUniqueId"


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
                    
                    const memberId = `MEM- ${GenerateUniqueId()}`
                    const query = `INSERT INTO Member(MemberId,Name,Email,Phone,HouseNumber) VALUES(?,?,?,?,?)`
                   
                        connection?.query(query,[memberId,payload.Name,payload.Email,payload.Phone,payload.HouseNumber],(err,data)=>{
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

    async updateMember(payload:memberModel):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `UPDATE Member SET Name=?,Email=?,Phone=?,HouseNumber=? WHERE Id=?`
                   
                        connection?.query(query,[payload.Name,payload.Email,payload.Phone,payload.HouseNumber,payload.Id],(err,data)=>{
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

    async deleteMember(Id:number):Promise<string>{
   
        let response : string = ''
        try{

            const connection =  await this.getConnection()
            let result = await new Promise<string>((resolve,reject)=>{
             
                connection?.getConnection((err,connection)=>{
                    if(err){
                        console.log('connection error',err)
                        reject(err)
                    }
                    
                  
                    const query = `DELETE FROM  Member WHERE MemberId=?`
                   
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


}