import CreateDependantmodel from "../../model/CreateDependantModel";
import CreateNotificationModel from "../../model/CreateNotificationModel";
import createSubAdminModel from "../../model/createSubAdminModel";
import createCheckersModel from "../../model/createcheckersModel";
import memberModel from "../../model/memberModel";

export default interface NotificationRepo{
    
    CreateNotification(payload:CreateNotificationModel):Promise<string>
    UpdateNotification(notificationId:string,payload:CreateNotificationModel):Promise<string>
    UpdateDependantNotificationStatus(dependantId:string,payload:CreateDependantmodel):Promise<string>
    UpdateAllDependantNotificationStatusByAdmin(CreatorUserId:string,payload:CreateDependantmodel):Promise<string>
    UpdateMemberNotificationStatus(memberId:string,payload:memberModel):Promise<string>
    UpdateAllMemberNotificationStatusByAdmin(CreatorUserId:string,payload:memberModel):Promise<string>
    UpdateCheckerNotificationStatus(checkerId:string,payload:createCheckersModel):Promise<string>
    UpdateAllCheckerNotificationStatusByAdmin(CreatorUserId:string,payload:createCheckersModel):Promise<string>
    UpdateSubAdminNotificationStatus(subAdminId:string,payload:createSubAdminModel):Promise<string>
    UpdateAllSubAdminNotificationStatusByAdmin(CreatorUserId:string,payload:createSubAdminModel):Promise<string>
    GetAllNotification():Promise<any>
}