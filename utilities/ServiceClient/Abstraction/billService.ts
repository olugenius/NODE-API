export default interface billService{
    GetRequest(endpoint:string):Promise<any>
    GetRequest_Bill(endpoint:string):Promise<any>
    PostRequest(endpoint:string,body:any):Promise<any>
    PostRequest_Bill(endpoint:string,body:any):Promise<any>
}