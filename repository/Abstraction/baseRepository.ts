import bulkAccessCodeModel from "../../model/bulkAccessCodeModel"
import singleAccessCodeModel from "../../model/singleAccessCodeModel"
import staticAccessCodeModel from "../../model/staticAccessCodeModel"

export default interface BaseRepository{

     createSingleCode(payload:singleAccessCodeModel):Promise<string>
     createStaticCode(payload:staticAccessCodeModel):Promise<string>
     createBulkCode(payload:bulkAccessCodeModel):Promise<string>
     getAllAccessCode():Promise<any>
     getAccessCodeByid(Id:number):Promise<any>

}