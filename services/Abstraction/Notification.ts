import CreateDependantmodel from "../../model/CreateDependantModel"
import CreateNotificationModel from "../../model/CreateNotificationModel"
import createCheckersModel from "../../model/createcheckersModel"

export default interface Notification{
    CreateNotification(payload:CreateNotificationModel):Promise<string>
    UpdateNotification(notificationId:string,payload:CreateNotificationModel):Promise<string>
    UpdateDependantNotificationStatus(Id:number,payload:CreateDependantmodel):Promise<string>
    UpdateCheckerNotificationStatus(Id:number,payload:createCheckersModel):Promise<string>
}