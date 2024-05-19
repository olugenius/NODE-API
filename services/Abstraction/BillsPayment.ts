export default interface BillPayment{
    GetAirtimeTelcos():Promise<any>
    GetDataTelcos():Promise<any>
    PurchaseAirtime(amount:number,reference:string,phone:string,telcoCode:string,channel:string,name:string):Promise<any>
    PurchaseData(amount:string,datacode:string,service_type:string,phone:string,narration:string,reference:string):Promise<any>
}