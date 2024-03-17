import express from 'express'
import { container } from '../Container/appContainer'
import BaseService from '../services/Abstraction/BaseService'
import singleAccessCodeModel from '../model/singleAccessCodeModel'
import { HttpStatus } from '../utilities/HttpstatusCode'
import staticAccessCodeModel from '../model/staticAccessCodeModel'
import bulkAccessCodeModel from '../model/bulkAccessCodeModel'
import { BulkAccessCodeModelValidator, SingleAccessCodeModelValidator, StaticAccessCodeModelValidator } from '../utilities/BaseValidator'
import { validationResult } from 'express-validator'
import CreateForumModel from '../model/CreateForumModel'
import PostModel from '../model/PostModel'
import CommentModel from '../model/CommentModel'
import createAppointmentModel from '../model/creatAppointmentModel'
import multer from 'multer'
import { CreateAppointmentValidator } from '../utilities/MembersValidator'
import TransactionModel from '../model/TransactionModel'


/**
 * @swagger
 * tags:
 *   name: Base
 *   description: Base Service
 */

/**
 * @swagger
 * /api/accessCode/single/create:
 *   post:
 *     summary: Create Single Access Code
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Purpose:
 *                 type: string
 *               StartTime:
 *                 type: Date
 *               EndTime:
 *                 type: Date
 *               Name:
 *                 type: string
 *               Date:
 *                 type: Date
 *               Phone:
 *                 type: string
 *               Email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Single Access Code created successfully
 */


/**
 * @swagger
 * /api/accessCode/static/create:
 *   post:
 *     summary: Create Static Access Code
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DateRange:
 *                 type: string
 *               Frequency:
 *                 type: string
 *               Name:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Email:
 *                 type: string
 *               Category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Static Access Code created successfully
 */


/**
 * @swagger
 * /api/accessCode/bulk/create:
 *   post:
 *     summary: Create Bulk Access Code
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Date:
 *                 type: Date
 *               StartTime:
 *                 type: Date
 *               EndTime:
 *                 type: Date
 *               Frequency:
 *                 type: string
 *               AppointmentTitle:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Email:
 *                 type: string
 *               NoOfParticipants:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Bulk Access Code created successfully
 */



/**
 * @swagger
 * /api/accessCode/all:
 *   get:
 *     summary: Get All Access Code
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Access Code
 */



/**
 * @swagger
 * /api/accessCode/{Id}:
 *   get:
 *     summary: Get Access Code by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Access Code to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Access Code by Id
 */



/**
 * @swagger
 * /api/forum/create:
 *   post:
 *     summary: Create Forum
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *               CommunityId:
 *                 type: string
 *               CreatorUserId:
 *                 type: string
 *               UserRoles:
 *                 type: array
 *                 items:
 *                  type: string
 *               UserIds:
 *                 type: array
 *                 items:
 *                  type: string
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Forum created successfully
 */


/**
 * @swagger
 * /api/forum/update/{forumId}:
 *   put:
 *     summary: Update Forum
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Forum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *               CommunityId:
 *                 type: string
 *               UserRoles:
 *                 type: array
 *                 items:
 *                  type: string
 *         
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Forum created successfully
 */


/**
 * @swagger
 * /api/forum/delete/{forumId}:
 *   delete:
 *     summary: Delete Forum
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         schema:
 *           type: string
 *         description: forumID of the Forum
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Forum deleted successfully
 */


/**
 * @swagger
 * /api/forum/activate/{forumId}:
 *   post:
 *     summary: Activate Forum
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         schema:
 *           type: string
 *         description: forumID of the Forum
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Forum Activated successfully
 */

/**
 * @swagger
 * /api/forum/deactivate/{forumId}:
 *   post:
 *     summary: Deactivate Forum
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         schema:
 *           type: string
 *         description: forumID of the Forum
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Forum Activated successfully
 */


/**
 * @swagger
 * /api/forum/all:
 *   get:
 *     summary: Get All Forum
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Forum
 */


/**
 * @swagger
 * /api/forum/{forumId}:
 *   get:
 *     summary: Get Forum by forumId
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         schema:
 *           type: string
 *         description: forumID of the Forum to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Forum by forumId
 */



/**
 * @swagger
 * /api/post/create:
 *   post:
 *     summary: Create Post
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *               Information:
 *                 type: string
 *               UserId:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Post created successfully
 */



/**
 * @swagger
 * /api/post/all:
 *   get:
 *     summary: Get All Post
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Post
 */


/**
 * @swagger
 * /api/post/{Id}:
 *   get:
 *     summary: Get Post by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Post to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Post by Id
 */



