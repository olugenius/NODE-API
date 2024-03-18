import OrganizationModel from "../../model/OrganizationModel"
import createCommunityModel from "../../model/createCommunityModel"
import createSubAdminModel from "../../model/createSubAdminModel"
import createCheckersModel from "../../model/createcheckersModel"

export default interface communityRepository{
    GetCommunity():Promise<any>
    GetCommunityById(communityId:string):Promise<any>
    createCommunity(payload:createCommunityModel):Promise<string>
    // createSubAdmin(payload:createSubAdminModel):Promise<string>
    // createCheckers(payload:createCheckersModel):Promise<string>
    // GetAllCheckers():Promise<any>
    // getCheckersById(Id:number):Promise<any | null>
    // getCheckersByCommunityId(communityId:string):Promise<any | null>
    // GetAllSubAdmins():Promise<any|null>
    // GetSubAdminsById(Id:number):any
    // GetSubAdminsByCommunityId(communityId:string):any
    ActivateCommunity(Id:string):Promise<any | null>
    DeactivateCommunity(Id:string):Promise<any | null>
    DeleteCommunity(Id:string):Promise<any | null>
    GetCommunityAdminProfile(Phone:string):Promise<any>
    CreateOrganization(payload:OrganizationModel):Promise<string>
    //getCheckersByPhoneOrEmail(channel:string):Promise<any | null>
    

}