import AirtimePurchaseModel from "../../model/AirtimePurchaseModel"
import DataPurchaseModel from "../../model/DataPurchaseModel"
import DataResponseModel from "../../model/DataResponseModel"
import ElectricityPurchaseModel from "../../model/ElectricityPurchaseModel"

export default interface BillsPayment{
    GetAirtimeTelcos():Promise<any>
    GetDataTelcos():Promise<any>
    PurchaseAirtime(payload:AirtimePurchaseModel):Promise<any>
    PurchaseData(payload:DataPurchaseModel):Promise<DataResponseModel>
    PurchaseElectricity(payload:ElectricityPurchaseModel): Promise<any> 
}