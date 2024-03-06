import { inject, injectable } from "inversify";
import bulkAccessCodeModel from "../model/bulkAccessCodeModel";
import singleAccessCodeModel from "../model/singleAccessCodeModel";
import staticAccessCodeModel from "../model/staticAccessCodeModel";
import BaseRepository from "../repository/Abstraction/baseRepository";
import BaseService from "./Abstraction/BaseService";
import CreateForumModel from "../model/CreateForumModel";
import PostModel from "../model/PostModel";
import CommentModel from "../model/CommentModel";
import createAppointmentModel from "../model/creatAppointmentModel";

@injectable()
export default class BaseServiceimpl implements BaseService{
    constructor(@inject('BaseRepository') private baseRepo:BaseRepository){}
    async CreateSingleCode(payload:singleAccessCodeModel): Promise<string>{
       return await this.baseRepo.createSingleCode(payload)
    }
  


    async CreateStaticCode(payload:staticAccessCodeModel): Promise<string>{
        return await this.baseRepo.createStaticCode(payload)
    }

    async CreateBulkCode(payload:bulkAccessCodeModel): Promise<string>{
        return await this.baseRepo.createBulkCode(payload)
    }



    async GetAllAccessCode(): Promise<any>{
        return await this.baseRepo.getAllAccessCode()
    }

    async GetAccessCodeByid(Id:number): Promise<any>{
        return await this.baseRepo.getAccessCodeByid(Id)
    }

    async CreateForum(payload:CreateForumModel): Promise<string>{
        return await this.baseRepo.CreateForum(payload);
    }
     async UpdateForum(Id:string,payload:CreateForumModel): Promise<string>{
        return await this.baseRepo.UpdateForum(Id,payload);
     }
     async DeleteForum(Id:string): Promise<string>{
        return await this.baseRepo.DeleteForum(Id);
     }
     async ActivateForum(Id:string): Promise<string>{
        return await this.baseRepo.ActivateForum(Id);
     }
     async DeactivateForum(Id:string): Promise<string>{
        return await this.baseRepo.DeactivateForum(Id);
     }
     async GetAllForum():Promise<any>{
        return await this.baseRepo.GetAllForum();
     }
     async GetForumByForumId(Id:string):Promise<any>{
        return await this.baseRepo.GetForumByForumId(Id);
     }
     async CreatePost(payload:PostModel):Promise<string>{
        return await this.baseRepo.CreatePost(payload);
     }
     async GetAllPost():Promise<any>{
        return await this.baseRepo.GetAllPost();
     }
     async GetPostById(PostId:number):Promise<any>{
        return await this.baseRepo.GetPostById(PostId);
     }
     async CreateComment(payload:CommentModel):Promise<string>{
        return await this.baseRepo.CreateComment(payload);
     }
     async UpdateComment(Id:number,payload:CommentModel):Promise<string>{
        return await this.baseRepo.UpdateComment(Id,payload);
     }
     async DeleteComment(Id:number):Promise<string>{
        return await this.baseRepo.DeleteComment(Id);
     }
     async GetAllComments():Promise<any>{
        return await this.baseRepo.GetAllComments();
     }
     async GetCommentById(Id:number):Promise<any>{
        return await this.baseRepo.GetCommentById(Id);
     }

     async CreateAppointment(payload:createAppointmentModel):Promise<string>{  
      return await this.baseRepo.createAppointment(payload)
   }

   async UpdateAppointment(payload:createAppointmentModel):Promise<string>{  
    return await this.baseRepo.updateAppointment(payload)
 }
 async DeleteAppointment(Id:number):Promise<string>{  
    return await this.baseRepo.deleteAppointment(Id)
 }

   async GetAllAppointment():Promise<any>{

      return await this.baseRepo.GetAllAppointment()
   }

   async GetAppointmentId(Id:number):Promise<string>{

      return await this.baseRepo.GetAppointmentId(Id)
   }

   async GetAppointmentCommunityId(communityId:string):Promise<string>{

      return await this.baseRepo.GetAppointmentCommunityId(communityId)
   }
     
}