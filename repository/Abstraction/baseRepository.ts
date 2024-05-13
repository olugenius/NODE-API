import AdminTeam from "../../model/AdminTeam"
import AdvertModel from "../../model/AdvertModel"
import BusinessCategoryModel from "../../model/BusinessCategoryModel"
import CommentModel from "../../model/CommentModel"
import CreateDigitalRegistar from "../../model/CreateDigitalRegistar"
import CreateForumModel from "../../model/CreateForumModel"
import CreateIReportModel from "../../model/CreateIReportModel"
import IReportCategory from "../../model/IReportCategory"
import PanicType from "../../model/PanicType"
import PostModel from "../../model/PostModel"
import SuperAdminRole from "../../model/SuperAdminRole"
import SupportCommentModel from "../../model/SupportCommentModel"
import SupportModel from "../../model/SupportModel"
import TargetAudience from "../../model/TargetAudience"
import TransactionModel from "../../model/TransactionModel"
import bulkAccessCodeModel from "../../model/bulkAccessCodeModel"
import createAppointmentModel from "../../model/creatAppointmentModel"
import createServiceProviderModel from "../../model/createServiceProviderModel"
import singleAccessCodeModel from "../../model/singleAccessCodeModel"
import staticAccessCodeModel from "../../model/staticAccessCodeModel"

export default interface BaseRepository{

     createSingleCode(payload:singleAccessCodeModel):Promise<string>
     createStaticCode(payload:staticAccessCodeModel):Promise<string>
     createBulkCode(payload:bulkAccessCodeModel):Promise<string>
     getAllAccessCode():Promise<any>
     getAllAccessCodeByCreatorUserId(creatorUserId:string): Promise<any> 
     getAccessCodeByAccessCode(accessCode: string): Promise<any> 
     getAccessCodeByid(Id:number):Promise<any>
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
     createAppointment(payload:createAppointmentModel):Promise<string>
    updateAppointment(AppointmentId:string,payload:createAppointmentModel):Promise<string>
    deleteAppointment(appointmentId: string):Promise<string>
    GetAllAppointment():Promise<any>
    GetAppointmentId(Id:number):Promise<any>
    GetAppointmentCommunityId(CommunityId:string):Promise<any>
    CreateTransaction(payload:TransactionModel):Promise<string>
    GetTransactionByTransactionId(transactionId:string):Promise<any>
    GetAllTransaction():Promise<any>
    DeleteTransaction(transactionId:string):Promise<string>
    CreateServiceProvider(payload:createServiceProviderModel):Promise<string>

    CreateBusinessCategory(payload:BusinessCategoryModel):Promise<string>
    UpdateBusinessCategory(Id:number,payload:BusinessCategoryModel):Promise<string>
    GetAllBusinessCategory():Promise<any>
    GetBusinessCategoryById(Id:number):Promise<any>
    DeleteBusinessCategory(Id:number):Promise<string>
    CreateSupport(payload:SupportModel):Promise<string>
    DeactivateSupport(TicketId:string):Promise<string>
    GetAllSupport():Promise<any>
    GetSupportByTicketId(ticketId:string):Promise<any>
    CreateSupportComment(payload:SupportCommentModel):Promise<string>
    UpdateSupportComment(Id:number,payload:SupportCommentModel):Promise<string>
    GetSupportCommentById(Id:number):Promise<any>
    GetAllSupportComment():Promise<any>
    CreateIReportCategory(payload: IReportCategory): Promise<string> 
    CreateIReport(PhotoPath:string[],payload:CreateIReportModel):Promise<string>
    GetAllIReportCategory(): Promise<any>
    GetAllIReportByCreatorByUserId(creatorUserId:string):Promise<any>
    GetAllIReport():Promise<any>
    GetIReportPhotos(reportId:string):Promise<any>

    CreateDigitalRegistar(payload:CreateDigitalRegistar):Promise<string>
    UpdateDigitalRegistar(registarId:string,payload:CreateDigitalRegistar):Promise<string>
    GetAllDigitalRegistar():Promise<any>
    GetDigitalRegistarByRegistarId(registarId:string):Promise<any>
    CreateSuperAdminRoles(payload: SuperAdminRole): Promise<string> 
    GetSuperAdminRoles(): Promise<any>
    CreateSuperAdminTeam(payload: AdminTeam): Promise<string> 
    GetSuperAdminByPhoneOrEmail(Email:string): Promise<any> 
    CreateTargetAudience(payload: TargetAudience): Promise<string> 
    CreateAdvert(payload: AdvertModel): Promise<string> 
    GetAdverts(): Promise<any>
    GetAdvertById(Id:number): Promise<any>
    CreatePanicType(payload: PanicType): Promise<string>
    GetPanicTypes(): Promise<any> 
    GetPanicTypeById(Id:number): Promise<any> 
    DeletePanicType(Id: number): Promise<string> 

}