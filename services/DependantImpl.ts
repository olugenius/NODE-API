import { inject, injectable } from "inversify";
import Dependant from "./Abstraction/Dependant";
import DependantRepository from "../repository/Abstraction/DependantRepository";
import CreateDependantmodel from "../model/CreateDependantModel";
import UpdateDependantModel from "../model/UpdateDependantModel";
@injectable()
export default class DependantImpl implements Dependant{
    constructor(@inject('DependantRepository') private dependantRepo: DependantRepository){}

    async CreateDependant(payload:CreateDependantmodel[]): Promise<string>{
        return await this.dependantRepo.CreateDependant(payload)
    }
   
  async GetDependantByPhoneOrEmail(channel:string):Promise<any>{
    return await this.dependantRepo.GetDependantByPhoneOrEmail(channel)
  }
    async GetAllDependantProfile(CreatorPhone:string): Promise<any> {
      return await this.dependantRepo.GetAllDependantProfile(CreatorPhone) 

  }
  async UpdateDependantProfile(payload:UpdateDependantModel): Promise<string>{
      return await this.dependantRepo.UpdateDependantProfile(payload) 

  }
  async GetDependantProfileByPhoneOrEmail(channel: string,CreatorPhone:string): Promise<any>{
      return await this.dependantRepo.GetDependantProfileByPhoneOrEmail(channel,CreatorPhone) 

  }
  async DeleteDependant(Phone:string,CreatorPhone:string):Promise<string>{
      return await this.dependantRepo.DeleteDependant(Phone,CreatorPhone) 

  }
}