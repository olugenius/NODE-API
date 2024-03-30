import { inject, injectable } from "inversify";
import NotificationRepo from "../repository/Abstraction/NotificationRepo";
import CreateNotificationModel from "../model/CreateNotificationModel";
import createCheckersModel from "../model/createcheckersModel";
import CreateDependantmodel from "../model/CreateDependantModel";
import Notification from "./Abstraction/Notification";
import createSubAdminModel from "../model/createSubAdminModel";
@injectable()
export default class NotificationImpl implements Notification{
constructor(@inject('NotificationRepo') private notificationRepo:NotificationRepo){}

async CreateNotification(payload:CreateNotificationModel):Promise<string>{
   return await this.notificationRepo.CreateNotification(payload)
}
async UpdateNotification(notificationId:string,payload:CreateNotificationModel):Promise<string>{
   return await this.notificationRepo.UpdateNotification(notificationId,payload)
}
async UpdateDependantNotificationStatus(dependantId:string,payload:CreateDependantmodel):Promise<string>{
  return await this.notificationRepo.UpdateDependantNotificationStatus(dependantId,payload)
}
async UpdateCheckerNotificationStatus(checkerId:string,payload:createCheckersModel):Promise<string>{
  return await this.notificationRepo.UpdateCheckerNotificationStatus(checkerId,payload)
}
async UpdateSubAdminNotificationStatus(subAdminId:string,payload:createSubAdminModel):Promise<string>{
  return await this.notificationRepo.UpdateSubAdminNotificationStatus(subAdminId,payload)
}

async  GetAllNotification():Promise<any>{
  return await this.notificationRepo.GetAllNotification()
}

}