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

     async UpdateCheckers(checkerId:string,payload:createCheckersModel):Promise<string>{

      return await this.checkerRepo.updateCheckers(checkerId,payload)
   }
     
     async GetCheckersById(Id:number):Promise<any | null>{
      return await this.checkerRepo.getCheckersById(Id)
     }

     async GetCheckersByCheckerId(checkerId:string):Promise<any | null>{
      return await this.checkerRepo.getCheckersByCheckerId(checkerId)
     }

     async GetCheckersByCommunityId(communityId:number):Promise<any | null>{
      return await this.checkerRepo.getCheckersById(communityId)
     }

     async GetAllCheckers(): Promise<any>{
      return await  this.checkerRepo.GetAllCheckers()

     }

     async ActivateCheckers(Id:string):Promise<any | null>{
        return await this.checkerRepo.ActivateCheckers(Id)
     }
     async DeactivateCheckers(Id:string):Promise<any | null>{
        return await this.checkerRepo.DeactivateCheckers(Id)
     }
     async DeleteCheckers(Id:string):Promise<any | null>{
        return await this.checkerRepo.DeleteCheckers(Id)
     }
     async createCheckersXls(payloads:createCheckersModel[]):Promise<string>{
      return await this.checkerRepo.createCheckersXls(payloads);
     }

}