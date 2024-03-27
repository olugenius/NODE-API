import createCheckersModel from "../../model/createcheckersModel"

export default interface checkerRepo{
    createCheckers(payload:createCheckersModel):Promise<string>
    updateCheckers(checkerId:string,payload:createCheckersModel):Promise<string>
    GetAllCheckers():Promise<any>
    getCheckersById(Id:number):Promise<any | null>
    getCheckersByCheckerId(checkerId:string):Promise<any | null>
    getCheckersByCommunityId(communityId:string):Promise<any | null>
    getCheckersByPhoneOrEmail(channel:string):Promise<any | null>
    ActivateCheckers(Id:string):Promise<any | null>
    DeactivateCheckers(Id:string):Promise<any | null>
    DeleteCheckers(Id:string):Promise<any | null>
    createCheckersXls(payloads:createCheckersModel[]):Promise<string>
}