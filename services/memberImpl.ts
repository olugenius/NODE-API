import { inject, injectable } from "inversify"
import createAppointmentModel from "../model/creatAppointmentModel"
import memberModel from "../model/memberModel"
import memberRepository from "../repository/memberRepositoryImpl"
import Member from '../services/Abstraction/member'



@injectable()
export default class MemberImpl implements Member{

    constructor(@inject('memberRepository') private memberRepo: memberRepository){}

   async UpdateMember(memberId:string,payload:memberModel):Promise<string> {
       return await this.memberRepo.updateMember(memberId,payload)
   }

   async DeleteMember(memberId:string): Promise<string> {
      return await this.memberRepo.deleteMember(memberId)
  }

    async CreateMember(payload:memberModel):Promise<string>{
        return await this.memberRepo.createMember(payload)
     }
  
     async GetMemberByMemberId(memberId:string):Promise<string>{  
        return await this.memberRepo.GetMemberByMemberId(memberId)
     }

     async createMembersXls(payloads:memberModel[]):Promise<string>{
      return await this.memberRepo.createMembersXls(payloads);
     }
  
   //   async CreateAppointment(payload:createAppointmentModel):Promise<string>{  
   //      return await this.memberRepo.createAppointment(payload)
   //   }

   //   async UpdateAppointment(payload:createAppointmentModel):Promise<string>{  
   //    return await this.memberRepo.updateAppointment(payload)
   // }
   // async DeleteAppointment(Id:number):Promise<string>{  
   //    return await this.memberRepo.deleteAppointment(Id)
   // }
  
   //   async GetAllAppointment():Promise<any>{
  
   //      return await this.memberRepo.GetAllAppointment()
   //   }
  
   //   async GetAppointmentId(Id:number):Promise<string>{
  
   //      return await this.memberRepo.GetAppointmentId(Id)
   //   }
  
   //   async GetAppointmentCommunityId(communityId:string):Promise<string>{
  
   //      return await this.memberRepo.GetAppointmentCommunityId(communityId)
   //   }
  
     async GetAllMembers():Promise<any>{
  
        return await this.memberRepo.GetAllMembers()
     }

     async GetMemberByPhoneOrEmail(channel:string):Promise<any>{
       return await this.memberRepo.GetMemberByPhoneOrEmail(channel)
     }
  
}