
import { Container } from 'inversify'
import UserRepositoryImpl from '../repository/UserRepositoryImpl'
import UserRepository from '../repository/Abstraction/UserRepository'
import BaseRepository from '../repository/Abstraction/baseRepository'
import baseRepositoryImpl from '../repository/baseRepositoryImpl'
import BaseServiceimpl from '../services/BaseServiceimpl'
import BaseService from '../services/Abstraction/BaseService'


export const container = new Container()

container.bind<UserRepository>('UserRepository').to(UserRepositoryImpl)
container.bind<BaseRepository>('BaseRepository').to(baseRepositoryImpl)
container.bind<BaseService>('BaseService').to(BaseServiceimpl)







