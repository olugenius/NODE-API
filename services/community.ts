import { container } from "../Container/appContainer";
import createCommunityModel from "../model/createCommunityModel";
import createSubAdminModel from "../model/createSubAdminModel";
import createCheckersModel from "../model/createcheckersModel";
import {inject, injectable} from 'inversify';
import communityRepository from "../repository/communityRepository";
import "reflect-metadata";
import memberModel from "../model/memberModel";
import createAppointmentModel from "../model/creatAppointmentModel";

interface Community{
   GetCommunity():Promise<any>
   GetCommunityById(communityId:string):Promise<any>
   CreateCommunity(payload:createCommunityModel):Promise<string>
   CreateSubAdmin(payload:createSubAdminModel):Promise<string>
   CreateCheckers(payload:createCheckersModel):Promise<string>
   GetCheckersById(Id:number):Promise<any | null>
   GetCheckersByCommunityId(communityId:number):Promise<any | null>
   GetAllCheckers(): Promise<any>
   GetAllSubAdmins():Promise<any>
   GetSubAdminsById(Id:number):any
   GetCheckersByCommunityId(communityId:number):Promise<any | null>
   GetSubAdminsByCommunityId(communityId:number):Promise<any>
   CreateMember(payload:memberModel):Promise<string>
   GetMemberByMemberId(memberId:string):Promise<string>
   createAppointment(payload:createAppointmentModel):Promise<string>
   GetAllAppointment():Promise<any>
   GetAppointmentId(Id:number):Promise<string>
   GetAppointmentCommunityId(communityId:string):Promise<string>
   GetAllMembers():Promise<string>
   

}
//const communityRepo = container.get<communityRepository>(communityRepository)
@injectable()
export default class CommunityImpl implements Community{
   constructor(@inject(communityRepository) private communityRepo: communityRepository){}

   async GetCommunity():Promise<any>{

      return await this.communityRepo.GetCommunity()
   }

   async GetCommunityById(communityId:string):Promise<any>{

      return await this.communityRepo.GetCommunityById(communityId)
   }

    async CreateCommunity(payload:createCommunityModel):Promise<string>{

       return await this.communityRepo.createCommunity(payload)
    }

    async CreateSubAdmin(payload:createSubAdminModel):Promise<string>{

        return await this.communityRepo.createSubAdmin(payload)
     }

     async CreateCheckers(payload:createCheckersModel):Promise<string>{

        return await this.communityRepo.createCheckers(payload)
     }
     
     async GetCheckersById(Id:number):Promise<any | null>{
      return await this.communityRepo.getCheckersById(Id)
     }

     async GetCheckersByCommunityId(communityId:number):Promise<any | null>{
      return await this.communityRepo.getCheckersById(communityId)
     }

     async GetAllCheckers(): Promise<any>{
      return await  this.communityRepo.GetAllCheckers()

     }

     async GetAllSubAdmins():Promise<any>{
      return await this.communityRepo.GetAllSubAdmins()

     }

     async GetSubAdminsById(Id:number){
      return await this.communityRepo.GetSubAdminsById(Id)
      
     }


     async GetSubAdminsByCommunityId(communityId:number):Promise<any>{
      return await this.communityRepo.GetSubAdminsById(communityId)
      
     }

     async CreateMember(payload:memberModel):Promise<string>{

      return await this.communityRepo.createMember(payload)
   }

   async GetMemberByMemberId(memberId:string):Promise<string>{

      return await this.communityRepo.GetMemberByMemberId(memberId)
   }

   async createAppointment(payload:createAppointmentModel):Promise<string>{

      return await this.communityRepo.createAppointment(payload)
   }

   async GetAllAppointment():Promise<any>{

      return await this.communityRepo.GetAllAppointment()
   }

   async GetAppointmentId(Id:number):Promise<string>{

      return await this.communityRepo.GetAppointmentId(Id)
   }

   async GetAppointmentCommunityId(communityId:string):Promise<string>{

      return await this.communityRepo.GetAppointmentCommunityId(communityId)
   }

   async GetAllMembers():Promise<string>{

      return await this.communityRepo.GetAllMembers()
   }


}