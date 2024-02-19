import { inject, injectable } from "inversify";
import bulkAccessCodeModel from "../model/bulkAccessCodeModel";
import singleAccessCodeModel from "../model/singleAccessCodeModel";
import staticAccessCodeModel from "../model/staticAccessCodeModel";
import BaseRepository from "../repository/Abstraction/baseRepository";
import BaseService from "./Abstraction/BaseService";

@injectable()
export default class BaseServiceimpl implements BaseService{
    constructor(@inject('BaseRepository') private baseRepo:BaseRepository){}
    async CreateSingleCode(payload:singleAccessCodeModel): Promise<string>{
       return await this.baseRepo.createSingleCode(payload)
    }
  


    async CreateStaticCode(payload:staticAccessCodeModel): Promise<string>{
        return await this.baseRepo.createStaticCode(payload)
    }

    async CreateBulkCode(payload:bulkAccessCodeModel): Promise<string>{
        return await this.baseRepo.createBulkCode(payload)
    }



    async GetAllAccessCode(): Promise<any>{
        return await this.baseRepo.getAllAccessCode()
    }

    async GetAccessCodeByid(Id:number): Promise<any>{
        return await this.baseRepo.getAccessCodeByid(Id)
    }
}