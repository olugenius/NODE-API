import express from "express"
import { container } from "../Container/appContainer"
import { Authorize } from "../middleware/authorization"
import CreateNotificationModel from "../model/CreateNotificationModel"
import Notification from "../services/Abstraction/Notification"
import { HttpStatus } from "../utilities/HttpstatusCode"
import createCheckersModel from "../model/createcheckersModel"
import CreateDependantmodel from "../model/CreateDependantModel"
import createSubAdminModel from "../model/createSubAdminModel"
import memberModel from "../model/memberModel"


/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Notification Service
 */

/**
 * @swagger
 * /api/notification/checkers/update/{checkerId}:
 *   put:
 *     summary: Update checker notification status
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: checkerId
 *         required: true
 *         schema:
 *           type: string
 *         description: checkerId of the checker
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AllowPushNotification:
 *                 type: boolean
 *               AllowEmailNotification:
 *                 type: boolean
 *               AllowSMSNotification:
 *                 type: boolean
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Checker Notification Status Updated successfully
 */

/**
 * @swagger
 * /api/notification/admin/checkers/update/{creatorUserId}:
 *   put:
 *     summary: Admin Update checker notification status
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: creatorUserId
 *         required: true
 *         schema:
 *           type: string
 *         description: creatorUserId of the checker
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AllowPushNotification:
 *                 type: boolean
 *               AllowEmailNotification:
 *                 type: boolean
 *               AllowSMSNotification:
 *                 type: boolean
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Checker Notification Status Updated successfully
 */


/**
 * @swagger
 * /api/notification/dependant/update/{dependantId}:
 *   put:
 *     summary: Update dependant notification status
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: dependantId
 *         required: true
 *         schema:
 *           type: string
 *         description: dependantId of the Dependant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AllowPushNotification:
 *                 type: boolean
 *               AllowEmailNotification:
 *                 type: boolean
 *               AllowSMSNotification:
 *                 type: boolean
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Dependant Notification Status Updated successfully
 */



/**
 * @swagger
 * /api/notification/admin/dependant/update/{creatorUserId}:
 *   put:
 *     summary: Admin Update dependant notification status
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: creatorUserId
 *         required: true
 *         schema:
 *           type: string
 *         description: creatorUserId of the Dependant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AllowPushNotification:
 *                 type: boolean
 *               AllowEmailNotification:
 *                 type: boolean
 *               AllowSMSNotification:
 *                 type: boolean
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Dependant Notification Status Updated successfully
 */


/**
 * @swagger
 * /api/notification/member/update/{memberId}:
 *   put:
 *     summary: Update Member Notification status
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: memberId of the Member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AllowPushNotification:
 *                 type: boolean
 *               AllowEmailNotification:
 *                 type: boolean
 *               AllowSMSNotification:
 *                 type: boolean
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Member Notification Status Updated successfully
 */


/**
 * @swagger
 * /api/notification/admin/member/update/{creatorUserId}:
 *   put:
 *     summary: Admin Update Member Notification status
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: creatorUserId
 *         required: true
 *         schema:
 *           type: string
 *         description: creatorUserId of the Member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AllowPushNotification:
 *                 type: boolean
 *               AllowEmailNotification:
 *                 type: boolean
 *               AllowSMSNotification:
 *                 type: boolean
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Member Notification Status Updated successfully
 */


/**
 * @swagger
 * /api/notification/subAdmin/update/{subAdminId}:
 *   put:
 *     summary: Update subAdmin notification status
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: subAdminId
 *         required: true
 *         schema:
 *           type: string
 *         description: subAdminId of the SubAdmin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AllowPushNotification:
 *                 type: boolean
 *               AllowEmailNotification:
 *                 type: boolean
 *               AllowSMSNotification:
 *                 type: boolean
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: SubAdmin Notification Status Updated successfully
 */


/**
 * @swagger
 * /api/notification/update/{notificationId}:
 *   put:
 *     summary: Update Notification
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: notificationId of the Notification
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *               IsSchedule:
 *                 type: boolean
 *               SendDate:
 *                 type: string
 *               SendTime:
 *                 type: string
 *               IsImmediately:
 *                 type: boolean
 *               Description:
 *                 type: string
 *               file:
 *                 type: file
 *               CommunityId:
 *                 type: string
 *               UserIds:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Notification Updated successfully
 */


/**
 * @swagger
 * /api/notification/admin/subAdmin/update/{creatorUserId}:
 *   put:
 *     summary: Admin Update subAdmin notification status
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: creatorUserId
 *         required: true
 *         schema:
 *           type: string
 *         description: creatorUserId of the SubAdmin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AllowPushNotification:
 *                 type: boolean
 *               AllowEmailNotification:
 *                 type: boolean
 *               AllowSMSNotification:
 *                 type: boolean
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: SubAdmin Notification Status Updated successfully
 */



