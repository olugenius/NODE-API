import { container } from "../Container/appContainer";
import createCommunityModel from "../model/createCommunityModel";
import createSubAdminModel from "../model/createSubAdminModel";
import createCheckersModel from "../model/createcheckersModel";
import {inject, injectable} from 'inversify';
import communityRepository from "../repository/communityRepository";
import "reflect-metadata";

interface Community{
   GetCommunity():Promise<any>
   GetCommunityById(communityId:string):Promise<any>
   CreateCommunity(payload:createCommunityModel):Promise<string>
   CreateSubAdmin(payload:createSubAdminModel):Promise<string>
   CreateCheckers(payload:createCheckersModel):Promise<string>
   GetCheckersById(Id:number):Promise<any | null>
   GetAllCheckers(): Promise<any>
   GetAllSubAdmins():any
   GetSubAdminsById(Id:number):any

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

     async GetAllCheckers(): Promise<any>{
      return await  this.communityRepo.GetAllCheckers()

     }

     async GetAllSubAdmins(){
      return await this.communityRepo.GetAllSubAdmins()

     }

     async GetSubAdminsById(Id:number){
      return await this.communityRepo.GetSubAdminsById(Id)
      
     }
}