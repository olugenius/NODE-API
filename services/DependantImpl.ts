import { inject, injectable } from "inversify";
import Dependant from "./Abstraction/Dependant";
import DependantRepository from "../repository/Abstraction/DependantRepository";
import CreateDependantmodel from "../model/CreateDependantModel";
@injectable()
export default class DependantImpl implements Dependant{
    constructor(@inject('DependantRepository') private dependantRepo: DependantRepository){}

    async CreateDependant(payload:CreateDependantmodel): Promise<string>{
        return await this.dependantRepo.CreateDependant(payload)
    }
    async GetDependantByPhoneOrEmail(channel:string):Promise<any>{
      return await this.dependantRepo.GetDependantByPhoneOrEmail(channel)
    }
}