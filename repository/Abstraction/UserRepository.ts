import registerModel from "../../model/registerModel"
import registerResponseModel from "../../model/registerResponseModel"

export default interface UserRepository{
    GetUserByPhone(Phone:string):Promise<any | null>
    GetUserByEmailOrPhone(Email:string):Promise<any | null>
    GetUserByEmail(Email:string):Promise<any | null>
    AddToken(email:string,mailFor:string,token:string,medium:string):Promise<string>
    UpdateUserRefreshToken(phone:string,token:string):Promise<any>
    UpdateUserToken(email:string,mailFor:string):Promise<string>
    createUser(payload:registerModel):Promise<registerResponseModel>
    UpdateUserTokenTest(email:string,mailFor:string):Promise<string>
    UpdateUserPassword(newPassword:string,email:string):Promise<any>
    GetUserToken(email:string,mailFor:string):Promise<any>

}