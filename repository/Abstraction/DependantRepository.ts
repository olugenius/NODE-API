import CreateDependantmodel from "../../model/CreateDependantModel";
import UpdateDependantModel from "../../model/UpdateDependantModel";

export default interface DependantRepository{
    //CreateDependant(payload:CreateDependantmodel): Promise<string>
    CreateDependant(payload:CreateDependantmodel[]): Promise<string>
    GetDependantByPhoneOrEmail(channel:string):Promise<any>
    GetDependantProfile(Phone: string,CreatorPhone:string): Promise<any>
    UpdateDependantProfile(Id:number,payload:UpdateDependantModel): Promise<string>
    GetDependantProfileByPhoneOrEmail(channel: string,CreatorPhone:string): Promise<any>
    DeleteDependant(Phone:string,CreatorPhone:string):Promise<string>
}