/**
 * @swagger
 * /api/notification/create:
 *   post:
 *     summary: Create Notification
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *               IsSchedule:
 *                 type: boolean
 *               SendDate:
 *                 type: string
 *               SendTime:
 *                 type: string
 *               IsImmediately:
 *                 type: boolean
 *               Description:
 *                 type: string
 *               file:
 *                 type: file
 *               CommunityId:
 *                 type: string
 *               UserIds:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Notification Updated successfully
 */


/**
 * @swagger
 * /api/notification/all:
 *   get:
 *     summary: Get All Notifications
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Notification]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Notification
 *               data: []
 */




const router = express.Router()

const notification = container.get<Notification>('Notification')


router.post('/notification/create',Authorize,async(req,res)=>{
    try{
      const reqBody = <CreateNotificationModel>req.body
      reqBody.Roles = reqBody.Roles.split(',')
      reqBody.UserIds = reqBody.UserIds.split(',')
      var response = await notification.CreateNotification(reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Notification'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Notification',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    
    }
      
  })

  router.put('/notification/update/:notificationId',Authorize,async(req,res)=>{
    try{
      const reqBody = <CreateNotificationModel>req.body
      const param = req.params.notificationId
      reqBody.UserIds = reqBody.UserIds.split(',')
      var response = await notification.UpdateNotification(param,reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update Notification'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Updated Notification',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    
    }
      
  })

  router.put('/notification/checkers/update/:checkerId',Authorize,async(req,res)=>{
    try{
      const reqBody = <createCheckersModel>req.body
      const param = req.params.checkerId
      var response = await notification.UpdateCheckerNotificationStatus(param,reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update checker  Notification status '})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Updated checker Notification status ',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    
    }
      
  })

  router.put('/notification/dependant/update/:dependantId',Authorize,async(req,res)=>{
    try{
      const reqBody = <CreateDependantmodel>req.body
      const param = req.params.dependantId
      var response = await notification.UpdateDependantNotificationStatus(param,reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update dependant Notification status '})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Updated dependant Notification status ',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    
    }
      
  })

  router.put('/notification/member/update/:memberId',Authorize,async(req,res)=>{
    try{
      const reqBody = <memberModel>req.body
      const param = req.params.memberId
      var response = await notification.UpdateMemberNotificationStatus(param,reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update member Notification status '})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Updated member Notification status ',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    
    }
      
  })

  router.put('/notification/subAdmin/update/:subAdminId',Authorize,async(req,res)=>{
    try{
      const reqBody = <createSubAdminModel>req.body
      const param = req.params.subAdminId
      var response = await notification.UpdateSubAdminNotificationStatus(param,reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update subAdmin Notification status '})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Updated subAdmin Notification status ',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    
    }
      
  })

  router.put('/notification/admin/checkers/update/:creatorUserId',Authorize,async(req,res)=>{
    try{
      const reqBody = <createCheckersModel>req.body
      const param = req.params.creatorUserId
      var response = await notification.UpdateAllCheckerNotificationStatusByAdmin(param,reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update checker  Notification status '})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Updated checker Notification status ',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    
    }
      
  })

  router.put('/notification/admin/dependant/update/:creatorUserId',Authorize,async(req,res)=>{
    try{
      const reqBody = <CreateDependantmodel>req.body
      const param = req.params.creatorUserId
      var response = await notification.UpdateAllDependantNotificationStatusByAdmin(param,reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update dependant Notification status '})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Updated dependant Notification status ',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    
    }
      
  })

  router.put('/notification/admin/member/update/:creatorUserId',Authorize,async(req,res)=>{
    try{
      const reqBody = <memberModel>req.body
      const param = req.params.creatorUserId
      var response = await notification.UpdateAllMemberNotificationStatusByAdmin(param,reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update member Notification status '})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Updated member Notification status ',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    
    }
      
  })

  router.put('/notification/admin/subAdmin/update/:creatorUserId',Authorize,async(req,res)=>{
    try{
      const reqBody = <createSubAdminModel>req.body
      const param = req.params.creatorUserId
      var response = await notification.UpdateAllSubAdminNotificationStatusByAdmin(param,reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update subAdmin Notification status '})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Updated subAdmin Notification status ',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    
    }
      
  })

  router.get('/notification/all',Authorize,async(req,res)=>{
    try{
      var response = await notification.GetAllNotification()
      if(response?.length < 1){
        return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Notifications '})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Notifications',data:response})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    }
      
  })



export default router