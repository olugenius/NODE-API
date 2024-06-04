import { id, inject, injectable } from "inversify";
import bulkAccessCodeModel from "../model/bulkAccessCodeModel";
import singleAccessCodeModel from "../model/singleAccessCodeModel";
import staticAccessCodeModel from "../model/staticAccessCodeModel";
import BaseRepository from "../repository/Abstraction/baseRepository";
import BaseService from "./Abstraction/BaseService";
import CreateForumModel from "../model/CreateForumModel";
import PostModel from "../model/PostModel";
import CommentModel from "../model/CommentModel";
import createAppointmentModel from "../model/CreateAppointmentModel";
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
import TargetAudience from "../model/TargetAudience";
import AdvertModel from "../model/AdvertModel";
import PanicType from "../model/PanicType";
import CreateAppointmentModel from "../model/CreateAppointmentModel";
import CreateTransactionModel from "../model/CreateTransactionModel";
import CreateSubscriptionModel from "../model/CreateSubscriptionModel";

@injectable()
export default class BaseServiceimpl implements BaseService{
    constructor(@inject('BaseRepository') private baseRepo:BaseRepository){}
 
    async CreateAppointment(payload: CreateAppointmentModel): Promise<string>{
      return await this.baseRepo.CreateAppointment(payload)
    }

    async DeleteAppointment(consultationId: string): Promise<string>{
      return await this.baseRepo.DeleteAppointment(consultationId)
    }
  
    async GetAllAppointments(): Promise<any>{
      return await this.baseRepo.GetAllAppointments()
    }
  
    async GetAllAppointmentsByUserId(userId: string): Promise<any>{
      return await this.baseRepo.GetAllAppointmentsByUserId(userId)
    }

    async GetAllAppointmentsByConsultationId(consultationId: string): Promise<any> {
      return await this.baseRepo.GetAllAppointmentsByConsultationId(consultationId)
    }


    async CreateTransaction(payload: CreateTransactionModel): Promise<string>{
      return await this.baseRepo.CreateTransaction(payload)
    }
  
    async GetTransactionByTransactionId(transactionId: string): Promise<any>{
      return await this.baseRepo.GetTransactionByTransactionId(transactionId)
    }
  
    async GetAllTransactionsByUserId(userId: string): Promise<any>{
      return await this.baseRepo.GetAllTransactionsByUserId(userId)
    }
  
    async GetAllTransaction(): Promise<any>{
      return await this.baseRepo.GetAllTransaction()
    }
  
    async DeleteTransaction(transactionId: string): Promise<string>{
      return await this.baseRepo.DeleteTransaction(transactionId)
    }
  
    async CreateSubscription(payload: CreateSubscriptionModel): Promise<string>{
      return await this.baseRepo.CreateSubscription(payload)
    }
  
    async DeleteSubscription(Id: number): Promise<string>{
      return await this.baseRepo.DeleteSubscription(Id)
    }
  
    async GetAllSubscriptionsByUserId(userId: string): Promise<any>{
      return await this.baseRepo.GetAllSubscriptionsByUserId(userId)
    }
  
    async GetAllSubscription(): Promise<any>{
      return await this.baseRepo.GetAllSubscription()
    }
  
    async GetAllSubscriptionsById(Id: number): Promise<any>{
      return await this.baseRepo.GetAllSubscriptionsById(Id)
    }

}