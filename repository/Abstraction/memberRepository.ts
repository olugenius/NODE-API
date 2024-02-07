import createAppointmentModel from "../../model/creatAppointmentModel"
import memberModel from "../../model/memberModel"

export default interface memberRepository{
    createAppointment(payload:createAppointmentModel):Promise<string>
    GetAllAppointment():Promise<any>
    GetAppointmentId(Id:number):Promise<any>
    GetAppointmentCommunityId(CommunityId:string):Promise<any>
    createMember(payload:memberModel):Promise<string>
    GetMemberByMemberId(memberId:string):Promise<any>
    GetAllMembers():Promise<any>
}