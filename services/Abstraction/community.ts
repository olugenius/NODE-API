import createCommunityModel from "../../model/createCommunityModel"
import createSubAdminModel from "../../model/createSubAdminModel"
import createCheckersModel from "../../model/createcheckersModel"

export default interface Community{
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
    
    
 
 }