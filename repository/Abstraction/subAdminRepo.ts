import createSubAdminModel from "../../model/createSubAdminModel"

export default interface subAdminRepo{
    createSubAdmin(payload:createSubAdminModel):Promise<string>
    GetAllSubAdmins():Promise<any|null>
    GetSubAdminById(Id:number):any
    GetSubAdminsByCommunityId(communityId:string):any
}