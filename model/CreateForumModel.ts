export default interface CreateForumModel{
    Title:string,
    CommunityId:string,
    ForumId:string,
    CreatorUserId:string,
    DateCreated:Date,
    Status:number,
    UserRoles:string[],
    UserIds?:string[]
}