import createCheckersModel from "../../model/createcheckersModel"

export default interface checker{
    CreateCheckers(payload:createCheckersModel):Promise<string>
    GetCheckersById(Id:number):Promise<any | null>
    GetCheckersByCommunityId(communityId:number):Promise<any | null>
    GetAllCheckers(): Promise<any>
    GetCheckersByCommunityId(communityId:number):Promise<any | null>
    getCheckersByPhoneOrEmail(channel:string):Promise<any | null>
}