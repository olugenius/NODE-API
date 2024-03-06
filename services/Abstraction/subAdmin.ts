import createSubAdminModel from "../../model/createSubAdminModel"

export default interface subAdmin{
    CreateSubAdmin(payload:createSubAdminModel):Promise<string>
    GetAllSubAdmins():Promise<any>
    GetSubAdminsById(Id:number):Promise<any>
    GetSubAdminsByCommunityId(communityId:string):Promise<any>
}