/**
 * @swagger
 * /api/comment/create:
 *   post:
 *     summary: Create Comment
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PostId:
 *                 type: number
 *               Comment:
 *                 type: string
 *               UserId:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Comment created successfully
 */


/**
 * @swagger
 * /api/comment/update/{Id}:
 *   put:
 *     summary: Update Comment
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Comment:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Comment Updated successfully
 */



/**
 * @swagger
 * /api/comment/delete/{Id}:
 *   delete:
 *     summary: delete comment
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Comment
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Comment Deleted successfully
 */


/**
 * @swagger
 * /api/comment/all:
 *   get:
 *     summary: Get All Comment
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Comments
 */



/**
 * @swagger
 * /api/comment/{Id}:
 *   get:
 *     summary: Get Comment by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Comment to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got comment by Id
 */


/**
 * @swagger
 * /api/appointment/create:
 *   post:
 *     summary: Create Appointment
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: file
 *               Title:
 *                 type: string
 *               Date:
 *                 type: Date
 *               Time:
 *                 type: string
 *               Venue:
 *                 type: string
 *               Description:
 *                 type: string
 *               CommunityId:
 *                 type: string
 *           example:
 *             Channel: JohnDoe
 *             Password: john@example.com
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Appointment created Successful
 */



/**
 * @swagger
 * /api/appointment/update:
 *   put:
 *     summary: Update Appointment
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: number
 *               file:
 *                 type: file
 *               Title:
 *                 type: string
 *               Date:
 *                 type: Date
 *               Time:
 *                 type: string
 *               Venue:
 *                 type: string
 *               Description:
 *                 type: string
 *               CommunityId:
 *                 type: string
 *           example:
 *             Channel: JohnDoe
 *             Password: john@example.com
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Appointment Updated Successful
 */


/**
 * @swagger
 * /api/appointment/delete/{Id}:
 *   delete:
 *     summary: Delete Appointment by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Appointment to Delete
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully Deleted Appointment
 */


/**
 * @swagger
 * /api/appointment/{Id}:
 *   get:
 *     summary: Get Appointment by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Appointment to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Appointment by Id
 */


/**
 * @swagger
 * /api/appointment/{communityId}:
 *   get:
 *     summary: Get Appointment by communityId
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *         description: communityID of the Appointment to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Appointment by communityId
 */


/**
 * @swagger
 * /api/appointment/all:
 *   get:
 *     summary: Get All Appointment
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Appointment
 */


/**
 * @swagger
 * /api/transaction/create:
 *   post:
 *     summary: Create Transaction
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Product:
 *                 type: string
 *               Plan:
 *                 type: string
 *               Phone:
 *                 type: string
 *               DateTime:
 *                 type: string
 *               Amount:
 *                 type: number
 *               TotalAmount:
 *                 type: number
 *               Status:
 *                 type: string
 *               PaymentMethod:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Transaction created successfully
 */



/**
 * @swagger
 * /api/transaction/delete/{transactionId}:
 *   delete:
 *     summary: Delete Transaction by Id
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Transaction to Delete
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully Deleted Appointment
 */


/**
 * @swagger
 * /api/transaction/all:
 *   get:
 *     summary: Get All Appointment
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All transaction
 */


/**
 * @swagger
 * /api/transaction/{transactionId}:
 *   get:
 *     summary: Get Transaction by transactionId
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: transactionId of the Transaction to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Transaction by transactionId
 */




const router = express.Router()
let AppointmentUploadXls = multer({
  dest:'public/AppointmentUploads/'
})

const baseService = container.get<BaseService>('BaseService')

router.post('/accessCode/single/create',SingleAccessCodeModelValidator,async(req:any,res:any)=>{
    try{
        const reqBody = <singleAccessCodeModel>req.body
        const error = validationResult(req)
        if(!error.isEmpty()){
          res.status(HttpStatus.STATUS_400).json(error.array())
          return;
        }
        var response = await baseService.CreateSingleCode(reqBody)
        if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
           return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Static Code'})
        }
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Static Code',data:reqBody})
    
      }catch(error){
        console.error('An Error Occurred',error)
        return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})        }
})

router.post('/accessCode/static/create',StaticAccessCodeModelValidator,async(req:any,res:any)=>{
    try{
        const reqBody = <staticAccessCodeModel>req.body
        const error = validationResult(req)
        if(!error.isEmpty()){
          res.status(HttpStatus.STATUS_400).json(error.array())
          return;
        }
        var response = await baseService.CreateStaticCode(reqBody)
        if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
           return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Static Code'})
        }
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Static Code',data:reqBody})
    
      }catch(error){
        console.error('An Error Occurred',error)
        return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})        }
})

