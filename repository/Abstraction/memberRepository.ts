import createAppointmentModel from "../../model/creatAppointmentModel"
import memberModel from "../../model/memberModel"

export default interface memberRepository{
    // createAppointment(payload:createAppointmentModel):Promise<string>
    // updateAppointment(payload:createAppointmentModel):Promise<string>
    // deleteAppointment(Id:number):Promise<string>
    // GetAllAppointment():Promise<any>
    // GetAppointmentId(Id:number):Promise<any>
    // GetAppointmentCommunityId(CommunityId:string):Promise<any>
    createMember(payload:memberModel):Promise<string>
    updateMember(memberId:string,payload:memberModel):Promise<string>
    deleteMember(memberId:string):Promise<string>
    GetMemberByMemberId(memberId:string):Promise<any>
    GetAllMembers():Promise<any>
    GetMemberByPhoneOrEmail(channel:string):Promise<any>
    createMembersXls(payloads:memberModel[]):Promise<string>
    GetMemberByCreatorUserId(creatorUserId:string):Promise<any>
    
}