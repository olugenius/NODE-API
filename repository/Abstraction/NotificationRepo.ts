import CreateDependantmodel from "../../model/CreateDependantModel";
import CreateNotificationModel from "../../model/CreateNotificationModel";
import createSubAdminModel from "../../model/createSubAdminModel";
import createCheckersModel from "../../model/createcheckersModel";

export default interface NotificationRepo{
    
    CreateNotification(payload:CreateNotificationModel):Promise<string>
    UpdateNotification(notificationId:string,payload:CreateNotificationModel):Promise<string>
    UpdateDependantNotificationStatus(dependantId:string,payload:CreateDependantmodel):Promise<string>
    UpdateCheckerNotificationStatus(checkerId:string,payload:createCheckersModel):Promise<string>
    UpdateSubAdminNotificationStatus(subAdminId:string,payload:createSubAdminModel):Promise<string>
    GetAllNotification():Promise<any>
}