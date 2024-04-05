import UpdateEmailModel from "../../model/UpdateEmailModel"
import { registerModel, updateUserModel } from "../../model/registerModel"
import registerResponseModel from "../../model/registerResponseModel"
import { createPasswordRequestModel, updatePasswordRequestModel } from "../../model/resetPasswordRequestModel"

export default interface UserRepository{
    GetUserByPhone(Phone:string):Promise<any | null>
    GetUserByEmailOrPhone(Email:string):Promise<any | null>
    GetUserByEmail(Email:string):Promise<any | null>
    AddToken(email:string,mailFor:string,token:string,medium:string):Promise<string>
    UpdateUserRefreshToken(phone:string,token:string):Promise<any>
    UpdateUserToken(email:string,mailFor:string):Promise<string>
    createUser(payload:registerModel):Promise<registerResponseModel>
    updateUser(channel:string,payload:updateUserModel):Promise<string>
    UpdateUserTokenTest(email:string,mailFor:string):Promise<string>
    UpdateUserPassword(newPassword:string,channel:string):Promise<any>
    GetUserToken(email:string,mailFor:string):Promise<any>
    CreatePassword(payload:createPasswordRequestModel):Promise<any>
    UpdatePassword(payload:updatePasswordRequestModel):Promise<any>
    DeleteAccount(Id:number):Promise<string>
    UpdateEmail(payload:UpdateEmailModel):Promise<string>

}