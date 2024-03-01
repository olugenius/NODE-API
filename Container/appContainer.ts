
import { Container } from 'inversify'
import UserRepositoryImpl from '../repository/UserRepositoryImpl'
import communityRepositoryImpl from '../repository/communityRepositoryImpl'
import CommunityImpl from '../services/communityImpl'
import MemberImpl from '../services/memberImpl'
import Community from '../services/Abstraction/community'
import Member from '../services/Abstraction/member'
import memberRepository from '../repository/Abstraction/memberRepository'
import memberRepositoryImpl from '../repository/memberRepositoryImpl'
import UserRepository from '../repository/Abstraction/UserRepository'
import communityRepository from '../repository/Abstraction/communityRepository'
import BaseRepository from '../repository/Abstraction/baseRepository'
import baseRepositoryImpl from '../repository/baseRepositoryImpl'
import BaseServiceimpl from '../services/BaseServiceimpl'
import BaseService from '../services/Abstraction/BaseService'
import DependantRepository from '../repository/Abstraction/DependantRepository'
import DependantRepositoryImpl from '../repository/DependantRepositoryImpl'
import Dependant from '../services/Abstraction/Dependant'
import DependantImpl from '../services/DependantImpl'


export const container = new Container()

container.bind<UserRepository>('UserRepository').to(UserRepositoryImpl)
container.bind<Community>('Community').to(CommunityImpl)
container.bind<communityRepository>('communityRepository').to(communityRepositoryImpl)
container.bind<memberRepository>('memberRepository').to(memberRepositoryImpl)
container.bind<Member>('Member').to(MemberImpl)
container.bind<BaseRepository>('BaseRepository').to(baseRepositoryImpl)
container.bind<BaseService>('BaseService').to(BaseServiceimpl)
container.bind<DependantRepository>('DependantRepository').to(DependantRepositoryImpl)
container.bind<Dependant>('Dependant').to(DependantImpl)