router.post('/accessCode/bulk/create',BulkAccessCodeModelValidator,async(req:any,res:any)=>{
    try{
        const reqBody = <bulkAccessCodeModel>req.body
        const error = validationResult(req)
        if(!error.isEmpty()){
          res.status(HttpStatus.STATUS_400).json(error.array())
          return;
        }
        var response = await baseService.CreateBulkCode(reqBody)
        if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
           return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create bulk Code'})
        }
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Bulk Code',data:reqBody})
    
      }catch(error){
        console.error('An Error Occurred',error)
        return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})        }
})

router.get('/accessCode/all',async(req,res)=>{
    try{
      var response = await baseService.GetAllAccessCode()
      if(response?.length < 1){
        res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Access Codes '})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Access Codes',data:response})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})   
     }
      
  })

  router.get('/accessCode/:Id',async(req,res)=>{
    try{
      const param = req?.params?.Id
      if(!param){
        return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Access CODE Id'})
      }
      console.log('checker param',param)
      var response = await baseService.GetAccessCodeByid(Number(param))
      if(response?.length < 1){
          return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Access code'})
        }
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Access Code',data:response[0]})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
      
  })

router.post('/forum/create',async(req:any,res:any)=>{
    try{
        const reqBody = <CreateForumModel>req.body
        // const error = validationResult(req)
        // if(!error.isEmpty()){
        //   res.status(HttpStatus.STATUS_400).json(error.array())
        //   return;
        // }
        var response = await baseService.CreateForum(reqBody)
        if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
           return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Forum'})
        }
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Forum',data:reqBody})
    
      }catch(error){
        console.error('An Error Occurred',error)
        return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})        }
})

router.put('/forum/update/:forumId',async(req:any,res:any)=>{
  try{
      const param = req?.params?.forumId
      const reqBody = <CreateForumModel>req.body
      // const error = validationResult(req)
      // if(!error.isEmpty()){
      //   res.status(HttpStatus.STATUS_400).json(error.array())
      //   return;
      // }
      var response = await baseService.UpdateForum(param,reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update Forum'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Updated Forum',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
})

router.delete('/forum/delete/:forumId',async(req:any,res:any)=>{
  try{
      const param = req?.params?.forumId
      // const error = validationResult(req)
      // if(!error.isEmpty()){
      //   res.status(HttpStatus.STATUS_400).json(error.array())
      //   return;
      // }
      var response = await baseService.DeleteForum(param)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Delete Forum'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Deleted Forum'})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
})

router.post('/forum/activate/:forumId',async(req:any,res:any)=>{
  try{
      const param = req?.params?.forumId
      // const error = validationResult(req)
      // if(!error.isEmpty()){
      //   res.status(HttpStatus.STATUS_400).json(error.array())
      //   return;
      // }
      var response = await baseService.ActivateForum(param)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Activate Forum'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Activated Forum'})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
})

router.post('/forum/deactivate/:forumId',async(req:any,res:any)=>{
  try{
      const param = req?.params?.forumId
      // const error = validationResult(req)
      // if(!error.isEmpty()){
      //   res.status(HttpStatus.STATUS_400).json(error.array())
      //   return;
      // }
      var response = await baseService.DeactivateForum(param)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Deactivate Forum'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Deactivated Forum'})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
})

router.get('/forum/all',async(req,res)=>{
  try{
    var response = await baseService.GetAllForum()
    if(response?.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Forums '})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Forums',data:response})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    }
    
})

router.get('/forum/:forumId',async(req,res)=>{
  try{
    const param = req?.params?.forumId
    if(!param){
      return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Forum Id'})
    }
    var response = await baseService.GetForumByForumId(param)
    if(response?.length < 1){
        return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Forum'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Forum',data:response[0]})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    }
    
})

router.post('/post/create',async(req:any,res:any)=>{
  try{
      const reqBody = <PostModel>req.body
      // const error = validationResult(req)
      // if(!error.isEmpty()){
      //   res.status(HttpStatus.STATUS_400).json(error.array())
      //   return;
      // }
      var response = await baseService.CreatePost(reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Post'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Post',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
})

router.get('/post/all',async(req,res)=>{
  try{
    var response = await baseService.GetAllPost()
    if(response?.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Posts '})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Posts',data:response})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    }
    
})

router.get('/post/:Id',async(req,res)=>{
  try{
    const param = req?.params?.Id
    if(!param){
      return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Post Id'})
    }
    var response = await baseService.GetPostById(Number(param))
    if(response?.length < 1){
        return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Forum'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Forum',data:response[0]})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    }
    
})

