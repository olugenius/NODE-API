import createCommunityModel from "../../model/createCommunityModel"
import createSubAdminModel from "../../model/createSubAdminModel"
import createCheckersModel from "../../model/createcheckersModel"

export default interface communityRepository{
    GetCommunity():Promise<any>
    GetCommunityById(communityId:string):Promise<any>
    createCommunity(payload:createCommunityModel):Promise<string>
    createSubAdmin(payload:createSubAdminModel):Promise<string>
    createCheckers(payload:createCheckersModel):Promise<string>
    GetAllCheckers():Promise<any>
    getCheckersById(Id:number):Promise<any | null>
    getCheckersByCommunityId(communityId:string):Promise<any | null>
    GetAllSubAdmins():Promise<any|null>
    GetSubAdminsById(Id:number):any
    GetSubAdminsByCommunityId(communityId:string):any
    ActivateCommunity(Id:number):Promise<any | null>
    DeactivateCommunity(Id:number):Promise<any | null>
    DeleteCommunity(Id:number):Promise<any | null>
    

}