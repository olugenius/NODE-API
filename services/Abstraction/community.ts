import OrganizationModel from "../../model/OrganizationModel"
import createCommunityModel from "../../model/createCommunityModel"
import createSubAdminModel from "../../model/createSubAdminModel"
import createCheckersModel from "../../model/createcheckersModel"

export default interface Community{
    GetCommunity():Promise<any>
    GetCommunityById(communityId:string):Promise<any>
    CreateCommunity(payload:createCommunityModel):Promise<string>
    // CreateSubAdmin(payload:createSubAdminModel):Promise<string>
    // CreateCheckers(payload:createCheckersModel):Promise<string>
    // GetCheckersById(Id:number):Promise<any | null>
    // GetCheckersByCommunityId(communityId:number):Promise<any | null>
    // GetAllCheckers(): Promise<any>
    // GetAllSubAdmins():Promise<any>
    // GetSubAdminsById(Id:number):Promise<any>
    // GetCheckersByCommunityId(communityId:number):Promise<any | null>
    // GetSubAdminsByCommunityId(communityId:string):Promise<any>
    DeleteCommunity(Id:string):Promise<any | null>
    DeactivateCommunity(Id:string):Promise<any | null>
    ActivateCommunity(Id:string):Promise<any | null>
    CreateOrganization(payload:OrganizationModel):Promise<string>
    UpdateOrganization(CreatorPhone:string,Channel:string,payload:OrganizationModel):Promise<string>
    GetCommunityAdminProfile(Phone:string):Promise<any>
    // getCheckersByPhoneOrEmail(channel:string):Promise<any | null>
    
    
 
 }