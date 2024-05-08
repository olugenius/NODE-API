import { inject, injectable } from "inversify";
import bulkAccessCodeModel from "../model/bulkAccessCodeModel";
import singleAccessCodeModel from "../model/singleAccessCodeModel";
import staticAccessCodeModel from "../model/staticAccessCodeModel";
import BaseRepository from "../repository/Abstraction/baseRepository";
import BaseService from "./Abstraction/BaseService";
import CreateForumModel from "../model/CreateForumModel";
import PostModel from "../model/PostModel";
import CommentModel from "../model/CommentModel";
import createAppointmentModel from "../model/creatAppointmentModel";
import TransactionModel from "../model/TransactionModel";
import createServiceProviderModel from "../model/createServiceProviderModel";
import BusinessCategoryModel from "../model/BusinessCategoryModel";
import SupportModel from "../model/SupportModel";
import SupportCommentModel from "../model/SupportCommentModel";
import CreateIReportModel from "../model/CreateIReportModel";
import CreateDigitalRegistar from "../model/CreateDigitalRegistar";
import IReportCategory from "../model/IReportCategory";
import SuperAdminRole from "../model/SuperAdminRole";
import AdminTeam from "../model/AdminTeam";

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

    async getAllAccessCodeByCreatorUserId(creatorUserId:string): Promise<any> {
      return await this.baseRepo.getAllAccessCodeByCreatorUserId(creatorUserId)
    }
    async getAccessCodeByAccessCode(accessCode: string): Promise<any> {
      return await this.baseRepo.getAccessCodeByAccessCode(accessCode)
    }

    async GetAccessCodeByid(Id:number): Promise<any>{
        return await this.baseRepo.getAccessCodeByid(Id)
    }

    async CreateForum(payload:CreateForumModel): Promise<string>{
        return await this.baseRepo.CreateForum(payload);
    }
     async UpdateForum(Id:string,payload:CreateForumModel): Promise<string>{
        return await this.baseRepo.UpdateForum(Id,payload);
     }
     async DeleteForum(Id:string): Promise<string>{
        return await this.baseRepo.DeleteForum(Id);
     }
     async ActivateForum(Id:string): Promise<string>{
        return await this.baseRepo.ActivateForum(Id);
     }
     async DeactivateForum(Id:string): Promise<string>{
        return await this.baseRepo.DeactivateForum(Id);
     }
     async GetAllForum():Promise<any>{
        return await this.baseRepo.GetAllForum();
     }
     async GetForumByForumId(Id:string):Promise<any>{
        return await this.baseRepo.GetForumByForumId(Id);
     }
     async CreatePost(payload:PostModel):Promise<string>{
        return await this.baseRepo.CreatePost(payload);
     }
     async GetAllPost():Promise<any>{
        return await this.baseRepo.GetAllPost();
     }
     async GetPostById(PostId:number):Promise<any>{
        return await this.baseRepo.GetPostById(PostId);
     }
     async CreateComment(payload:CommentModel):Promise<string>{
        return await this.baseRepo.CreateComment(payload);
     }
     async UpdateComment(Id:number,payload:CommentModel):Promise<string>{
        return await this.baseRepo.UpdateComment(Id,payload);
     }
     async DeleteComment(Id:number):Promise<string>{
        return await this.baseRepo.DeleteComment(Id);
     }
     async GetAllComments():Promise<any>{
        return await this.baseRepo.GetAllComments();
     }
     async GetCommentById(Id:number):Promise<any>{
        return await this.baseRepo.GetCommentById(Id);
     }

     async CreateAppointment(payload:createAppointmentModel):Promise<string>{  
      return await this.baseRepo.createAppointment(payload)
   }

   async UpdateAppointment(AppointmentId:string,payload:createAppointmentModel):Promise<string>{  
    return await this.baseRepo.updateAppointment(AppointmentId,payload)
 }
 async DeleteAppointment(appointmentId:string):Promise<string>{  
    return await this.baseRepo.deleteAppointment(appointmentId)
 }

   async GetAllAppointment():Promise<any>{

      return await this.baseRepo.GetAllAppointment()
   }

   async GetAppointmentId(Id:number):Promise<string>{

      return await this.baseRepo.GetAppointmentId(Id)
   }

   async GetAppointmentCommunityId(communityId:string):Promise<string>{

      return await this.baseRepo.GetAppointmentCommunityId(communityId)
   }

   async CreateTransaction(payload:TransactionModel):Promise<string>{
      return await this.baseRepo.CreateTransaction(payload)
   }
   async GetTransactionByTransactionId(transactionId:string):Promise<any>{
      return await this.baseRepo.GetTransactionByTransactionId(transactionId)
   }
   async GetAllTransaction():Promise<any>{
      return await this.baseRepo.GetAllTransaction()
   }
   async DeleteTransaction(transactionId:string):Promise<string>{
      return await this.baseRepo.DeleteTransaction(transactionId)
   }

   async CreateServiceProvider(payload:createServiceProviderModel):Promise<string>{
      return await this.baseRepo.CreateServiceProvider(payload)
   }

   async CreateBusinessCategory(payload:BusinessCategoryModel):Promise<string>{
      return await this.baseRepo.CreateBusinessCategory(payload)
   }
   async UpdateBusinessCategory(Id:number,payload:BusinessCategoryModel):Promise<string>{
      return await this.baseRepo.UpdateBusinessCategory(Id,payload)
   }
   async GetAllBusinessCategory():Promise<any>{
      return await this.baseRepo.GetAllBusinessCategory()
   }
   async GetBusinessCategoryById(Id:number):Promise<any>{
      return await this.baseRepo.GetBusinessCategoryById(Id)
   }
   async DeleteBusinessCategory(Id:number):Promise<string>{
      return await this.baseRepo.DeleteBusinessCategory(Id)
   }

   async CreateSupport(payload:SupportModel):Promise<string>{
      return await this.baseRepo.CreateSupport(payload)
   }
   async DeactivateSupport(TicketId:string):Promise<string>{
      return await this.baseRepo.DeactivateSupport(TicketId)
   }

   async GetAllSupport():Promise<any>{
      return await this.baseRepo.GetAllSupport()
   }
     
   async GetSupportByTicketId(ticketId:string):Promise<any>{
      return await this.baseRepo.GetSupportByTicketId(ticketId)
   }
   async CreateSupportComment(payload:SupportCommentModel):Promise<string>{
      return await this.baseRepo.CreateSupportComment(payload)
   }
   async UpdateSupportComment(Id:number,payload:SupportCommentModel):Promise<string>{
      return await this.baseRepo.UpdateSupportComment(Id,payload)
   }
   async GetSupportCommentById(Id:number):Promise<any>{
      return await this.baseRepo.GetSupportCommentById(Id)
   }
   async GetAllSupportComment():Promise<any>{
      return await this.baseRepo.GetAllSupportComment()
   }
