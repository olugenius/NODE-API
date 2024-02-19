import express from 'express'
import { container } from '../Container/appContainer'
import BaseService from '../services/Abstraction/BaseService'
import singleAccessCodeModel from '../model/singleAccessCodeModel'
import { HttpStatus } from '../utilities/HttpstatusCode'
import staticAccessCodeModel from '../model/staticAccessCodeModel'
import bulkAccessCodeModel from '../model/bulkAccessCodeModel'


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


const router = express.Router()

const baseService = container.get<BaseService>('BaseService')

router.post('/accessCode/single/create',async(req,res)=>{
    try{
        const reqBody = <singleAccessCodeModel>req.body
        var response = await baseService.CreateSingleCode(reqBody)
        if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
           return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Static Code'})
        }
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Static Code',data:reqBody})
    
      }catch(error){
        console.error('An Error Occurred',error)
    
      }
})

router.post('/accessCode/static/create',async(req,res)=>{
    try{
        const reqBody = <staticAccessCodeModel>req.body
        var response = await baseService.CreateStaticCode(reqBody)
        if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
           return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Static Code'})
        }
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Static Code',data:reqBody})
    
      }catch(error){
        console.error('An Error Occurred',error)
    
      }
})

router.post('/accessCode/bulk/create',async(req,res)=>{
    try{
        const reqBody = <bulkAccessCodeModel>req.body
        var response = await baseService.CreateBulkCode(reqBody)
        if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
           return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create bulk Code'})
        }
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Bulk Code',data:reqBody})
    
      }catch(error){
        console.error('An Error Occurred',error)
    
      }
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
  
    }
      
  })

  router.get('/accessCode/:Id',async(req,res)=>{
    try{
      const param = req?.params?.Id
      if(!param){
        return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Checkers Id'})
      }
      console.log('checker param',param)
      var response = await baseService.GetAccessCodeByid(Number(param))
      if(response?.length < 1){
          return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Access code'})
        }
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Access Code',data:response[0]})
  
    }catch(error){
      console.error('An Error Occurred',error)
  
    }
      
  })


export default router