import CreateDependantmodel from "../../model/CreateDependantModel";

export default interface DependantRepository{
    CreateDependant(payload:CreateDependantmodel): Promise<string>
    GetDependantByPhoneOrEmail(channel:string):Promise<any>
}