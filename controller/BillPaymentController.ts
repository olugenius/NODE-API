import express from "express";
import { container } from "../Container/appContainer";
import BillsPayment from "../services/Abstraction/BillsPayment";
import { HttpStatus } from "../utilities/HttpstatusCode";
import AirtimePurchaseModel from "../model/AirtimePurchaseModel";
import DataPurchaseModel from "../model/DataPurchaseModel";
import AirtimePurchaseResponse from "../model/DTOs/AirtimePurchaseResponse";
import DataResponseModel from "../model/DataResponseModel";
import DataPurchaseDto from "../model/DTOs/DataPurchaseDto";
import ElectricityPurchaseModel from "../model/ElectricityPurchaseModel";
import ElectricityPurchaseResponse from "../model/ElectricityPurchaseResponse";
import ElectricityPurchaseDto from "../model/DTOs/ElectricityPurchaseDto";



/**
 * @swagger
 * tags:
 *   name: Bills
 *   description: Bills Payment
 */



/**
 * @swagger
 * /api/bills/airtime/purchase:
 *   post:
 *     summary: Purchase Airtime
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Bills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               phone:
 *                 type: string
 *               telcoCode:
 *                 type: string
 *               channel:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Airtime Purchased successfully
 */


/**
 * @swagger
 * /api/bills/data/purchase:
 *   post:
 *     summary: Purchase Data
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Bills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *               datacode:
 *                 type: string
 *               service_type:
 *                 type: string
 *               phone:
 *                 type: string
 *               narration:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Data Purchased successfully
 */


/**
 * @swagger
 * /api/bills/electricity/purchase:
 *   post:
 *     summary: Purchase electricity
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Bills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *               account_number:
 *                 type: string
 *               service_type:
 *                 type: string
 *               phone:
 *                 type: string
 *               narration:
 *                 type: string
 *               meter_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Electricity Purchased successfully
 */


/**
 * @swagger
 * /api/bills/airtime/providers:
 *   get:
 *     summary: Get All Airtime Service Providers
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Bills] 
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Success Fetched All Airtime Service Providers
 *               data: []
 */


/**
 * @swagger
 * /api/bills/data/providers:
 *   get:
 *     summary: Get All Data Service Providers
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Bills] 
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Success Fetched All Data Service Providers
 *               data: []
 */

const router = express.Router()
const _billsPayment = container.get<BillsPayment>('BillsPayment')
router.get('bills/airtime/providers',async(req,res)=>{
    try {
       var response = await _billsPayment.GetAirtimeTelcos()
       if(response.length > 0){
        return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetched Airtime Service Providers',data:response})
       }
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Airtime Service Providers'})
    } catch (error) {
        console.log('An error occurred getting Airtime Providers')
        return res.status(HttpStatus.STATUS_500).json({status:HttpStatus.STATUS_FAILED,message:'Something went wrong'})
    }

})

router.post('bills/airtime/purchase',async(req,res)=>{
    try {
        const reqBody = <AirtimePurchaseModel>req.body
       var response = <AirtimePurchaseResponse>await _billsPayment.PurchaseAirtime(reqBody)
       switch(response.responseCode){
        case response.responseCode = '00':
            return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Purchased Airtime',data:response})

       case response.responseCode = '01':
            return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Insufficient Fund'})
    
       case response.responseCode = '02':
            return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Purchase Airtime'})
       
       case response.responseCode = '03':
            return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Network'})
            
       case response.responseCode = '04':
            return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'System Failure'})

       case response.responseCode = '05':
           return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Invalid CheckSum'})

        default:
            return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Purchase Airtime'})

       }
      
    } catch (error) {
        console.log('An error occurred getting Airtime Providers')
        return res.status(HttpStatus.STATUS_500).json({status:HttpStatus.STATUS_FAILED,message:'Something went wrong'})
    }

})

router.get('bills/data/providers',async(req,res)=>{
    try {
       var response = await _billsPayment.GetDataTelcos()
       if(response.length > 0){
        return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetched Airtime Service Providers',data:response})
       }
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Airtime Service Providers'})
    } catch (error) {
        console.log('An error occurred getting Airtime Providers')
        return res.status(HttpStatus.STATUS_500).json({status:HttpStatus.STATUS_FAILED,message:'Something went wrong'})
    }

})


router.post('bills/data/purchase',async(req,res)=>{
    try {
        const reqBody = <DataPurchaseModel>req.body
       var response = <DataResponseModel>await _billsPayment.PurchaseData(reqBody)
       if(response.status &&response.response.response_description === 'delivered'){
        const resData :DataPurchaseDto={
            description:response.response.response_description,
            amount:response.response.amount,
            transactionDate:response.response.transaction_date
        } 
        return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Purchased Data',data:resData})
       }
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Purchase Airtime'})
    } catch (error) {
        console.log('An error occurred getting Airtime Providers')
        return res.status(HttpStatus.STATUS_500).json({status:HttpStatus.STATUS_FAILED,message:'Something went wrong'})
    }

})


router.post('bills/electricity/purchase',async(req,res)=>{
    try {
        const reqBody = <ElectricityPurchaseModel>req.body
       var response = <ElectricityPurchaseResponse>await _billsPayment.PurchaseElectricity(reqBody)
       if(response.status &&response.response.response_description === 'delivered'){
        const resData :ElectricityPurchaseDto={
            description:response.response.response_description,
            amount:response.response.amount,
            transaction_date:response.response.transaction_date,
            purchased_code:response.response.purchased_code,
            customerName:response.response.customerName,
            customerAddress:response.response.customerAddress,
            configureToken:response.response.configureToken,
            exchangeReference:response.response.exchangeReference,
            fixChargeAmount:response.response.fixChargeAmount,
            requestId:response.response.requestId,
            resetToken:response.response.resetToken,
            tariff:response.response.tariff,
            taxAmount:response.response.taxAmount,
            token:response.response.token,
            tokenAmount:response.response.tokenAmount,
            units:response.response.units,

        } 
        return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Purchased Data',data:resData})
       }
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Purchase Airtime'})
    } catch (error) {
        console.log('An error occurred getting Airtime Providers')
        return res.status(HttpStatus.STATUS_500).json({status:HttpStatus.STATUS_FAILED,message:'Something went wrong'})
    }

})



export default router;