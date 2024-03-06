import { inject, injectable } from "inversify";
import checkerRepo from "../repository/Abstraction/checkerRepo";
import checker from "./Abstraction/checker";
import createCheckersModel from "../model/createcheckersModel";

@injectable()
export default class checkerImpl implements checker{
    constructor(@inject('checkerRepo') private checkerRepo:checkerRepo){}
    async getCheckersByPhoneOrEmail(channel:string):Promise<any | null>{
        return await this.checkerRepo.getCheckersByPhoneOrEmail(channel)
       }
       async CreateCheckers(payload:createCheckersModel):Promise<string>{

        return await this.checkerRepo.createCheckers(payload)
     }
     
     async GetCheckersById(Id:number):Promise<any | null>{
      return await this.checkerRepo.getCheckersById(Id)
     }

     async GetCheckersByCommunityId(communityId:number):Promise<any | null>{
      return await this.checkerRepo.getCheckersById(communityId)
     }

     async GetAllCheckers(): Promise<any>{
      return await  this.checkerRepo.GetAllCheckers()

     }

}