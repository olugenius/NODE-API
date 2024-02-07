import loginModel from '../model/loginModel'
import userRepository from '../repository/UserRepositoryImpl'

class UserService{

    async LoginUser(loginModel:loginModel){
         const userRepo = new userRepository()
         let result = await userRepo.getAllUsers(loginModel)
    }
}