import { inject } from "inversify";
import DependantRepository from "../repository/Abstraction/DependantRepository";
import settingsRepo from "../repository/Abstraction/settingsRepo";
import UpdateDependantModel from "../model/UpdateDependantModel";
import settings from "./Abstraction/settings";
import UserRepository from "../repository/Abstraction/UserRepository";
import createSubAdminModel from "../model/createSubAdminModel";

export default class settingsImpl implements settings{

    constructor(@inject('settingsRepo') private settingsRepo:settingsRepo,@inject('UserRepository') private userRepo:UserRepository){}

    // async GetCommunityAdminProfile(Phone:string):Promise<any>{
    //     return await this.settingsRepo.GetCommunityAdminProfile(Phone) 
    // }
    async GetMemberProfile(Phone:string):Promise<any>{
        return await this.settingsRepo.GetMemberProfile(Phone) 

    }
    // async GetAllDependantProfile(Phone: string,CreatorPhone:string): Promise<any>{
    //     return await this.settingsRepo.GetDependantProfile(Phone,CreatorPhone) 

    // }
    // async UpdateDependantProfile(Id:string,payload:UpdateDependantModel): Promise<string>{
    //     return await this.settingsRepo.UpdateDependantProfile(Id,payload) 

    // }
    // async GetDependantProfileByPhone(Phone: string,CreatorPhone:string): Promise<any>{
    //     return await this.settingsRepo.GetDependantProfileByPhone(Phone,CreatorPhone) 

    // }
    // async DeleteDependant(Phone:string,CreatorPhone:string):Promise<string>{
    //     return await this.settingsRepo.DeleteDependant(Phone,CreatorPhone) 

    // }


}