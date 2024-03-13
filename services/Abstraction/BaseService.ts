import CommentModel from "../../model/CommentModel"
import CreateForumModel from "../../model/CreateForumModel"
import PostModel from "../../model/PostModel"
import TransactionModel from "../../model/TransactionModel"
import bulkAccessCodeModel from "../../model/bulkAccessCodeModel"
import createAppointmentModel from "../../model/creatAppointmentModel"
import createServiceProviderModel from "../../model/createServiceProviderModel"
import singleAccessCodeModel from "../../model/singleAccessCodeModel"
import staticAccessCodeModel from "../../model/staticAccessCodeModel"

export default interface BaseService{
    CreateSingleCode(payload:singleAccessCodeModel):Promise<string>
    CreateStaticCode(payload:staticAccessCodeModel):Promise<string>
    CreateBulkCode(payload:bulkAccessCodeModel):Promise<string>
    GetAllAccessCode():Promise<any>
    GetAccessCodeByid(Id:number):Promise<any>
    CreateForum(payload:CreateForumModel): Promise<string>
     UpdateForum(Id:string,payload:CreateForumModel): Promise<string>
     DeleteForum(Id:string): Promise<string>
     ActivateForum(Id:string): Promise<string>
     DeactivateForum(Id:string): Promise<string>
     GetAllForum():Promise<any>
     GetForumByForumId(Id:string):Promise<any>
     CreatePost(payload:PostModel):Promise<string>
     GetAllPost():Promise<any>
     GetPostById(PostId:number):Promise<any>
     CreateComment(payload:CommentModel):Promise<string>
     UpdateComment(Id:number,payload:CommentModel):Promise<string>
     DeleteComment(Id:number):Promise<string>
     GetAllComments():Promise<any>
     GetCommentById(Id:number):Promise<any>
     CreateAppointment(payload:createAppointmentModel):Promise<string>
    UpdateAppointment(payload:createAppointmentModel):Promise<string>
    DeleteAppointment(Id:number):Promise<string>
    GetAllAppointment():Promise<any>
    GetAppointmentId(Id:number):Promise<string>
    GetAppointmentCommunityId(communityId:string):Promise<string>
    CreateTransaction(payload:TransactionModel):Promise<string>
    GetTransactionByTransactionId(transactionId:string):Promise<any>
    GetAllTransaction():Promise<any>
    DeleteTransaction(transactionId:string):Promise<string>
    CreateServiceProvider(payload:createServiceProviderModel):Promise<string>
        
}