async CreateIReportCategory(payload: IReportCategory): Promise<string> {
   return await this.baseRepo.CreateIReportCategory(payload)
}
   async CreateIReport(PhotoPath:string[],payload:CreateIReportModel):Promise<string>{
      return await this.baseRepo.CreateIReport(PhotoPath,payload)
   }
   async GetAllIReportCategory(): Promise<any>{
   return await this.baseRepo.GetAllIReportCategory()
   }
   async GetAllIReportByCreatorByUserId(creatorUserId:string):Promise<any>{
      return await this.baseRepo.GetAllIReportByCreatorByUserId(creatorUserId)
   }

   async GetAllIReport():Promise<any>{
      return await this.baseRepo.GetAllIReport()
   }
   async GetIReportPhotos(reportId:string):Promise<any>{
      return await this.baseRepo.GetIReportPhotos(reportId)
   }

   async CreateDigitalRegistar(payload:CreateDigitalRegistar):Promise<string>{
      return await this.baseRepo.CreateDigitalRegistar(payload)
   }
   async UpdateDigitalRegistar(registarId:string,payload:CreateDigitalRegistar):Promise<string>{
      return await this.baseRepo.UpdateDigitalRegistar(registarId,payload)
   }

   async GetAllDigitalRegistar():Promise<any>{
      return await this.baseRepo.GetAllDigitalRegistar()
   }
   async GetDigitalRegistarByRegistarId(registarId:string):Promise<any>{
      return await this.baseRepo.GetDigitalRegistarByRegistarId(registarId)
   }

   async CreateSuperAdminRoles(payload: SuperAdminRole): Promise<string> {
      return await this.baseRepo.CreateSuperAdminRoles(payload)
   }
   async GetSuperAdminRoles(): Promise<any>{
      return await this.baseRepo.GetSuperAdminRoles()
   }

   async CreateSuperAdminTeam(payload: AdminTeam): Promise<string> {
      return await this.baseRepo.CreateSuperAdminTeam(payload)
   }

   async GetSuperAdminByPhoneOrEmail(Email:string): Promise<any> {
      return await this.baseRepo.GetSuperAdminByPhoneOrEmail(Email)
   }
}