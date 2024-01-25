import createCommunityModel from "../model/createCommunityModel";
import createSubAdminModel from "../model/createSubAdminModel";
import createCheckersModel from "../model/createcheckersModel";
import communityRepository from '../repository/communityRepository'

export default class Community{

   async GetCommunity():Promise<any>{

      return await new communityRepository().GetCommunity()
   }

   async GetCommunityById(communityId:string):Promise<any>{

      return await new communityRepository().GetCommunityById(communityId)
   }

    async CreateCommunity(payload:createCommunityModel):Promise<string>{

       return await new communityRepository().createCommunity(payload)
    }

    async CreateSubAdmin(payload:createSubAdminModel):Promise<string>{

        return await new communityRepository().createSubAdmin(payload)
     }

     async CreateCheckers(payload:createCheckersModel):Promise<string>{

        return await new communityRepository().createCheckers(payload)
     }
     
     async GetCheckersById(Id:number):Promise<any | null>{
      return await new communityRepository().getCheckersById(Id)
     }

     async GetAllCheckers(): Promise<any>{
      return await new communityRepository().GetAllCheckers()

     }

     async GetAllSubAdmins(){
      return await new communityRepository().GetAllSubAdmins()

     }

     async GetSubAdminsById(Id:number){
      return await new communityRepository().GetSubAdminsById(Id)
      
     }
}