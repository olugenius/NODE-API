import createAppointmentModel from "../../model/creatAppointmentModel"
import memberModel from "../../model/memberModel"

export default interface Member{
    CreateMember(payload:memberModel):Promise<string>
    UpdateMember(memberId:string,payload:memberModel):Promise<string>
    DeleteMember(memberId:string): Promise<string> 
   GetMemberByMemberId(memberId:string):Promise<string>
//    CreateAppointment(payload:createAppointmentModel):Promise<string>
//    UpdateAppointment(payload:createAppointmentModel):Promise<string>
//    DeleteAppointment(Id:number):Promise<string>
//    GetAllAppointment():Promise<any>
//    GetAppointmentId(Id:number):Promise<string>
//    GetAppointmentCommunityId(communityId:string):Promise<string>
   GetAllMembers():Promise<any>
   GetMemberByPhoneOrEmail(channel:string):Promise<any>
   createMembersXls(payloads:memberModel[]):Promise<string>
   GetMemberByCreatorUserId(creatorUserId:string):Promise<any>
   


}