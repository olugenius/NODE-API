import { inject, injectable } from "inversify";
import NotificationRepo from "../repository/Abstraction/NotificationRepo";
import CreateNotificationModel from "../model/CreateNotificationModel";
import createCheckersModel from "../model/createcheckersModel";
import CreateDependantmodel from "../model/CreateDependantModel";
import Notification from "./Abstraction/Notification";
@injectable()
export default class NotificationImpl implements Notification{
constructor(@inject('NotificationRepo') private notificationRepo:NotificationRepo){}

async CreateNotification(payload:CreateNotificationModel):Promise<string>{
   return await this.notificationRepo.CreateNotification(payload)
}
async UpdateNotification(notificationId:string,payload:CreateNotificationModel):Promise<string>{
   return await this.notificationRepo.UpdateNotification(notificationId,payload)
}
async UpdateDependantNotificationStatus(Id:number,payload:CreateDependantmodel):Promise<string>{
  return await this.notificationRepo.UpdateDependantNotificationStatus(Id,payload)
}
async UpdateCheckerNotificationStatus(Id:number,payload:createCheckersModel):Promise<string>{
  return await this.notificationRepo.UpdateCheckerNotificationStatus(Id,payload)
}

}