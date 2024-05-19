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
    PurchaseAirtime(amount:number,reference:string,phone:string,telcoCode:string,channel:string,name:string=''): Promise<any> {
        const body = {
            'Amount': amount, 
            'Reference':reference,
            'PhoneNumber':phone, 
            'TelcoCode':telcoCode,
            'Channel':channel,
           'CheckSum':GenerateHash(`${amount}${phone}${reference}`),
           'CustomerName':name
           }
           
           
        return this._billService.PostRequest('',body)
    }
    PurchaseData(amount:string,datacode:string,service_type:string,phone:string,narration:string,reference:string): Promise<any> {
        const body ={
            "amount": amount,
            "datacode": datacode,
            "service_type": service_type,
            "phoneNumber": phone,
            "narration": narration,
            "reference": reference
          }
        return this._billService.PostRequest_Bill('',body)
    }


    PurchaseElectricity(amount:number,service_type:string,account_number:string,phone:string,narration:string,reference:string,meter_type:string): Promise<any> {
        const body ={
            "amount": amount,
            "service_type": service_type,
            "account_number": account_number,
            "phoneNumber": phone,
            "narration": narration,
            "reference": reference,
            "meter_type":meter_type
          }
        return this._billService.PostRequest_Bill('',body)
    }

}