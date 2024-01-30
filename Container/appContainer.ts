
import { Container } from 'inversify'
import UserRepository from '../repository/UserRepository'
import Community from '../services/community'
import communityRepository from '../repository/communityRepository'
import UserRepositoryImpl from '../repository/UserRepository'
import communityRepositoryImpl from '../repository/communityRepository'
import CommunityImpl from '../services/community'


export const container = new Container()

container.bind<UserRepository>(UserRepository).to(UserRepositoryImpl)
container.bind<Community>(Community).to(CommunityImpl)
container.bind<communityRepository>(communityRepository).to(communityRepositoryImpl)




