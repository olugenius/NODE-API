import AirtimePurchaseModel from "../model/AirtimePurchaseModel";
import DataPurchaseModel from "../model/DataPurchaseModel";
import DataResponseModel from "../model/DataResponseModel";
import ElectricityPurchaseModel from "../model/ElectricityPurchaseModel";
import { GenerateUniqueId } from "../utilities/GenerateUniqueId";
import billService from "../utilities/ServiceClient/Abstraction/billService";
import GenerateHash from "../utilities/generateHash";
import BillPayment from "./Abstraction/BillsPayment";

export default class BillsPaymentImpl implements BillPayment{
    constructor(private _billService:billService){

    }
    GetAirtimeTelcos(): Promise<any> {
        return this._billService.GetRequest('')
    }
    GetDataTelcos(): Promise<any> {
        return this._billService.GetRequest_Bill('')
    }
    PurchaseAirtime(payload:AirtimePurchaseModel): Promise<any> {
        const body = {
            'Amount': payload.amount, 
            'Reference':payload.reference,
            'PhoneNumber':payload.phone, 
            'TelcoCode':payload.telcoCode,
            'Channel':payload.channel,
           'CheckSum':GenerateHash(`${payload.amount}${payload.phone}${payload.reference}`),
           'CustomerName':name
           }
           
           
        return this._billService.PostRequest('',body)
    }
    PurchaseData(payload:DataPurchaseModel): Promise<DataResponseModel> {
        const body ={
            "amount": payload.amount,
            "datacode": payload.datacode,
            "service_type": payload.service_type,
            "phoneNumber": payload.phone,
            "narration": payload.narration,
            "reference": payload.reference
          }
        return this._billService.PostRequest_Bill('',body)
    }


    PurchaseElectricity(payload:ElectricityPurchaseModel): Promise<any> {
        const body ={
            "amount": payload.amount,
            "service_type": payload.service_type,
            "account_number": payload.account_number,
            "phoneNumber": payload.phone,
            "narration": payload.narration,
            "reference": payload.reference,
            "meter_type":payload.meter_type
          }
        return this._billService.PostRequest_Bill('',body)
    }

    PurchaseCableTv(amount:number,service_type:string,account_number:string,phone:string,narration:string,reference:string,meter_type:string): Promise<any> {
        const body = {
            "serviceID": "dstv",
            "billersCode": "1212121212",
            "variation_code": "dstv-padi",
            "amount": 1850.00,
            "phone": "08138329684",
            "subscription_type": "change",
            "quantity": "1"
          }
        return this._billService.PostRequest_Bill('',body)
    }

}