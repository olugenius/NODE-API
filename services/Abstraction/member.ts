import createAppointmentModel from "../../model/creatAppointmentModel"
import memberModel from "../../model/memberModel"

export default interface Member{
    CreateMember(payload:memberModel):Promise<string>
   GetMemberByMemberId(memberId:string):Promise<string>
   createAppointment(payload:createAppointmentModel):Promise<string>
   GetAllAppointment():Promise<any>
   GetAppointmentId(Id:number):Promise<string>
   GetAppointmentCommunityId(communityId:string):Promise<string>
   GetAllMembers():Promise<string>

}