router.post('/comment/create',async(req:any,res:any)=>{
  try{
      const reqBody = <CommentModel>req.body
      // const error = validationResult(req)
      // if(!error.isEmpty()){
      //   res.status(HttpStatus.STATUS_400).json(error.array())
      //   return;
      // }
      var response = await baseService.CreateComment(reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Comment'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Comment',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
})

router.put('/comment/update/:Id',async(req:any,res:any)=>{
  try{
      const param = req?.params?.Id
      const reqBody = <CommentModel>req.body
      // const error = validationResult(req)
      // if(!error.isEmpty()){
      //   res.status(HttpStatus.STATUS_400).json(error.array())
      //   return;
      // }
      var response = await baseService.UpdateComment(Number(param),reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update Comment'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Updated Comment',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
})

router.delete('/comment/delete/:Id',async(req:any,res:any)=>{
  try{
      const param = req?.params?.Id
      // const error = validationResult(req)
      // if(!error.isEmpty()){
      //   res.status(HttpStatus.STATUS_400).json(error.array())
      //   return;
      // }
      var response = await baseService.DeleteComment(Number(param))
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Delete Comment'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Deleted Comment'})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
})

router.get('/comment/all',async(req,res)=>{
  try{
    var response = await baseService.GetAllComments()
    if(response?.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Comments '})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Comments',data:response})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    }
    
})

router.get('/comment/:Id',async(req,res)=>{
  try{
    const param = req?.params?.Id
    if(!param){
      return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Comment Id'})
    }
    var response = await baseService.GetCommentById(Number(param))
    if(response?.length < 1){
        return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Comment'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Comment',data:response[0]})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    }
    
})


router.post('/appointment/create',CreateAppointmentValidator,AppointmentUploadXls.single('file'),async(req:any,res:any)=>{
  try{
    const reqBody = <createAppointmentModel>req.body
    const error = validationResult(req)
    if(!error.isEmpty()){
      res.status(HttpStatus.STATUS_400).json(error.array())
      return;
    }
    reqBody.PhotoPath = req?.file?.path || ''
    var response = await baseService.CreateAppointment(reqBody)
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Appointment'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Appointment',data:reqBody})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})  
  }
    
})

router.put('/appointment/update',AppointmentUploadXls.single('file'),async(req,res)=>{
  try{
    const reqBody = <createAppointmentModel>req.body
    reqBody.PhotoPath = req?.file?.path || ''
    var response = await baseService.UpdateAppointment(reqBody)
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update Appointment'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Update Appointment',data:reqBody})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})  
  }
    
})

router.delete('/appointment/delete/:Id',async(req,res)=>{
  try{
    const Id = req.params.Id
    var response = await baseService.DeleteAppointment(Number(Id))
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Delete Appointment'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Delete Appointment'})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})  
  }
    
})

router.get('/appointment/all',async(req,res)=>{
  try{
    console.log('entered appointment endpoint')
    var response = await baseService.GetAllAppointment()
    if(response?.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Appointment '})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Appointment',data:response})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})  
  }
    
})

router.get('/appointment/:Id',async(req,res)=>{
  try{
const param = req?.params?.Id
if(!param){
  return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Appointment Id'})
}
var response = await baseService.GetAppointmentId(Number(param))
if(response?.length < 1){
    res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Appointment'})
  }
  res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Appointment',data:response[0]})

  }catch(error){
   console.error('An Error Occurred',error)
   return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})  
  }

})
router.get('/appointment/:communityId',async(req,res)=>{
  try{
const param = req?.params?.communityId
if(!param){
  return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Appointment communityId'})
}
var response = await baseService.GetAppointmentCommunityId(param)
if(response?.length < 1){
    res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Appointment'})
  }
  res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Appointment',data:response[0]})

  }catch(error){
   console.error('An Error Occurred',error)
   return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})  
  }

})
router.post('/transaction/create',async(req:any,res:any)=>{
  try{
    const reqBody = <TransactionModel>req.body
    
    var response = await baseService.CreateTransaction(reqBody)
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Transaction'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Transaction',data:reqBody})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})  
  }
    
})

router.delete('/transaction/delete/:transactionId',async(req:any,res:any)=>{
  try{
    const param = req.boparams.transactionId
    
    var response = await baseService.DeleteTransaction(param)
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Delete Transaction'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Delete Transaction'})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})  
  }
    
})

router.get('/transaction/all',async(req,res)=>{
  try{
    var response = await baseService.GetAllTransaction()
    if(response?.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch All transaction '})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch All transaction',data:response})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})  
  }
    
})

router.get('/transaction/:transactionId',async(req,res)=>{
  try{
    const param = req.params.transactionId
    var response = await baseService.GetTransactionByTransactionId(param)
    if(response?.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch transaction '})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch transaction',data:response})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})  
  }
    
})


export default router