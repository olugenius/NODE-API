export default interface TargetAudience{
    Name:string,
    Allow_Male:boolean,
    Allow_Female:boolean,
    Allow_18_29:boolean,
    Allow_30_49:boolean,
    Allow_50_Plus:boolean,
    Allow_Role_Community_Admin:boolean,
    Allow_Role_SubAdmin:boolean,
    Allow_Role_Checker:boolean,
    Allow_Role_Member:boolean,
    Allow_Role_Dependant:boolean,
    CommunityIds:string[]
}