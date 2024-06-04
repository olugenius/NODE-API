import AdminTeam from "../../model/AdminTeam";
import AdvertModel from "../../model/AdvertModel";
import BusinessCategoryModel from "../../model/BusinessCategoryModel";
import CommentModel from "../../model/CommentModel";
import CreateDigitalRegistar from "../../model/CreateDigitalRegistar";
import CreateForumModel from "../../model/CreateForumModel";
import CreateIReportModel from "../../model/CreateIReportModel";
import IReportCategory from "../../model/IReportCategory";
import PanicType from "../../model/PanicType";
import PostModel from "../../model/PostModel";
import SuperAdminRole from "../../model/SuperAdminRole";
import SupportCommentModel from "../../model/SupportCommentModel";
import SupportModel from "../../model/SupportModel";
import TargetAudience from "../../model/TargetAudience";
import TransactionModel from "../../model/TransactionModel";
import bulkAccessCodeModel from "../../model/bulkAccessCodeModel";
import createAppointmentModel from "../../model/CreateAppointmentModel";
import createServiceProviderModel from "../../model/createServiceProviderModel";
import singleAccessCodeModel from "../../model/singleAccessCodeModel";
import staticAccessCodeModel from "../../model/staticAccessCodeModel";
import CreateAppointmentModel from "../../model/CreateAppointmentModel";
import CreateTransactionModel from "../../model/CreateTransactionModel";
import CreateSubscriptionModel from "../../model/CreateSubscriptionModel";

export default interface BaseService {
  CreateAppointment(payload: CreateAppointmentModel): Promise<string>;

  DeleteAppointment(consultationId: string): Promise<string>;

  GetAllAppointments(): Promise<any>;

  GetAllAppointmentsByUserId(userId: string): Promise<any>;

  GetAllAppointmentsByConsultationId(consultationId: string): Promise<any> 
  
  CreateTransaction(payload: CreateTransactionModel): Promise<string>;

  GetTransactionByTransactionId(transactionId: string): Promise<any>;

  GetAllTransactionsByUserId(userId: string): Promise<any>;

  GetAllTransaction(): Promise<any>;

  DeleteTransaction(transactionId: string): Promise<string>;

  CreateSubscription(payload: CreateSubscriptionModel): Promise<string>;

  DeleteSubscription(Id: number): Promise<string>;

  GetAllSubscriptionsByUserId(userId: string): Promise<any>;

  GetAllSubscription(): Promise<any>;

  GetAllSubscriptionsById(Id: number): Promise<any>;
}
