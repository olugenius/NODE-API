import { GenerateUniqueId } from "../utilities/GenerateUniqueId"

export default interface CreateNotificationModel{
    Title:string,
    IsSchedule:Boolean,
    SendDate:Date,
    SendTime:string
    IsImmediately:Boolean,
    Description:string,
    PhotoPath:string,
    CommunityId:string,
    NotificationId:string
    Roles: any,
    UserIds:any
}