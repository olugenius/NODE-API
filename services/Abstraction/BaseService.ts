import bulkAccessCodeModel from "../../model/bulkAccessCodeModel"
import singleAccessCodeModel from "../../model/singleAccessCodeModel"
import staticAccessCodeModel from "../../model/staticAccessCodeModel"

export default interface BaseService{
    CreateSingleCode(payload:singleAccessCodeModel):Promise<string>
    CreateStaticCode(payload:staticAccessCodeModel):Promise<string>
    CreateBulkCode(payload:bulkAccessCodeModel):Promise<string>
    GetAllAccessCode():Promise<any>
    GetAccessCodeByid(Id:number):Promise<any>
       
}