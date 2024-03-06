import createCheckersModel from "../../model/createcheckersModel"

export default interface checkerRepo{
    createCheckers(payload:createCheckersModel):Promise<string>
    GetAllCheckers():Promise<any>
    getCheckersById(Id:number):Promise<any | null>
    getCheckersByCommunityId(communityId:string):Promise<any | null>
    getCheckersByPhoneOrEmail(channel:string):Promise<any | null>
}