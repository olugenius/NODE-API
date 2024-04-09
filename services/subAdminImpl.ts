import { inject, injectable } from "inversify";
import subAdmin from "./Abstraction/subAdmin";
import subAdminRepo from "../repository/Abstraction/subAdminRepo";
import createSubAdminModel from "../model/createSubAdminModel";

@injectable()
export default class subAdminImpl implements subAdmin{

    constructor(@inject('subAdminRepo') private subAdminRepo:subAdminRepo){}

    async CreateSubAdmin(payload:createSubAdminModel):Promise<string>{

        return await this.subAdminRepo.createSubAdmin(payload)
     }
    async GetAllSubAdmins():Promise<any>{
        return await this.subAdminRepo.GetAllSubAdmins()
  
       }
  
       async GetSubAdminsById(Id:number):Promise<any>{
        return await this.subAdminRepo.GetSubAdminById(Id)
        
       }
  
  
       async GetSubAdminsByCommunityId(communityId:string):Promise<any>{
        return await this.subAdminRepo.GetSubAdminsByCommunityId(communityId)
        
       }

       async GetAllSubAdminsByCreatorUserId(creatorUserId:string):Promise<any>{
        return await this.subAdminRepo.GetAllSubAdminsByCreatorUserId(creatorUserId)
       }
  
}