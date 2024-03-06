import { container } from "../Container/appContainer";
import createCommunityModel from "../model/createCommunityModel";
import createSubAdminModel from "../model/createSubAdminModel";
import createCheckersModel from "../model/createcheckersModel";
import {inject, injectable} from 'inversify';
import "reflect-metadata";
import memberModel from "../model/memberModel";
import createAppointmentModel from "../model/creatAppointmentModel";
import Community from "./Abstraction/community";
import communityRepository from "../repository/Abstraction/communityRepository";
import OrganizationModel from "../model/OrganizationModel";


//const communityRepo = container.get<communityRepository>(communityRepository)
@injectable()
export default class CommunityImpl implements Community{
   constructor(@inject('communityRepository') private communityRepo: communityRepository){}

   async GetCommunity():Promise<any>{

      return await this.communityRepo.GetCommunity()
   }

   async GetCommunityById(communityId:string):Promise<any>{

      return await this.communityRepo.GetCommunityById(communityId)
   }

    async CreateCommunity(payload:createCommunityModel):Promise<string>{

       return await this.communityRepo.createCommunity(payload)
    }

    async DeleteCommunity(Id:number):Promise<any | null>{
      return await this.communityRepo.DeleteCommunity(Id)
     }

     async DeactivateCommunity(Id:number):Promise<any | null>{
      return await this.communityRepo.DeactivateCommunity(Id)
     }

     async ActivateCommunity(Id:number):Promise<any | null>{
      return await this.communityRepo.ActivateCommunity(Id)
     }
     async GetCommunityAdminProfile(Phone:string):Promise<any>{
      return await this.communityRepo.GetCommunityAdminProfile(Phone) 
  }

   //  async CreateSubAdmin(payload:createSubAdminModel):Promise<string>{

   //      return await this.communityRepo.createSubAdmin(payload)
   //   }

   //   async CreateCheckers(payload:createCheckersModel):Promise<string>{

   //      return await this.communityRepo.createCheckers(payload)
   //   }
     
   //   async GetCheckersById(Id:number):Promise<any | null>{
   //    return await this.communityRepo.getCheckersById(Id)
   //   }

   //   async GetCheckersByCommunityId(communityId:number):Promise<any | null>{
   //    return await this.communityRepo.getCheckersById(communityId)
   //   }

   //   async GetAllCheckers(): Promise<any>{
   //    return await  this.communityRepo.GetAllCheckers()

   //   }

   //   async GetAllSubAdmins():Promise<any>{
   //    return await this.communityRepo.GetAllSubAdmins()

   //   }

   //   async GetSubAdminsById(Id:number){
   //    return await this.communityRepo.GetSubAdminsById(Id)
      
   //   }


   //   async GetSubAdminsByCommunityId(communityId:number):Promise<any>{
   //    return await this.communityRepo.GetSubAdminsById(communityId)
      
   //   }


    async CreateOrganization(payload:OrganizationModel):Promise<string>{
      return await this.communityRepo.CreateOrganization(payload) 
    }

   //  async getCheckersByPhoneOrEmail(channel:string):Promise<any | null>{
   //   return await this.communityRepo.getCheckersByPhoneOrEmail(channel)
   //  }

 

}