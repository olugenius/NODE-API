import UpdateDependantModel from "../../model/UpdateDependantModel"

export default interface Dependant{
    //GetDependantByPhoneOrEmail(channel:string):Promise<any>
    GetDependantByPhoneOrEmail(channel:string):Promise<any>
    GetAllDependantProfile(Phone: string,CreatorPhone:string): Promise<any>
    UpdateDependantProfile(Id:number,payload:UpdateDependantModel): Promise<string>
    GetDependantProfileByPhoneOrEmail(channel: string,CreatorPhone:string): Promise<any>
    DeleteDependant(Phone:string,CreatorPhone:string):Promise<string>
}